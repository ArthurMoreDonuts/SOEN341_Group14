
import React, {Component} from 'react';
import NavBar from './components/navbar';
import Counters from './components/counters';
import './App.css';
import AskQuestions from "./components/AskQuestions";
import { Switch, Route, Link } from "react-router-dom";

class App extends Component {
  
  render() {
    return(
      <React.Fragment>
        {/* Needed due to having multiple class Components */}
        <NavBar
          />
         
          
      </React.Fragment>
    );

    

    

  }
 
 
}

export default App;


