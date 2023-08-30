console.log('Content script works!');
const { Configuration, OpenAIApi } = require('openai');

let openaiClient;

chrome.storage.local.get(['openaiApiKey']).then(({ openaiApiKey }) => {
  const configuration = new Configuration({
    apiKey: openaiApiKey,
  });
  openaiClient = new OpenAIApi(configuration);
});

chrome.storage.onChange.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key !== 'openaiApiKey') continue;
    openaiClient = new OpenAIApi(
      new Configuration({
        apiKey: newValue,
      })
    );
  }
});

console.log('HELLOOOOOOOO???????????????');

document.addEventListener('mouseup', async (event) => {
  console.log('where are wee????');
  //   const hoveredElement = event.target;

  //   if (hoveredElement && hoveredElement.innerText) {
  //     const hoveredText = hoveredElement.innerText.trim();

  //     if (hoveredText) {
  //       chrome.runtime.sendMessage({ type: 'logText', text: hoveredText });
  //     }
  //   }
  if (window.getSelection) {
    // chrome.runtime.sendMessage({
    //   type: 'logText',
    //   text: window.getSelection().toString(),
    // });
    console.log('r we here?');

    if (!openaiClient) return;
    console.log('hello');
    const completion = await openaiClient.createCompletion({
      model: 'text-davinci-003',
      prompt:
        'A user has just highlighted "' +
        window.getSelection().toString() +
        '". With this content, please pretend you are a tutor and define/explain the concept/term. Do this using simple terms and as little words as possible.',
    });
    console.log(completion.data.choices[0].text);
  }
});
