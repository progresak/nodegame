import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../ducks/App/actions';
import { RootState } from '../reducer';
import styled from 'styled-components';

interface OldSignInProps {
    signedIn: boolean;
    signIn: (credentials: { username: string; password: string }) => void;
}

const OldSignIn: React.FC<OldSignInProps> = ({ signedIn, signIn }) => {
    useEffect(() => {
        window.setTimeout(() => {
            signIn({ username: 'Progres', password: '' });
        }, 400);
    }, []);
    if (signedIn) {
        return null;
    }
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(e.currentTarget.value);

    const onFormSubmit = (e: React.FormEvent) => {
        signIn({ username, password: '' });
        e.preventDefault();
    };

    return (
        <SignInWrapper id="signDiv">
            <h2>MMO Progres Fight</h2>
            <form id="signForm" onSubmit={onFormSubmit}>
                <label htmlFor="signDiv-username">Nick:</label>
                <input
                    onChange={handleUsernameChange}
                    className="form-control"
                    id="signDiv-username"
                />
                <input
                    type="submit"
                    className="btn btn-success"
                    id="signDiv-in"
                    value="Přihlásit"
                />
            </form>

            <span className="color-info" id="message-area" />
        </SignInWrapper>
    );
};

const SignInWrapper = styled.div`
    width: 400px;
    min-height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px 20px;
    background: #333;
    color: #eee;
`;

const mapStateToProps = (state: RootState) => {
    return {
        signedIn: state.app.authenticated
    };
};

interface StateProps {
    signedIn: boolean;
}

interface DispatchProps {
    signIn: (credentials: { username: string; password: string }) => void;
}

export default connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, { signIn })(
    OldSignIn
);
