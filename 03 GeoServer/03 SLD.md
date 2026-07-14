# GeoServer Styles:

In GeoServer, "Styling" is the process of defining the visual appearance of your raw geographic data. GeoServer acts as the cartographer, and the style file is the rulebook it follows to draw the map.

## 1. What is SLD (Styled Layer Descriptor)?

SLD is the native, OGC-standard XML language that GeoServer uses for styling.

- **The Concept:** It separates data from presentation. Your database just holds the coordinates; the SLD tells the server how to paint them.
- **The Structure:** SLD is highly hierarchical. A `FeatureTypeStyle` contains `Rules`. A `Rule` contains a `Filter` (the logic) and a `Symbolizer` (the paint instructions).
- **The Drawback:** Raw SLD XML is notoriously verbose and difficult to write by hand. A simple style can take 50 lines of code.

## 2. CSS Styling (GeoServer CSS Extension)

Because SLD is hard to write, developers created the GeoServer CSS extension.

- **How it works:** You write your map styles using a syntax that looks almost exactly like website CSS (e.g., `* { fill: #ff0000; stroke: #000000; }`).
- **The Magic:** When you click "Save", GeoServer automatically compiles your CSS down into the raw SLD XML that the rendering engine requires. It is highly recommended for modern GeoServer workflows because it drastically reduces the amount of code you have to write.

## 3. Default Styles

Every layer published in GeoServer **must** have a default style assigned to it.

- If a web client makes a WMS request but forgets to specify a style parameter, GeoServer uses the default.
- GeoServer comes with built-in defaults (`point`, `line`, `polygon`, `generic`). You can assign alternative styles to a layer, allowing the client to switch between them on the fly.

## 4. The Core Symbolizers

GeoServer uses specific "Symbolizers" to draw different geometry types.

- **Polygon Styling (**`PolygonSymbolizer`**):** Controls the inside and the edges of a shape. You primarily define the `Fill` (color, opacity, or graphic patterns/hatches) and the `Stroke` (the outline color, width, and dash-array).
- **Line Styling (**`LineSymbolizer`**):** Used for roads, rivers, etc. You define the `Stroke` (color, width, opacity). You can also control `Stroke-linejoin` (how corners look) and `Stroke-linecap` (how the ends of the line look).
- **Point Styling (**`PointSymbolizer`**):** Determines how a single coordinate is drawn. You define a `Graphic` (the shape) and a `Size`. By default, GeoServer uses "Well-Known Marks" like `circle`, `square`, `triangle`, `star`, and `cross`.

## 5. Label Styling (`TextSymbolizer`)

Labels bring the map to life but are notoriously tricky to get right.

- **Binding:** You must bind the label to a database attribute (e.g., tell GeoServer to print the `city_name` column).
- **Fonts & Halos:** You define font size, family, and weight. **Halos** (a colored outline around the text, usually white) are critical in web mapping to make text readable over busy backgrounds.
- **Placement:** You can anchor labels to the center of a point, offset them (e.g., 5 pixels up and right), or make them follow the curve of a line (like a river name).

## 6. Icons (`ExternalGraphics`)

Instead of using basic circles or squares for points, you can use custom images (like a little hospital bed icon or a coffee cup).

- In SLD, this is called an `ExternalGraphic`. You provide a URL or a local file path to an SVG or PNG file. SVGs are strongly preferred because they scale perfectly without pixelation.

## 7. Rule-Based Styling

Rules are the heart of SLD logic. Every time GeoServer looks at a feature in your database, it passes it through your list of Rules. If the feature meets the conditions of a Rule, the Symbolizer inside that Rule is applied.

### Attribute-Based Styling (Filtering)

This is a specific type of Rule where you filter data based on its database attributes.

- **Example:** You have a `roads` table. You create one rule: `<PropertyIsEqualTo> highway = 'motorway'</PropertyIsEqualTo>` and give it a thick red line. You create a second rule: `highway = 'residential'` and give it a thin grey line.

### Scale-Dependent Styling

This is another specific type of Rule based on the user's zoom level.

- You use `MinScaleDenominator` and `MaxScaleDenominator`.
- **Example:** You set a rule to only draw local street networks when the scale is below 1:50,000. If the user zooms out to view the whole country (1:10,000,000), the rule fails, the streets are not drawn, and the server saves massive amounts of processing power.

## 8. Color Ramps and Choropleth Maps

These are used for thematic mapping (visualizing statistics).

- **Color Ramps:** A progression of colors (e.g., light blue to dark blue). In GeoServer, you can use SLD `ColorMap` rules (specifically for raster data) to automatically interpolate values into a smooth color gradient.
- **Choropleth Maps:** A specific type of vector map where polygons (like states, counties, or zip codes) are colored based on a statistical attribute (like population density or income).
- **How it's done:** You achieve a choropleth in GeoServer by creating a series of **Attribute-Based Rules**. For example:
  - Rule 1: `population < 1000` -> Fill: Light Red
  - Rule 2: `population BETWEEN 1000 AND 5000` -> Fill: Medium Red
  - Rule 3: `population > 5000` -> Fill: Dark Red

