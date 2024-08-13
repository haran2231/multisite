const express = require('express');
const geoip = require('geoip-lite');
const cors = require('cors');

const app = express();
app.use(cors());

app.use((req, res, next) => {
  try {
    // Extract IP address from headers or connection
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : req.connection.remoteAddress || req.socket.remoteAddress;

    // Check if the IP is private (e.g., 10.x.x.x, 192.168.x.x, 172.16.x.x-172.31.x.x)
    const isPrivateIp = ip.startsWith('10.') || ip.startsWith('192.168.') || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip);

    if (isPrivateIp) {
      console.log('Skipping geolocation for private IP:', ip);
      req.userLanguage = 'en'; // Default language for private IPs
    } else {
      // Lookup geolocation
      const geo = geoip.lookup(ip);
      if (geo) {
        console.log('Geo Information:', geo);
        req.userLanguage = geo.country.toLowerCase();
        
      } else {
        console.log('No geolocation data found for IP:', ip);
        req.userLanguage = 'en'; // Default language if no geolocation data is found
      }
    }
  } catch (error) {
    console.error('Error during geolocation lookup:', error);
    req.userLanguage = 'en'; // Default language in case of error
  }
  next();
});

app.get('/api/get-language', (req, res) => {
  res.json({ language: req.userLanguage });
});

// Your other routes and middleware
app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
