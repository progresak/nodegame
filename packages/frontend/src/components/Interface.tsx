import React from 'react';

const Interface = () => (
    <div id="ui" style={{position:"absolute", top:"8px" ,left:"8px"}}>
        <div id="chat">
            <div id="chatdiv" className="chat-window">
                <div id="chat-text" className="chat-messages" style={{overflow:"auto"}}>
                    <div className="chat-messages-text" id="messages">
                        <p>Welcome on the server</p>
                    </div>
                </div>
            </div>
            <form id="chat-form" autoComplete="off">
                <label htmlFor="chat-input">To all</label>
                <input type="text" id="chat-input" />
            </form>
        </div>
        <div id="position">
            <span>[100,100]</span>
        </div>
    </div>
);

export default Interface;
