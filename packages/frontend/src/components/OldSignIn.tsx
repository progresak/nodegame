import React from 'react';
import { connect } from 'react-redux';

const OldSignIn = ({ signedIn }) => {
    if (signedIn) {
        return null;
    }

    return(
        <div id="signDiv">
            <h2>MMO Progres Fight</h2>
            <form id="signForm">
                <label htmlFor="signDiv-username">
                    Nick:
                </label>
                <input className="form-control" id="signDiv-username" />
                <input type="submit" className="btn btn-success" id="signDiv-in" value="Přihlásit" />
            </form>

            <span className="color-info" id="message-area" />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.app.authenticated,
    }
}

export default connect(mapStateToProps)(OldSignIn);
