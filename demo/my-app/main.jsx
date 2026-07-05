import './style.css';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, transformExtent } from 'ol/proj'; 
import React, { useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ImageLayer from 'ol/layer/Image';
import XYZ from 'ol/source/XYZ';
import { ImageStatic } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import locationPin from './Assets/location-pin-svgrepo-com.svg'
import Geolocation from 'ol/Geolocation';



function MapComponent() {
  const mapElement = useRef(null);
  const mapRef=useRef(null);
  const [layerType,setLayerType]=useState('osm');
  
  useEffect(() => {
    if (!mapElement.current) return;

    const osmSource=new OSM();
    const satelliteSource=new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}',
      maxZoom: 19
    });
    const topoSource=new XYZ({
      url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
      maxZoom: 17
    });

    const BaseLayer=new TileLayer({
      source: osmSource,
      properties: {
        name: 'base'
      }
    });

    const ImageExtent = transformExtent(
      [93.0, 23.0, 97.0, 27.0],
      'EPSG:4326',
      'EPSG:3857'
    );
    
    const staticLayerImage= new ImageLayer({
      source:new ImageStatic({
        url:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Compass_Rose_English_North.svg/240px-Compass_Rose_English_North.svg.png',
        crossOrigin:'anonymous', 
        imageExtent: ImageExtent
      }),
      opacity:0.7
    });

    const markerGeometry= new Point(fromLonLat([70.90173629688752,26.85644063234675]));
    const markerFeature = new Feature({
      geometry: markerGeometry,
      name:'My First Marker'
    });

    markerFeature.setStyle(
      new Style({
        image: new Icon({
          src: locationPin,
          scale: 0.04,
          anchor: [0.5, 0.5],
        }),
      })
    );

    const vectorSource = new VectorSource({
      features: [markerFeature],
    });

    const markerLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 100, 
    });

    const map = new OlMap({
      target: mapElement.current,
      layers: [
        BaseLayer, 
        staticLayerImage, 
        markerLayer
      ],
      view: new View({
        center: fromLonLat([70.90173629688752,26.85644063234675]), 
        zoom: 8,
      }),
    });

    mapRef.current =map;

    const geolocation = new Geolocation({
      projection: map.getView().getProjection(),
      trackingOptions: {
        enableHighAccuracy: true,
        maximumAge: 2000,
      },
    });
    geolocation.setTracking(true);
    geolocation.on('change:position',()=>{
      const coordinates=geolocation.getPosition();
      if(coordinates){
        markerGeometry.setCoordinates(coordinates);
        map.view().animate({
          center: coordinates, duration: 1000
        });
      }
    });

    return () => {
      geolocation.setTracking(false);
      map.setTarget(null)
    }; 
  }, []);

  useEffect(()=>{
    if(!mapRef.current) return;

    const layers = mapRef.current.getLayers();
    const baseLayer = layers.getArray().find(layer => layer.get('name') === 'base');

    if (baseLayer) {
      if (layerType === 'osm') {
        baseLayer.setSource(new OSM());
      } else if (layerType === 'satellite') {
        baseLayer.setSource(new XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }));
      } else if (layerType === 'topo') {
        baseLayer.setSource(new XYZ({
          url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
        }));
      }
    }
  }, [layerType]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* A simple controller UI floating on top of the map */}
      <div style={{ position: 'absolute', top: 10, left: 50, zIndex: 10, background: 'white', padding: 10, borderRadius: 4, boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
        <label style={{ marginRight: 10 }}><b>Base Layer: </b></label>
        <select value={layerType} onChange={(e) => setLayerType(e.target.value)}>
          <option value="osm">Standard (OSM)</option>
          <option value="satellite">Satellite (ArcGIS)</option>
          <option value="topo">Topography (OpenTopo)</option>
        </select>
      </div>

      <div ref={mapElement} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<MapComponent />);