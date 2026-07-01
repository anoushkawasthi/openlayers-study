# useState Hook  
Functional Components had no memory. So if we wanted to have state we had to inherit React.Component.  
but React Component were bulky, were difficult to reuse, maintain and scale, this keyword was confusing.  
In React 16.8(2019) React Hooks were introduced.
  
   
## "useState Hook": The most fundamental hook.  
A built in react function that lets you hook into React's internal state management system from a functional component.  
````
import {useState} from "react";  
function Counter(){
    const [count, setCount] = useState(0);
    return (
        <button onCLick=()=>{setCount(count+1)}> Clicked {count} times </button>  
    );
};
````

## What exactly happens?   

1) Initialization: When useState(0) is called for the very first time, React creates a slot in its internal memory (attached to the Fiber node) for this specific component and stores the initial value 0.

2) Triggering a Render: Just like this.setState (as explained in section 3), calling setCount(count + 1) does two things: it updates the value in React's memory, and it signals React to queue a re-render.

3) Fetching the Memory: When React re-renders the Counter function, it executes the code from the top down and calls useState(0) again. But this time, React remembers that it already has a stored value for this component. Instead of giving you the initial 0, it reaches into the Fiber node and gives you the updated value!