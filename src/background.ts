/// <reference types="chrome"/>

let hideTyping = false;

chrome.storage.sync.get(['hideTyping'], result => {

  hideTyping = result.hideTyping;

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync') {
      if (changes.hideTyping) {
        hideTyping = changes.hideTyping.newValue;
      }
    }
  });

  chrome.webRequest.onBeforeRequest.addListener(
    details => {
      return {cancel: hideTyping};
    },
    {
      urls: ['https://discord.com/api/*/channels/*/typing']
    },
    ['blocking']
  );

});
