import React, { SyntheticEvent, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Use the useAuth hook to access the login method
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // Required for cookies to be sent/received
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.ok) {
                // Call the login method from AuthContext on successful login
                login();
                navigate('/dashboard'); // Navigate to the protected page or dashboard
            } else {
                // Handle login failure
                alert('Failed to login. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    );
}

export default Login;
