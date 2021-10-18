import React, {Component} from 'react';
import NavBar from './Components/navbar';
import Counters from './Components/counters';
import './App.css';

class App extends Component {
  state = {
    counters: [
        {id: 1, value: 3},
        {id: 2, value: 2},
        {id: 3, value: 1},
        {id: 4, value: 0}
    ]
}
  render() {
    return(
      <React.Fragment>
        {/* Needed due to having multiple class Components */}
        <NavBar
          totalCounters = {this.state.counters.filter(c => c.value > 0).length }/>
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
      </React.Fragment>
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

export default App;







