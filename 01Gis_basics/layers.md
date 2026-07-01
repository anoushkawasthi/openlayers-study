# Layers  
A map is not one single layer but a stack of layers.  
### Types of Layers  
````
1) Tile Layer:  
Contains map tiles. 
ol/layer/Tile: Renders pre-rendered, grid-based image tiles organized by zoom level (e.g., OpenStreetMap base maps, Bing Maps).
````
````
2) Vector Layer: 
Contains custom objects.  
ol/layer/Vector: Renders vector geometries (points, lines, polygons) directly on the client side using formats like GeoJSON, KML, or TopoJSON.  
````
````
3) Vector Tile Layer:  
Displays vector data divided into small tiles instead of loading the entire dataset at once.  
ol/layer/VectorTile: Combines tile efficiency with vector rendering by loading vector data structured into a map tile grid.  
````
````
4) Image Layer:  
One large image covering an area.  
ol/layer/Image: Renders a single, standalone map image at arbitrary extents and resolutions instead of a grid of tiles (e.g., dynamic WMS requests).  
````

````
VECTOR TILE LAYER:  

why do we need vector tiles?  
-> if we have a country's map that contains roads, rivers, parks, city boundaries and other objects. If browser loads at once huge data needs to be downloaded so instead map is divided into small tiles.  
Only the tiles currently visible onscreen are downloaded.  
  

How does Vector Tile Layer work?  
Now Raster tiles are images and Vectors are geometric data.  
Each tile stores points, lines polygons -> browser then draws these features.  
Raster Tiles cannot be changes like the traffic on the roads canot be altered whereas for Vector Tiles all features are changes dynamically.  
this causes faster loading, dynamic styling interactivity  
  

import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';

const layer = new VectorTileLayer({
  source: new VectorTileSource({
    format: new MVT(),
    url: '/tiles/{z}/{x}/{y}.pbf'
  })
});  
````

##  Base Layer  
Base Layer is what you see first it can be OSM, Satellite, Topography, Terrain, any. On top it we have the the Vector Layer that contains the marker, the boundary, roads, rivers, etc.  
1) OSM-> OpenStreetMap  
Most common base map.  
````
new TileLayer({
    source: new OSM()
})    
````  
OSM is actually a raster tile layer. Each square you see is an image tile.  
It contains:  
  
Roads  
Buildings  
Parks  
Rivers  
Labels  
Cities  

2) Sattelite Layer:  
Instead of drawings the base layer is actual sattelite photo of that area.  

  
3) Topography Layer:  
Topography layer focuses on the dhape of the earth, instead of showing the roads and rivers it focuses on the hills, valleys, rifts, mountains, elevation, contour lines, etc.  
