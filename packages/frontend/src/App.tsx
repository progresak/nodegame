import React from 'react';
import 'typeface-roboto';
import Layout from "./Layout";
import Playfield from "./components/Playfield";
import Interface from "./components/Interface";
import OldSignIn from "./components/OldSignIn";

const App: React.FC = () => (
    <Layout>
        <OldSignIn />
        <div id={'gameDiv'}>
            <Playfield />
            <Interface />
        </div>
    </Layout>

);

export default App;
