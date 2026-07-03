import './style.css';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj'; 
import React, { useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function MapComponent() {
  const mapElement = useRef(null);
  
  useEffect(() => {
    if (!mapElement.current) return;

    const map = new OlMap({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([75.79, 25.79]), 
        zoom: 6,
      }),
    });
    
    return () => map.setTarget(null); 
  }, []);

  return <div ref={mapElement} style={{ width: '100vw', height: '100vh' }} />;
}

const root = createRoot(document.getElementById('root'));
root.render(<MapComponent />);