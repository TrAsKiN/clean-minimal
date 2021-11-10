import {me as app} from 'appbit';
import clock from 'clock';
import {preferences} from 'user-settings';
import {display} from 'display';
import {localizedDate} from './locale-date';
import {FitFont} from 'fitfont';
import * as messaging from 'messaging';
import * as fs from 'fs';

const SETTINGS_TYPE = 'cbor';
const SETTINGS_FILE = 'settings.cbor';

let settings = loadSettings();

const clockHours = new FitFont({
  id:'clockHours',
  font:'NovaMono_160',
  halign: 'end'
});
const clockMinutes = new FitFont({
  id:'clockMinutes',
  font:'NovaMono_125',
  halign: 'start'
});
const clockDate = new FitFont({
  id:'clockDate',
  font:'NovaMono_18',
  halign: 'middle'
});

const baseOpacity = 1.0;
let clockHoursOpacity = baseOpacity;
let clockMinutesOpacity = baseOpacity - 0.25;
let clockDateOpacity = baseOpacity - 0.25;

setColor();
setOpacity();

if (app.permissions.granted('access_aod') && display.aodAvailable) {
  display.aodAllowed = true;
  display.onchange = () => {
    if (display.aodActive) {
      clockHoursOpacity = baseOpacity - 0.25;
      clockMinutesOpacity = baseOpacity - 0.5;
      clockDateOpacity = baseOpacity - 0.5;
    } else {
      clockHoursOpacity = baseOpacity;
      clockMinutesOpacity = baseOpacity - 0.25;
      clockDateOpacity = baseOpacity - 0.25;
    }
    setOpacity();
  };
}

clock.granularity = 'minutes';

clock.ontick = (event) => {
  const today = event.date;
  // const today = new Date(1986, 7, 20, 13, 37);
  const hours = today.getHours();
  if (preferences.clockDisplay === '12h') {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }
  clockHours.text = `${hours}`;
  clockMinutes.text = zeroPad(today.getMinutes());
  clockDate.text = localizedDate(today);
};

messaging.peerSocket.onmessage = (event) => {
  if (event.data.key === 'color' && event.data.newValue) {
    const color = JSON.parse(event.data.newValue);
    if (settings[event.data.key] !== color) {
      settings[event.data.key] = color;
      saveSettings();
      setColor();
      display.poke();
    }
  }
};

messaging.peerSocket.onopen = () => {};
messaging.peerSocket.onclose = () => {};

app.onunload = saveSettings;

function setOpacity() {
  clockHours.style.opacity = clockHoursOpacity;
  clockMinutes.style.opacity = clockMinutesOpacity;
  clockDate.style.opacity = clockDateOpacity;
}

function setColor() {
  clockHours.style.fill = settings['color'];
  clockMinutes.style.fill = settings['color'];
  clockDate.style.fill = settings['color'];
}

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (exception) {
    return {
      'color': 'white'
    };
  }
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

function zeroPad(integer) {
  if (integer < 10) {
    integer = `0` + integer;
  }
  return integer;
}
