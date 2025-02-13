/**
 * Calls the Mistral AI API to generate text based on a prompt.
 *
 * @param {prompt} prompt - The text to send to the API.
 * @param {maxTokens} maxTokens (optional) - The maximum number of tokens to generate, by default : 1000.
 * @param {temperature} temperature (optional) - The temperature to control the model's creativity, by default : 0.3.
 * @param {model} model (optional) - The model used for the prompt, by default : mistral-small-latest.
 * @customfunction
 */
function MISTRALAI(prompt, maxTokens = 1000, temperature = 0.3, model = 'mistral-small-latest') {
  const MISTRAL_API_TOKEN = 'YOUR TOKEN';
  const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

  if (!MISTRAL_API_TOKEN) {
    return 'Please register your Mistral API token.';
  }

  if (!prompt) {
    return 'Please provide a text.';
  }

  const payload = {
    'model': model,
    'temperature': temperature,
    'max_tokens': maxTokens,
    'messages': [
      {
        'role': 'user',
        'content': prompt
      }
    ],
    'response_format': {
      'type': 'text'
    }
  };

  const options = {
    'method': 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': `Bearer ${MISTRAL_API_TOKEN}`
    },
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };

  try {
    const response = UrlFetchApp.fetch(MISTRAL_API_URL, options);
    const data = JSON.parse(response.getContentText());
    if (response.getResponseCode() !== 200) {
      return `Error: ${data.message}`;
    }
    return data.choices[0].message.content.trim();
  } catch (error) {
    return `Error: ${error.message}, Response: ${response ? response.getContentText() : 'No response'}`;
  }
}
