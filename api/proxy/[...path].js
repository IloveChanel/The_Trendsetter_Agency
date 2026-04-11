const { URL } = require('url');

function getRawBody(req){
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  const BACKEND = process.env.TOPPICK_BACKEND_URL || '';
  const API_KEY = process.env.TOPPICK_API_KEY || '';

  if (!BACKEND) {
    res.statusCode = 500;
    res.setHeader('content-type','application/json');
    res.end(JSON.stringify({ error: 'TOPPICK_BACKEND_URL not configured in Vercel environment variables' }));
    return;
  }

  const originalPath = req.url || '/';
  const targetPath = originalPath.replace(/^\/api\/proxy/, '') || '/';
  const target = BACKEND.replace(/\/+$/,'') + targetPath;

  try {
    const body = (req.method === 'GET' || req.method === 'HEAD') ? undefined : await getRawBody(req);

    const headers = Object.assign({}, req.headers);
    delete headers.host;
    if (API_KEY) headers['x-api-key'] = API_KEY;

    const fetchRes = await fetch(target, {
      method: req.method,
      headers,
      body
    });

    res.statusCode = fetchRes.status;
    fetchRes.headers.forEach((val, key) => {
      if (key.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(key, val);
    });

    const buffer = Buffer.from(await fetchRes.arrayBuffer());
    res.end(buffer);
  } catch (err) {
    res.statusCode = 502;
    res.setHeader('content-type','application/json');
    res.end(JSON.stringify({ error: String(err) }));
  }
};
