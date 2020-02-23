import React from 'react';
import Playfield from './components/Playfield';
import Interface from './components/Interface';
import SignIn from './components/views/SignIn';
import styled from 'styled-components';
import { RootState } from './reducer';
import { connect } from 'react-redux';
import { isAuthenticated } from './ducks/App/selectors';

interface ContentProps {
    signedIn: boolean;
}
const Content: React.FC<ContentProps> = ({ signedIn }) => (
    <AllWrapper>
        {!signedIn ? <SignIn /> : null}

        <div hidden={!signedIn} id={'gameDiv'}>
            <Playfield />
            <Interface />
        </div>
    </AllWrapper>
);

const AllWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #2D3142;
    position: fixed;
    top: 0;
    left:0;
`;

const mapStateToProps = (state: RootState) => {
    return {
        signedIn: isAuthenticated(state)
    };
};

interface StateProps {
    signedIn: boolean;
}

export default connect<StateProps, {}, {}, RootState>(mapStateToProps)(Content);
