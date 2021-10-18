import React, { Component } from 'react';
import Counter from "./counter";

class Counters extends React.Component {
    render() { 
        return (
            <div>
                {/* We are adding Counter Objects which will be stacked  */}
                {/* This is one way to write them out manually --> <Counter/> <Counter/> */}
                {this.props.counters.map(counter => 
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
            </div>
        ); 
    }
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