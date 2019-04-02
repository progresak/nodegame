import React from 'react';

class GameScreen extends React.Component {

    render() {
        return (
            <div id="gameDiv">
                <canvas id="ctx"/>
                <canvas id="ctx-ui"/>
                <div id="ui">
                    <div id="chat">
                        <div id="chatdiv" className="chat-window">
                            <div id="chat-text" className="chat-messages">
                                <div className="chat-messages-text" id="messages">
                                    <p>Vítejte na serveru</p>
                                </div>
                            </div>
                        </div>
                        <form id="chat-form" autoComplete="off">
                            <label htmlFor="chat-input">Všem</label><input type="text" id="chat-input"/>
                        </form>
                    </div>
                    <div id="position">
                        <span>[100,100]</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameScreen;