module.exports = async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { res.status(200).json({ status: 'NO API KEY SET' }); return; }

  const masked = apiKey.slice(0,12) + '...' + apiKey.slice(-4);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 20,
        messages: [{ role: 'user', content: 'Say WORKING' }]
      }),
    });
    const data = await response.json();
    res.status(200).json({ key: masked, httpStatus: response.status, data });
  } catch (err) {
    res.status(200).json({ key: masked, error: err.message });
  }
};
