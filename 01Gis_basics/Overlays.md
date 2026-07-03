# Overlays  
A piece of HTML (popup, tooltip, custom UI) placed on top of the map at a geographic location.
Wheras interaction is something that lets user interact with the map like zoom, pan , modify,draw, etc  

    
A HTML attached to a geographical coordinate -> overlay    


Without overlay : 
  
Map

📍 Marker
  
    

With overlay: 
Map

📍 Marker

┌─────────────────┐  
│ Coffee Shop     │  
│ Rating ⭐4.6    │  
│ Open till 10 PM │  
└─────────────────┘   
  
Overlays are need to display information, regarding a feature, a polygon, point or line.    
  
## Overlay Lifecycle:  
Create overlay-> Add to map -> set position -> updatecontent -> hide/ show -> remove  
````
map.addOverlay(overlay);

overlay.setPosition(coordinates);

overlay.getPosition();

map.removeOverlay(overlay);
  
````
  
## Overlay Positioning:  
It can appear Above, Below, Left, Right, Centered.  
COntrolled using positioning.  
````
positioning: "bottom-center"
  
Other values

top-left, top-right, center-center, bottom-left, bottom-center, bottom-right, 
````



# Interactions:
1) Select -> CLick a feature and feature gets selected.  
2) Draw -> Allows user to click click click and polygon created  
3) Modify -> Drag corners to modify the shape of the polygon  
4) Translate -> Move feature from one place to another.  
5) Snaps -> Automatically snaps to nearby points   // did not understand
6) DragRotate -> Rotate the map.  
7) DragPan -> Move the map.  
8) MouseWheelZoom -> Zooms.  
