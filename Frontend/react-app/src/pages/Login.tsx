import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        setLoading(true); // Show loading state
        console.log('Attempting login with:', { email, password });

        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('API Response:', response);

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);

                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to homepage
                navigate('/home');
            } else {
                const error = await response.json();
                console.error('Login failed:', error);
                alert('Login failed: ' + (error.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred. Please check the console for details.');
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div>
            <nav className="navname">SyncSpace</nav>
            <div className="main-content">
                <div className="leftcontent">
                    <img src="./images/login.jpg" alt="Login" />
                </div>
                <div className="rightcontent">
                    <h2>Welcome Back</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="#" className="forgot-password">Forgot Password?</a>
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
