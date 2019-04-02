import React, {Component} from 'react';
import './App.css';
import LoginScreen from "./LoginScreen";
import GameScreen from "./GameScreen";

class App extends Component {
    render() {
        return (
            <div>
                <LoginScreen/>
                <GameScreen/>
            </div>
        );
    }
}

export default App;
