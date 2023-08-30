console.log('This is the background page.');
console.log('Put the background scripts here.');
console.log('sup');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'logText') {
    console.log(message.text);
  }
});
