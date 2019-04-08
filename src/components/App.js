import React, {Component} from 'react';
// import socketIOClient from "socket.io-client";
import './App.css';
import LoginScreen from "./LoginScreen";
import GameScreen from "./GameScreen";

class App extends Component {

    state = {
        logged: true,
        username: "Progres"
    };

    onFormLogin = (username) => {
        this.setState({username, logged: true})
    };


    render() {
        return (
            <div>
                {!this.state.logged ? <LoginScreen onFormLogin={this.onFormLogin}/> : <GameScreen/>}
            </div>
        );
    }
}

export default App;
