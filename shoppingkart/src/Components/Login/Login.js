
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import './Login.css';
import { FaUser, FaLock, FaShoppingCart } from 'react-icons/fa';
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios';
import setAuthToken from './setAuthToken';
import Auth from './Auth';
const mystorage = window.localStorage;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: { status: false, text: '' },
            pass: { status: false, text: '' },
            main: { status: false, text: '' },


        }

        this.validate = this.validate.bind(this);
        this.login = this.login.bind(this);
        this.hasError = this.hasError.bind(this);


    };

    validate(e) {
        const field = e.target;
        let update = {};

        switch (e.target.id) {
            case 'uname':
                if (field.value === "") {
                    update = { status: true, text: 'User Name is required' }
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = { status: true, text: 'Length between 4 & 21' }
                } else {
                    update = { status: false, text: field.value }
                }

                this.setState({
                    uname: update
                });
                break;
            case 'pass':
                if (field.value === "") {
                    update = { status: true, text: 'Password is required' }
                } else {
                    update = { status: false, text: field.value }
                }
                this.setState({
                    pass: update,
                });
                break;
            default:
                break;
        }
    };

    checkBlank() {
        const fields = document.getElementsByClassName('inp');
        for (let field of fields) {
            if (field.value === "") {
                return true;
            }
        }
        return false;
    }

    hasError() {
        return (this.state.uname.status || this.state.pass.status);
    }

    makeEmpty() {
        const fields = document.getElementsByClassName('inp');
        for (const field of fields) {
            field.value = "";
        }
    }
    login() {
        if (this.checkBlank()) {
            this.setState({
                main: { status: true, text: 'Please fill out empty fields!!' }
            });
            setTimeout(() => {
                this.setState({
                    main: { status: false, text: '' }
                });
            }, 2500);
        } else if (this.hasError()) {
            this.setState({
                main: { status: true, text: 'Please correct the errors!!' }
            });
            setTimeout(() => {
                this.setState({
                    main: { status: false, text: '' }
                });
            }, 2500);
        }
        else {


            const loginUser = {
                uname: this.state.uname.text,
                pass: this.state.pass.text
            };

            axios.post("http://localhost:5000/users/login", loginUser)
                .then(res => {
                    mystorage.setItem("username",this.state.uname.text)
                    
                    const response = res.data;
                    if (response) {

                        if ((response.usernamenotfound) || (response.passwordincorrect)) {
                            alert("username or password is incorrect");
                            this.makeEmpty();
                            this.props.history.push('/login');
                        }
                        else if (this.state.uname.text.toLowerCase === "admin") {
                            mystorage.setItem("token", res.data.token)
                            mystorage.setItem("userid", res.data.userid)
                            Auth.authenticate();
                            this.props.history.push('/createproduct');
                        }
                        else if (mystorage.getItem("username") === loginUser.uname) {
                            mystorage.setItem("token", res.data.token)
                            mystorage.setItem("userid", res.data.userid)
                            setAuthToken(res.data.token);
                            Auth.authenticate();
                            alert("User can continue shopping");
                            this.props.history.push('/');
                        }
                    }



                })
                .catch(error => {
                    console.log(error);
                })


        }

    }

  
    render() {
        return (
            <div className="wrapper">
                <div className="form_area">
                    <h1>Login!!</h1>
                    <Form>
                        <Form.Group>
                            <div className="input-section">
                                <Form.Label> <FaUser /> Username </Form.Label>
                                <input type="text" id="uname" className="inp" placeholder="Enter User Name"
                                    onChange={this.validate} />
                                {this.state.uname.status ? <div className="error">{this.state.uname.text}</div> : null}
                            </div>
                        </Form.Group>

                        <Form.Group >
                            <div className="input-section">
                                <Form.Label> <FaLock /> Password</Form.Label>
                                <input type="password" id="pass" className="inp" placeholder="Enter A Password"
                                    onChange={this.validate} />
                                {this.state.pass.status ? <div className="error">{this.state.pass.text}</div> : null}
                            </div>
                        </Form.Group>
                    </Form>
                    <div className="input-section">
                        <button type="submit" className="submit" onClick={this.login} >
                            <span>Login</span>
                            <FaShoppingCart />
                        </button>
                        {this.state.main.status ? <div className="submitError">{this.state.main.text}</div> : null}
                    </div>

                    <div className="redirect">
                        <Link to={'/register'} className="linkRegister">New User?Register</Link>
                        {/*<br/><br/>*/}
                        {/*<Link className="linkRegister">Forgot Password?</Link>*/}
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default withRouter(Login);
