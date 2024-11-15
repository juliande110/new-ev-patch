export default async function handler(req: any, res: any) {
  const { param, ...query } = req.query;

  // param is an array of the path segments after /ethereum
  // query contains the query string parameters

  const targetUrl = `${process.env.NEXT_PUBLIC_RESERVOIR_URL}/${param.join('/')}`;
  const queryString = new URLSearchParams(query).toString();
  const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

  try {
    let request = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': process.env.RESERVOIR_API_KEY?.toString() || '',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    }
    const response = await fetch(finalUrl, request);
    // res.send(response.json());
    const data = await response.json();
    data.logging = {}
    data.logging.request = request;
    const requestIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    data.logging.requestIp = requestIp;
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// import { createProxyMiddleware } from 'http-proxy-middleware';

// export default async function handler(req: any, res: any) {
//   const { param, ...query } = req.query;

//   // param is an array of the path segments after /ethereum
//   // query contains the query string parameters

//   const targetUrl = `${process.env.NEXT_PUBLIC_RESERVOIR_URL}/${param.join('/')}`;
//   const queryString = new URLSearchParams(query).toString();
//   const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

//   // Log the final URL for debugging
//   console.log('Final URL:', finalUrl);

//   // Proxy middleware configuration
//   const proxy = createProxyMiddleware({
//     target: finalUrl,
//     changeOrigin: true,
//     on: {
//       proxyReq: (proxyReq, req: any, res) => {
//         // Inject or modify headers here
//         proxyReq.setHeader('Content-Type', 'application/json');
//         proxyReq.setHeader('Accept', 'application/json');
//         proxyReq.setHeader('x-api-key', process.env.RESERVOIR_API_KEY || '');
        
//         // Forward other headers from the original request
//         Object.keys(req.headers).forEach((key) => {
//           if (key.toLowerCase() !== 'content-length') {
//             proxyReq.setHeader(key, req.headers[key]);
//           }
//         });

//         if (req.method !== 'GET' && req.body) {
//           const bodyData = JSON.stringify(req.body);
//           proxyReq.write(bodyData);
//           proxyReq.end();
//         }

//         // Log headers for debugging
//         console.log('Proxy Request Headers:', proxyReq.getHeaders());
//       }
//     }
//   });

//   // Apply the proxy middleware to the request
//   return proxy(req, res, (err) => {
//     if (err) {
//       console.error('Proxy error:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
// }

