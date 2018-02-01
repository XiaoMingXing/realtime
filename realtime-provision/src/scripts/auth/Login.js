import React, {Component} from "react";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isRemember: false
        }
    }

    login = () => {
        console.log(this.state);
    };

    render() {
        return (
            <div>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label className="control-label" htmlFor="email">Email</label>
                            <div className="input-group">
                                <span className="input-group-addon">@</span>
                                <input type="text" className="form-control" id="email"
                                       value={this.state.email}
                                       aria-describedby="emailStatus"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password"
                                   value={this.state.password}
                                   aria-describedby="passwordStatus"/>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value={this.state.isRemember}/> Remember me
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.login}>Login</button>
                    </fieldset>
                </form>
            </div>);
    };
}

export default Login;
