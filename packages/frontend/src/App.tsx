import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import 'typeface-roboto';
import store from './store';
import Layout from './Layout';
import Content from './Content';

const GlobalStyle = createGlobalStyle`
    body {
      font-family: 'Roboto', sans-serif;
    }
`;

const App: React.FC = () => (
    <Provider store={store}>
        <GlobalStyle />
        <Layout>
            <Content />
        </Layout>
    </Provider>
);

export default App;
