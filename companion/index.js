import {settingsStorage} from 'settings';
import * as messaging from 'messaging';

settingsStorage.addEventListener('change', (event) => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    if (event.key === 'color') {
      messaging.peerSocket.send(event.newValue);
    }
  }
});

messaging.peerSocket.addEventListener('message', (event) => {
  console.log(event);
  if (event.data === 'getColor') {
    messaging.peerSocket.send(settingsStorage.getItem('color'));
  }
});
