import React from 'react';
import Chat from './Chat';

const Interface = () => (
    <div id="ui" style={{ position: 'absolute', top: '8px', left: '8px' }}>
        <Chat />
        <div id="position">
            <span>[100,100]</span>
        </div>
    </div>
);

export default Interface;
