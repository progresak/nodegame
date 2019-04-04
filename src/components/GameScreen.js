import React from 'react';
import Chat from "./Chat";

class GameScreen extends React.Component {

    render() {
        return (
            <div id="gameDiv">
                <canvas id="ctx"/>
                <canvas id="ctx-ui"/>
                <div id="ui">
                    <Chat />
                    <div id="position">
                        <span>[100,100]</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameScreen;