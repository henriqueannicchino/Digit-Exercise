import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {

        const token = localStorage.getItem('token')
        const name = localStorage.getItem('name')

        //I didn't had the time to implement the check trough the backend
        if(!name || !token) {
            navigate('/logout');
        }
        else {
            setUser({ name })
        }

    }, [])

    return (
        <div>
            <hr className="my-3" />
            <p>
                {user ?
                    <code> {user.name}, effettuato l'accesso con successo! </code>
                    :
                    <></>
                }

            </p>
            <Link to="/logout" className="btn btn-outline-primary"> Logout </Link>
        </div>
    )
}