

## How openlayers works?  
Basic program to understand.  
````
import { useEffect, useRef } from "react";

import Map from "ol/Map";
import View from "ol/View";

import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import "ol/ol.css";

function App() {
  // Reference to the div where the map will be rendered
  const mapElement = useRef(null);

  // Reference to store the OpenLayers Map instance
  const mapRef = useRef(null);

  useEffect(() => {
    // Prevent creating the map multiple times
    if (mapRef.current) return;

    mapRef.current = new Map({
      target: mapElement.current,

      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],

      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      mapRef.current.setTarget(undefined);
    };
  }, []);

  return (
    <div
      ref={mapElement}
      style={{
        width: "100%",
        height: "100vh",
      }}
    />
  );
}

export default App;
````  
### What is useRef and why is useRef used here?  
SO useRef is a react hook that does not change values even during re-renders.  
useRef is a box that React gives you to store a value that stays the same between renders without causing the UI to update.  
  
useState vs useRef  
in useState when its value is changed it re-renders and the screen updates, but in useRef when the value changes there is no re-rendering and hence no change in the value on screen.  
