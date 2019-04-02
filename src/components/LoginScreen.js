import React from 'react';

class LoginScreen extends React.Component {

    onFormSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <div id="signDiv">
                <h2>MMO Progres Fight</h2>
                <form id="signForm" onSubmit={this.onFormSubmit}>
                    <label htmlFor="signDiv-username">
                        Nick:
                    </label>
                    <input className="form-control" id="signDiv-username"/>
                    <br/>
                    <input type="submit" className="btn btn-success" id="signDiv-in" value="Přihlásit"/>
                </form>
                <br/>
                <span className="color-info" id="message-area"/>
            </div>
        );
    }
}

export default LoginScreen;