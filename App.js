import React, { Component } from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters'
import './App.css';

class App extends Component 
{
  state =
  {
      counters: 
          [   
              { id: 1, upValue: 4, downValue: 0},
              { id: 2, upValue: 0, downValue: 0},
              { id: 3, upValue: 0, downValue: 0},
              { id: 4, upValue: 0, downValue: 4}
          ]
  };
  render()
  {
    return (
      <React.Fragment>
       <NavBar/>
          <main className = "container">
            <Counters
              counters = {this.state.counters}
              onIncrement = {this.handleIncrement}
              onDecrement = {this.handleDecrement}
            />
          </main>
      </React.Fragment>
    );
  }

  handleDecrement = counter =>  //increasing decrement counter by 1
    {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].downValue++;
        this.setState({ counters });
    };

    handleIncrement = counter => //increasing increment counter by 1
    {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].upValue++;
        this.setState({ counters });
    };

}

export default App;
