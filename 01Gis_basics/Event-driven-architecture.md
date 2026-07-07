## Event

A simple notification that some changes might have occured. 
suppose a new feature is added so -> vector source updated -> emits event -> vector layer receives event and notifies map -> map receives and renders everything -> canvas redrawn -> new feature added. 

# CLick Event

Mouse Click

↓

Browser

↓

Map

↓

Map checks Features

↓

Feature Found

↓

Click Event

↓

Your Callback Runs

# Pan event

Mouse Move

↓

View Center Changes

↓

View Event

↓

Map Render

↓

New Area Drawn 

# Zoom Event

Mouse Wheel 

↓

Browser Event

↓

View Changes

↓

View Emits Event

↓

Map Hears Event

↓

Renderer

↓

New Zoom Displayed

## There is difference betwee a normal event(like a raw mouse click) and an interaction (that is a complex, pre-built behavior).

1. Click(singleclick): This is a core map event.

->  Fires when the user clicks on the map once. So it provides the exact coordinates where the user clicked and the exact pixel. 

```javascriptreact
map.on('singleclick',(event)=>{
      const ClickFeature= map.forEachFeatureAtPixel(event.pixel, (feature)=>{
        return feature;
      });
```

1. Select (ol/interaction/Select):  This is an **Interaction**, not just a basic event. It is a dedicated tool you instantiate and add to the map. 

-> When added to the map, it automatically listens for clicks (or hovers) on vector features and visually highlights them.

1. Modify (`ol/interaction/Modify`): A powerful **Interaction** used exclusively for editing existing vector data. When you attach the Modify interaction to a Vector Source (or directly to the collection of features grabbed by your Select interaction), it automatically render draggable handles (vertices) on those shapes. The user can click and drag these handles to alter a polygon's boundaries or move a point marker.
2.  Drawend (The `drawend` event of `ol/interaction/Draw`): This is a specific event fired by the **Draw Interaction** (`ol/interaction/Draw`).

-> The Draw tool allows users to click around the map to create brand new Points, Lines, or Polygons. When the user finishes drawing the shape (usually by double-clicking the final point), the `drawend` event fires.