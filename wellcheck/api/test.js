module.exports = async function handler(req, res) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { res.status(200).json({ status: 'NO API KEY' }); return; }
  const masked = apiKey.slice(0,12) + '...' + apiKey.slice(-4);

  const models = [
    'claude-haiku-4-5',
    'claude-sonnet-4-5',
    'claude-opus-4-5',
    'claude-3-5-haiku-latest',
    'claude-3-5-sonnet-latest',
    'claude-3-opus-latest',
    'claude-haiku-4-5-20251001',
    'claude-sonnet-4-20250514',
    'claude-opus-4-20250514',
  ];

  const results = {};
  for (const model of models) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model, max_tokens: 10, messages: [{ role: 'user', content: 'Hi' }] }),
      });
      const d = await r.json();
      results[model] = r.status === 200 ? '✅ WORKS' : `❌ ${r.status}: ${d?.error?.message}`;
    } catch(e) { results[model] = '❌ ' + e.message; }
  }
  res.status(200).json({ key: masked, results });
};
