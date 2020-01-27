import React from 'react';
import LoginForm from './components/views/LoginForm';
import { Test } from '@nodegame/ui';
import 'typeface-roboto';

const App: React.FC = () => (
    <div className="App">
        <LoginForm />
        <Test />
    </div>
);

export default App;
