import React from 'react';
import { Provider } from 'react-redux';
import 'typeface-roboto';
import store from './store';
import Layout from './Layout';
import Content from './Content';

const App: React.FC = () => (
    <Provider store={store}>
        <Layout>
            <Content />
        </Layout>
    </Provider>
);

export default App;
