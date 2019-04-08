import React from 'react';

class LoginScreen extends React.Component {

    state = {username: ''};

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onFormLogin(this.state.username);
    };

    render() {
        return (
            <div className={'login-background'}>
                <div id="signDiv">
                    <h2>MMO Progres Fight</h2>
                    <form onSubmit={this.onFormSubmit}>
                        <label htmlFor="signDiv-username">
                            Nick:
                        </label>
                        <input className="form-control" type={'text'} value={this.state.username}
                               onChange={(e) => this.setState({username: e.target.value})}/>
                        <br/>
                        <input type="submit" className="btn btn-success" value="Přihlásit"/>
                    </form>
                    <span className="color-info" id="message-area"/>
                </div>
            </div>
        );
    }
}

export default LoginScreen;