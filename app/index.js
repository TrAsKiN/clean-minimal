import { me } from "appbit";
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { display } from "display";
import { localizedDate } from "./locale-date";

clock.granularity = "minutes";

const clockHours = document.getElementById("#clockHours");
const clockMinutes = document.getElementById("#clockMinutes");
const clockDate = document.getElementById("#date");

if (display.aodAvailable && me.permissions.granted("access_aod")) {
  display.aodAllowed = true;
  display.addEventListener("change", () => {
    if (!display.aodActive && display.on) {
      clockHours.style.fillOpacity = 1.0;
      clockMinutes.style.fillOpacity = 1.0;
    } else {
      clockHours.style.fillOpacity = 0.5;
      clockMinutes.style.fillOpacity = 0.5;
    }
  });
}

clock.ontick = (event) => {
  let today = event.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  } else {
    hours = zeroPad(hours);
  }
  clockHours.text = `${hours}`;
  clockMinutes.text = zeroPad(today.getMinutes());
  clockDate.text = localizedDate(today);
};

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
