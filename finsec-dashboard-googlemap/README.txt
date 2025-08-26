
Final FinSec Dashboard (Google Maps)
====================================

- This build replaces map.html with a Google Maps-based page.
- Add your Google Maps JavaScript API key in map.html:
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initFinsecMap" defer></script>

Minimal CSP header:
Content-Security-Policy: default-src 'self';
  img-src 'self' data: https://*.googleapis.com https://*.gstatic.com;
  script-src 'self' https://maps.googleapis.com https://maps.gstatic.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.gstatic.com;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https://maps.googleapis.com;

Open index.html and navigate to Map.
