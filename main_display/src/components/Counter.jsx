import React, { Component } from 'react';

class Counter extends Component {
    state = {
        /*---->count: this.props.value, <--------    //Hold the number of counts
        ==>need to delete that because we need to only use the "props"
        this is going to allow a single value of truth 
        This is going to sending the value from the parent to the child
        Getting the value from counter.value */

        tags: ["tag1", "tag2", "tag3"]
    };

    styles = {
        fontWeight: 'bold', //Don't forget the " , " in between each statement
        fontSize: 20
    };
    
    render() {
        return (
            
            <div> {/* Going to be holding all the JSX variables within the div */}

                {/* <h1>Hello World</h1> // Creating a JSX String */}

                {this.props.children}
                {/* This is what is going to display the Titles above the span and button */}

                <span style = {this.styles} className = {this.getBadgeClasses()}> {this.formatCount()} </span>
                {/* You are calling a function in the className that will dynamically get the specific
                class name based on condition in that function */} 
                {/* The {} are going to be creating a dynamic value */}
                {/* Object going to be calling the method which will return what to display */}   
                <button 
                    onClick = {() => this.props.onIncrement (this.props.counter)}
                    //when we want to pass an element to an event handler
                    //make sure that we keep the same name for the variable
                    //Going to be moving the handleIncrement to the Counters
                    //Going to be doing exactly what we did for the onDelete function 
                    className='btn btn-secondary btn-small'> Increment
                </button>
                {/* Creating a button */}
                {/* Using the Bootstrap className function to get athetic looks on browser */}
                <ul>
                    {this.state.tags.map(tag => <li key = { tag }> { tag } </li>)}
                    {/* This means that we get each tag from the state of the current object */}
                    {/* We are then going to take the tag value and map it using <li></li> */}
                    {/* If you didnt add the {tag}, then you were only going to get the dots */}
                    {/* Now by adding the tags, we are going to be populating the list with the tag values */}
                    {/* Important to have the keys for the list */}   
                </ul>
                <button 
                    className = "btn btn-danger btn-sm m-2"
                    onClick = {() => this.props.onDelete(this.props.counter.id)}> 
                    Delete {/* Name of the button */}
                    {/* Going to go to the event handler for deleting this counter */}
                    {/* onDelete is going to be raising an event */}
                    {/* The parent is going to be handling that event */}
                </button>
            </div>
        );
    }

    //Need to use this to have access to Event Handlers "=() =>""
    //Basically when it gets called when something happens, like with a click
    // handleIncrement = () => {
    //     this.setState( { count: this.state.count +1 })
    //     //setState is going to be telling React that we are updating the state
    //     //It will then bring the virtual dom in sync with the real dom
    //     //Which is why we are going to be able to see the changes on the website
    // };
    
    //Going to be putting this function in the Counters Class

    formatCount() {
        {/* Going to the object_state->count-> (count_value ) */} 
        return this.props.counter.value === 0 ? 'Zero' : this.props.counter.value;
        {/* If the count is 0, going to make the span say Zero */}
        {/* If the count is not 0, it will show the count number */}
    }

    getBadgeClasses() {
        let classes = "badge m-2 ";     //"let" is going to make that varibale be able to change
        classes += (this.props.counter.value === 0) ? "badge-warning" : "badge-primary";    //Going to add that that string, the missing pieces
        //this says if the state count is 0, then chose the badge-warning color, if not pick the badge-primary color
        return classes  //going to return the string
    }

}
 
export default Counter;