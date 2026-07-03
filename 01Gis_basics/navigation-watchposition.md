# Location Tracking  
## Navigation:
Allows user to move around and interact with the map.   
Navigation refers to how users interact with the map.  
  
What can you do?

Zoom in and out  
Drag the map  
Rotate the map  
Double-click to zoom  
Pinch to zoom (mobile)  
Use the mouse wheel to zoom
  
    
These are all navigation interactions.
  
Navigation works automatically.
  
  ### Differnce Between View and Navigation:  
  View stores the centre, the zoom , the rotation whereas Navigation changes the View.  

 
      

## watchPosition(): 
Tracks users real-world location using the device's GPS.   
## GeoLocation API: 
Browsers Provide a geolocation api that has 2 methods.  
1)  navigator.geolocation.getCurrentPosition():  
this fetches the current location once.    
  

2) navigator.geolocation.watchPosition()  
this tracks the location(eg, walking eiht googlemaps, the location keeps on refreshing)
  
    
Flow  
  

GPS

↓

Current Location

↓

watchPosition()

↓

Callback Function

↓

Update Map  
  
    
````
## Syntax:  


navigator.geolocation.watchPosition(
  successCallback,
  errorCallback,
  options
);  

example:  
navigator.geolocation.watchPosition((position) => {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
});  
  
everytime location changes function runs again.
  
# What is position.coords?  
It contains latitude, longitude, Accuracy, Altitude, Heading, Speed
  position.coords.latitude  -> return latitude  
  
````
   
