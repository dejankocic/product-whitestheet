
// js/google-map.js
window.initFinsecMap = function initFinsecMap() {
  const center = { lat: 18.0, lng: 8.0 }; // near Africa/Atlantic to center world
  const map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 2,
    center,
    mapId: 'DEMO_DARK', // default mapId; replace with your styled map if you have one
    mapTypeId: 'roadmap',
    disableDefaultUI: false,
    backgroundColor: '#0b1220'
  });

  // Dark theme styling (if mapId not supported)
  const styledMapType = new google.maps.StyledMapType([
    {elementType:'geometry',stylers:[{color:'#0b1220'}]},
    {elementType:'labels.text.stroke',stylers:[{color:'#0b1220'}]},
    {elementType:'labels.text.fill',stylers:[{color:'#64748b'}]},
    {featureType:'administrative.country',elementType:'geometry',stylers:[{color:'#334155'}]},
    {featureType:'landscape',elementType:'geometry',stylers:[{color:'#0e1726'}]},
    {featureType:'water',elementType:'geometry',stylers:[{color:'#0a1220'}]},
    {featureType:'road',elementType:'geometry',stylers:[{visibility:'off'}]},
    {featureType:'poi',stylers:[{visibility:'off'}]}
  ], {name: 'FinSec Dark'});
  map.mapTypes.set('finsec_dark', styledMapType);
  map.setMapTypeId('finsec_dark');

  const spots = [
    {name:'China', lat:35, lng:104, color:'#ef4444'},
    {name:'United States', lat:37, lng:-95, color:'#f59e0b'},
    {name:'Serbia', lat:44, lng:21, color:'#60a5fa'},
    {name:'Germany', lat:51, lng:10, color:'#22c55e'},
    {name:'Czech Republic', lat:49.8, lng:15.5, color:'#22c55e'},
    {name:'South Africa', lat:-30, lng:24, color:'#60a5fa'}
  ];

  const info = new google.maps.InfoWindow();
  for (const s of spots) {
    const marker = new google.maps.Marker({
      position: {lat:s.lat, lng:s.lng},
      map,
      title: s.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: s.color,
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: '#ffffff'
      }
    });
    marker.addListener('click', ()=>{
      info.setContent(`<div style="font: 12px sans-serif; color:#0b1220"><strong>${s.name}</strong></div>`);
      info.open({anchor: marker, map});
    });
  }
};
