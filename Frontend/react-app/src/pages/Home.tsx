import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the User type to match the user object structure
interface User {
    username: string;
    name: string;
    email: string;
}

function Home() {
    const [user, setUser] = useState<User | null>(null); // Explicitly type the user state
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Redirect to login if no user data is found
            navigate('/');
        }
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Homepage!</h1>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
}

export default Home;
