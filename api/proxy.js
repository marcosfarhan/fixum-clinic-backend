export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkPXzmhkpFmmNSBZ54seHQN5wlGq9vhiHpH0QlvzL6LsdT8XmJVJ6z5sPR99KndWcW/exec';

    if (req.method === 'POST') {
      const bodyString = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: bodyString,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseText = await response.text();
      
      try {
        const jsonData = JSON.parse(responseText);
        res.status(200).json(jsonData);
      } catch (e) {
        res.status(200).json({ ok: true });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
