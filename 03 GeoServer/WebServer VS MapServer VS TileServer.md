## WebServer:

eg: Apache HTTP Server, NGINX

Purpose: Serve files. It accepts the standard http/https requests from a client and delivers back to the user. 

## MapServer:

A map server is a specialized piece of software that understands geographic data(gis). Instead of just serving static files, it connects to spatial databases or raw geographic files and translates the raw data into visual map on the fly.

-> Processes spatial data and dynamically render maps based on specific coordinates, bounding boxes or user queries.

## TileLayer:

It mainly takes care of storing and rapidly delivering the precut map tiles based on user specific zoom level and coordinates. Basically server generates map tiles and instead of a huge map it serves small images, tiles.

This reduces time and is much more faster.