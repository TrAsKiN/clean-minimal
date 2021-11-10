import {settingsStorage} from 'settings';
import * as messaging from 'messaging';

settingsStorage.onchange = (event) => {
  let data = {
    key: event.key,
    newValue: event.newValue
  };
  sendVal(data);
};

messaging.peerSocket.onopen = () => {
  console.log(`Companion Socket Open`);
  restoreSettings();
};
messaging.peerSocket.onclose = () => {
  console.log(`Companion Socket Closed`);
};

function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}
