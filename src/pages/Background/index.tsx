import { SearchObject } from '../../types/media';

console.log('This is the background page.');

chrome.contextMenus.create({
  id: 'menuSelection',
  title: 'Make a selection search',
  contexts: ['selection'],
});

chrome.contextMenus.create({
  id: 'menuImage',
  title: 'Make an image search',
  contexts: ['image'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  var dataObj: SearchObject = {};

  if (info.selectionText) {
    console.log(info.selectionText);
    dataObj.content = info.selectionText;
    dataObj.url = null;
    chrome.storage.local.set({ key: JSON.stringify(dataObj) }, function () {
      console.log('Value is set to ' + info.selectionText);
    });
  } else if (info.mediaType) {
    dataObj.content = null;
    dataObj.url = info.srcUrl;
    console.log('el link de la foto', info.srcUrl);
    chrome.storage.local.set({ key: JSON.stringify(dataObj) }, function () {});
  }
});
