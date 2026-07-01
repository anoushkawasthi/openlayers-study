## Why do we need react hooks?  
  
### Everything in React is a Component  
A component is a simply a piece of UI. LIke suppose in a webage, it has a sidebar, navbar, main content, footer, etc, all these are components. 
````
function NavBar(){
    return <nav>NavBar</nav>
}
function SideBar(){
    return<aside>SideBar</aside>
}
function Footer(){
    return <footer>Footer</footer>
}
````
These are all functional components.  
Now these are great but everytime they execute they reassign the values, so no persistent memory.
To fix this we had react class components.  
  
  ### 1) Why do functional components have no persistent memory?  
  When a standard JavaScript function runs, the engine creates a temporary execution context. Any variables declared inside that function are created in memory, used, and then destroyed (garbage collected) as soon as the function finishes executing (returns).  
    
   Before React Hooks existed, a functional component was literally just a basic JavaScript function. Every time React needed to update the UI (re-render), it would call that function again from scratch.
  
### How does Javascript class works?  
````
class Student{
    constuctor(name){
        this.name=name;
    }
    greet(){
        console.log("hello"+ this.name);
    }
}
const s=new Student("Anoushka")
s.greet();
````
  
Classes have   
1) Properties  
2) Methods  
3) Constructor  

### 2) What is react class component?  
````
class Welcome extends React.Component{
    render(){
        return <h1>Hello</h1>
    }
}
````  
A React Class Component is a standard JavaScript ES6 class that explicitly inherits from a base class called React.Component .  
It inherits an entire blueprint of built-in React features. Specifically, it inherits:

-> The state object: A dedicated place to store data.

-> Lifecycle Methods: Special functions like componentDidMount() (runs when the component first appears) or componentWillUnmount() (runs right before it is destroyed).

-> The render() method: The only required method, which tells React what HTML/JSX to draw on the screen.  
-> Why does this solve the memory problem?  
Unlike a simple function that is called and destroyed, React instantiates a Class Component. It creates a physical Object (const myComponent = new Welcome()) and keeps that object alive in the browser's memory for as long as the component is on the screen.   
Because the object persists, its this.state property persists across re-renders.  

React Class Component gives it superpowers. -> It inherits all the react features.  
Now classes can create objects which help have a persistent memory. 
````
class Counter{
    constructor(){
        this.count++;
    }
}

const c=new Counter();
````
 
````
c.count++;
````
Now everytime this is called the value is updated now reinitialized first, since the object continues to exist.  
  
    

## State in Class Components  
````
//NOW CREATING A CHLID CLASS
  
class counter extends React.Component{
    constructor(){
        super();
        this.state={
            count=0;
        }
    }
    render(){
        return (
            <h1>this.state.count</h1>
        );
    }
}

// Now here we cannot change the state directly, by simply using this.state.count++ instead  
  
this.setState({
    count:this.state.count+1
});  
  
  3) Why does this.state.count++ not work directly?

If you write this.state.count++, the value does actually change in the browser's memory. However, the screen will not update. Why? Because React doesn't know you changed it.

React is not constantly monitoring your variables to see if they change. It relies on a "push" system.

When you mutate the state directly (this.state.count++), you are just silently changing a JavaScript object. When you use this.setState({ count: 1 }) (or the setCount hook in modern React), two crucial things happen:

->  It updates the value in memory.

->  It signals React: It tells React, "Hey! I just changed some data. Please add this to the Update Queue, trigger the Virtual DOM diffing process, and re-render the screen."