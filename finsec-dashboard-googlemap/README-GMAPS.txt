
Google Maps variant
===================

1) Get an API key
   - https://console.cloud.google.com/ -> Create a project
   - Enable "Maps JavaScript API"
   - Create an API key and restrict HTTP referrers (your domain) and APIs
   - Replace YOUR_API_KEY in map-google.html

2) CSP header (minimal example)
Content-Security-Policy: default-src 'self';
  img-src 'self' data: https://*.googleapis.com https://*.gstatic.com;
  script-src 'self' https://maps.googleapis.com https://maps.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.gstatic.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://maps.googleapis.com;

3) Open /map-google.html
