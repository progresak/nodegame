import React from 'react';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import store from './store';
import Layout from "./Layout";
import Playfield from "./components/Playfield";
import Interface from "./components/Interface";
import OldSignIn from "./components/OldSignIn";

const App: React.FC = () => (
    <Provider store={store}>
        <Layout>
            <OldSignIn />
            <div id={'gameDiv'}>
                <Playfield />
                <Interface />
            </div>
        </Layout>
    </Provider>

);

export default App;
