import React, { Component } from 'react'
import Axios from 'axios';
import  { BrowserRouter as Router, Redirect } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {'email': '', 'password': '', 'error': false, 'authed': false};
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
    }   

    login(e) {
        e.preventDefault();
        Axios.post('/api/auth', {
            'email': this.state.email,
            'password': this.state.password,
        }).then(response => {
            if(response.data.error) {
                this.setState({'error': true});
            } else {
                this.setState({'authed': true, 'error': false});
                window.location.reload();
            }
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    render() {
        return (
            <div className="container">
            <div className="row dash-div justify-content-center ">
                <div className="info row col-12">
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="john.doe@gmail.com" name="email" value={this.state.email} onChange={this.onChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="" name="password" value={this.state.password} onChange={this.onChange} className="form-control"/>
                        </div>
                        <div className="form-group">
                        <button type="submit" className="btn btn-success">Login</button>
                        </div>
                    </form>
                </div>

                <div className="col-6 text-center">
                    {this.state.error ? <h2 className="alert alert-danger">Incorrect email or password, please check your credentials.</h2>: ""}
                </div>
            </div>
        </div>  
        );
    }
}

export default Login;
