import React, { Component } from 'react';
import Counter from "./Counter";

class Counters extends React.Component {
    state = {
        counters: [
            {id: 1, value: 3},
            {id: 2, value: 2},
            {id: 3, value: 1},
            {id: 4, value: 0}
        ]
    }
    render() { 
        return (
            
            <div>
                {/* We are adding Counter Objects which will be stacked  */}
                {/* This is one way to write them out manually --> <Counter/> <Counter/> */}
                {this.state.counters.map(counter => 
                    <Counter key = {counter.id}
                        onDelete = {this.props.onDelete}
                        onIncrement = {this.props.onIncrement}
                        id = {counter.id}
                        // value = {counter.value}  //Going to be pass value to child
                        // selected = {true}        //* Can act like a flag, good to keep *//
                        // id = {counter.id}
                        counter = {counter}
                        //instead of writting the 3 properties on top
                        //You can simply an object to itself, which will include any of the properties
                        //Also if we add a new component, we do not need to add another one of those statements

                        > 
                        {/* this is going to be passing the function to the child */}
                        {/* We are passing a reference to a function */}

                            <h4> Question # {counter.id} </h4>
                            <h4> Author: </h4>
                            <input className="form-control me-2" type="search" placeholder="Author Text" aria-label="Search"/>
                            <h4> Title: </h4>
                            <input className="form-control me-2" type="search" placeholder="Title Text" aria-label="Search"/>
                            <h4> Description: </h4>
                            <input className="form-control me-2" type="search" placeholder="Desciption Text" aria-label="Search"/>
                            <h4> Time Created: </h4>
                            <input className="form-control me-2" type="search" placeholder="Time Text" aria-label="Search"/>       
                            {/* This is what is going ot appear before each child instance */}
                            {/* Now we are going to add the id number to the designated Title */}
                            {/* IMPORTANT ==> The <h4> is going to be considered the "children" */}
                            {/* That is what you are passing to the Counter class using props */}
                    </Counter> 
                     ) }
                {/* We are going to be maping the counter with the counters array */}
           
                {/* Creating the NavBar */}
          {/* It is going to show the total number of Counters that are greater than 0 */}
          <main className = "container">
            {/* What is going to be underneath the NavBar */}
            <Counters 
              onIncrement = {this.handleIncrement}
              onDelete = {this.handleDelete}
              counters = {this.state.counters} 
            />
            {/* Implementing all the Counters page */}
          </main>
         
          </div>
        ); 
    }
    handleDelete = counterId => {
        const counters = this.state.counters.filter(c => c.id !== counterId);
        //we are filtering out all of the counters that DO NOT contain that id
        //It is going to be generating a new array that is going to be held in "counters"
        this.setState({ counters: counters});
        //This is going to tell react that we are updating the counters array
        //Generating the new array that does not contain the 
      };
    
      handleIncrement = counter => {
        const counters = [...this.state.counters];
        //Means that you are cloning the current array and saving it in counters
        const index = counters.indexOf(counter);
        //This will find the key (or id / index) of the counter argument that we are recieving
        counters[index] = {...counter};
        //this will clone the counter argument that you will recieve from the top
        //This is so that you dont directly update the value of the state
        //This is so that when you reset it, you will still have the same base (if you so want to)
        counters[index].value++;
        //going to be updating the clone element from the clone array
        this.setState({ counters });
        //This is going to tell react that we are updating the counters array
        //Passing the clone and setting it to the clone values
      }; 
   
}
 
export default Counters;

// render() {
//     return (
//        <input
//            type="text"
//            value={this.state.value}
//            onChange={this.handleChange}
//         />
//     );

// }
//This is how you add text
//Specifically, this is how you 