import React, {useState} from 'react';
import { connect } from 'react-redux';
import {signIn} from "../ducks/App/actions";
import {RootState} from "../reducer";

interface OldSignInProps {
    signedIn: boolean;
    signIn: (credentials: { username: string, password: string }) => void;
}

const OldSignIn: React.FC<OldSignInProps> = ({ signedIn, signIn }) => {
    if (signedIn) {
        return null;
    }
    const [username, setUsername] = useState('');

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.currentTarget.value);

    const onFormSubmit = (e: React.FormEvent) => {
        console.log(typeof e);
        e.preventDefault();
        signIn({ username, password: '' });
    };

    return(
        <div id="signDiv">
            <h2>MMO Progres Fight</h2>
            <form id="signForm" onSubmit={onFormSubmit}>
                <label htmlFor="signDiv-username">
                    Nick:
                </label>
                <input onChange={handleUsernameChange} className="form-control" id="signDiv-username" />
                <input type="submit" className="btn btn-success" id="signDiv-in" value="Přihlásit" />
            </form>

            <span className="color-info" id="message-area" />
        </div>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        signedIn: state.app.authenticated,
    }
};

interface StateProps {
    signedIn: boolean
}

interface DispatchProps {
    signIn: (credentials: { username: string, password: string }) => void;
}


export default connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps, { signIn })(OldSignIn);
