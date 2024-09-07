import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

import './index.css';

export default function Login(props) {

    const navigate = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [message] = useState(props?.location?.state ? props?.location?.state?.message : '');
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
	var [invalidMessage, setInvalidMessage] = useState('');
        
    
    useEffect(() => {
        if (redirect) {
            navigate('/dashboard');
        }
    }, [redirect])
    //I didn't had the time to change
    const signIn = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5001/user/signin',
            data: {
                username: login.username,
                password: login.password
            }
        })
            .then(function (res) {
                if (res.status === 200) {
                    localStorage.setItem('id', res.data.data.id);
                    localStorage.setItem('name', res.data.data.name);
                    localStorage.setItem('username', res.data.data.username);
                    localStorage.setItem('token', res.data.token);
                    setRedirect(true)
                }
            })
            .catch(function (error) {
								setInvalidMessage("Username o password errati");
                console.log(error);
            })
    }
    
    return (
        <div className="LoginForm col-md-6">
            <hr className="my-3" />
            {
                message !== '' ? (
                   <Alert color="danger" className="text-center"> {message} </Alert>
                ) : 
								invalidMessage !== '' ?(
									<Alert color="danger" className="text-center"> {invalidMessage} </Alert>
								) : ''
            }
            <Form>
                <FormGroup>
                    <Label for="input">Username</Label>
                    <Input type="text" value={login.username} id="username" onChange={e => setLogin({ ...login, username: e.target.value })} placeholder="Inserisci il tuo nome utente" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" value={login.password} id="password" onChange={e => setLogin({ ...login, password: e.target.value })} placeholder="Inserisci la tua password" />
                </FormGroup>
                <Button color="primary" block onClick={signIn}> Login </Button>
                <Button color="secondary" style={{marginTop: "10px"}} block onClick={() => navigate('/signup')}> Signup </Button>
            </Form>
        </div>
    )
}
