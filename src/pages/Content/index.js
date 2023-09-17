console.log('Content script works!');
import OpenAI from 'openai';

let openaiClient;

chrome.storage.local.get(['openaiApiKey']).then(({ openaiApiKey }) => {
  openaiClient = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });
});

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    if (key !== 'openaiApiKey') continue;
    openaiClient = new OpenAI({
      apiKey: newValue,
      dangerouslyAllowBrowser: true,
    });
  }
});

window.addEventListener('mouseup', async (event) => {
  //   const hoveredElement = event.target;

  //   if (hoveredElement && hoveredElement.innerText) {
  //     const hoveredText = hoveredElement.innerText.trim();

  //     if (hoveredText) {
  //       chrome.runtime.sendMessage({ type: 'logText', text: hoveredText });
  //     }
  //   }
  if (window.getSelection && window.getSelection().toString() != '') {
    // chrome.runtime.sendMessage({
    //   type: 'logText',
    //   text: window.getSelection().toString(),
    // });

    if (!openaiClient) return;
    const completion = await openaiClient.completions.create({
      model: 'text-davinci-003',
      prompt:
        'Read the following job posting: "' +
        window.getSelection().toString() +
        '". Return all of the tech stack related keywords in an array.',
      max_tokens: 100,
    });
    console.log(completion.choices[0].text);
    console.log('Tokens used: ' + completion['usage']['total_tokens']);
  }
});
