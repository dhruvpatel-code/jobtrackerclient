import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../App.css';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            });

            if(response.ok) { 
                navigate('/login'); // Redirect to login page
            } else {
                alert('Signup failed. Please try again.'); // Show an error popup
            }
        } catch (error) {
            alert('An error occurred. Please try again.'); // Show an error popup
        }
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>
            <div className="form-floating">
                <input type="firstName" className="form-control" placeholder="First Name" required
                    onChange={e => setFirstName(e.target.value)} />
                <label>First Name</label>
            </div>
            <div className="form-floating">
                <input type="lastName" className="form-control" placeholder="Last Name" required
                    onChange={e => setLastName(e.target.value)} />
                <label>Last Name</label>
            </div>
            <div className="form-floating">
                <input type="email" className="form-control" placeholder="name@example.com" required
                    onChange={e => setEmail(e.target.value)} />
                <label>Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
        </form>
    );
}

export default Register;
