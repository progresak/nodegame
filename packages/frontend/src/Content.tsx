import React from 'react';
import 'typeface-roboto';
import Playfield from './components/Playfield';
import Interface from './components/Interface';
import OldSignIn from './components/OldSignIn';

const Content: React.FC = () => (
    <>
        <OldSignIn />
        <div id={'gameDiv'}>
            <Playfield />
            <Interface />
        </div>
    </>
);

export default Content;
