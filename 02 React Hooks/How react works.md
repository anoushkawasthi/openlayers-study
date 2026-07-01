React is a highly optimized state machine paired with Virtual DOM. It is a special library of Javascript that helps in building faster UI. 
## How react functions under the hood?  
There are 4 core concepts:
1) The JSX Compilation(or older React.createElement)  
2) The Virtual DOM  
3) The Rendering Pipeline  
4) React Fiber  
  
  1) The JSX Compilation:  
  So when the jsx code is executed (JSX-> HTML in react) it first converts that into standard Javascript using specialized functions like _jsx in older times we used React.createElement.  
  JSX is converted to JS   
    
      
      _jsx(type, {childern})  
        
        React.createElement(type,{props}, children)  
          

  ````
  Suppose Code says  
  <div id="Container>
  <h1>Hello</h1>
  </div>


  So this converted to 
  _jsx("div",{
    id="Container",
    children: _jsx("h1",{
        children: "Hello"
    })
  })

  and if it were React.createElement  
    
    React.createElement("div", {
    id: "Container", },
    React.createElement("h1",null, "Hello"))  
````  
  
    

2) The Virtual DOM:  
Virtual DOM is a lightweight in memory representaion of what ui looks like.  
Manipulating Real DOM is expensive, everytime state changes the DOM tree changes.  
Instead what react does is it keeps a light weight in memory represention of how the ui must look like.  
    
When you make changes in the code the real DOM has to go through a heavy and computationally expensive process to reconstruct.  
VDOM compares the real DOM with the VDOM and identifies the exact difference (Reconciliation / diffing ) and then only those changes are implemented.  
  
    
3) The three phase Rendering cycle:  
Phase 1: Trigger  
A render is triggered either by the initial loading or a state chnage. React adds it to the Queue.  
  

Phase 2: Render (Reconciliation / diffing )  
React calls the component function, checks how thr UI should look like and generates a new VDOM tree and compares against the old VDOM using Heuristic Algorithm. Flags the exact changes.  
  
Phase 3: Commmit  
Once we know what exactly chnaged in the UI we apply make those changes.  
  

4) React FIber:  
Before React 16 the Reconciliation was synchronus. If there was a massive component DOM tree it would lock up the main thread hile comparing the old and new VDOMs's, which would cause the browser to drop frames.  
React rewrote its core engine -> React Fiber  
A Linked List: Instead of a strict tree, Fiber turns the VDOM into a linked list of "Fiber nodes." Each node represents a component and keeps track of its own state, props, and DOM element.  
  
Interruptible Work: Because it's a linked list, React can pause its rendering work, yield control back to the browser so it can handle user inputs or animations, and then resume rendering exactly where it left off. This is called Time Slicing or Concurrent Rendering  
