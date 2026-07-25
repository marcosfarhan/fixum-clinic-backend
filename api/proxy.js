export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbywJSLKrRMNwjUe1edy0tuedaCnlr64-Je5vhUcI8l4vQzS_LBoQSHUw3rDtyNKLvKA/exec';

    if (req.method === 'POST') {
      // Parsear el body si es string
      let datosAEnviar = req.body;
      if (typeof req.body === 'string') {
        datosAEnviar = JSON.parse(req.body);
      }

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(datosAEnviar),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const datos = await response.text();
      
      try {
        const jsonData = JSON.parse(datos);
        res.status(200).json(jsonData);
      } catch (e) {
        res.status(200).json({ ok: true, raw: datos });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}
