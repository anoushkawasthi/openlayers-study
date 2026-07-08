# GeoServers

GeoServers are the backend for Geospatial Data, i.e. geographic data.

Now, like node.js provides with a set of api's like GET/users..., geoserver also has some standard api's through which it exposed geographic data. 

1. WMS
2. WFS
3. WMTS
4. WCS

Instead of returning some json it returns maps, satellite imagery, roads, rivers, etc.

Geoserver sits between the frontend and the database and fetches data from the databases as per requirements. This handles problems like: 

Problems:

- Browser connects directly to database 
- Huge data transfer
- Security issues 
- No styling
- No caching



#### GeoServer is an open-source map server that publishes geographic data from multiple sources using standard GIS web services.



### POSTGIS:

**PostGIS** is **a software extension that adds map and location data to the standard PostgreSQL database**. It turns a normal database into a powerful geographic tool. It lets you store, map, and analyze real-world locations (like points, lines, and shapes) using simple code. 

**New Data Types:** It adds spatial shapes. A **Point** is a single dot (like a GPS coordinate). A **LineString** is a path (like a road or river). A **Polygon** is a closed area (like a city limit or property boundary).

## The GIS Stack

           User

             ↓

       OpenLayers

             ↓

     WMS / WFS / WMTS

             ↓

        GeoServer

             ↓

 PostGIS / Shapefile

             ↓

      Geographic Data



## GIS Services 



GeoServer creates services like WMS, WFS,WMTS,WCS  and open layers consumes these. Openlayer displays whatever data is send by the GeoServer. 

### Geoserver Responsibilities: 

1. It reads data: Like the PostGIS or shapefile or GeoTIFF or the Geopakage 
2. Converts data: Now database stores 'polygon' form but the browser needs png, json and tiles,, now here geoserver converts into the required datatype.
3. Styling: Styling gives character and makes sure it does not look identical .
4. Projection Transformation: Database: EPSG:4326 and the Browser uses EPSG: 3857, this transformation is also done by the GeoServer.
5. Filtering: 
6. Security: It controls, auth, permissions, roles, kayers users can access.
7. Caching:  Frequently accessed maps are cached instead of regenerating them everytime.
8. 

