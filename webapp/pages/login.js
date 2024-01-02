import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    // useEffect(() => {
    //     // Check if user is already logged in
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         router.push('/'); // Redirect to home page or a different route
    //     }
    // }, [router]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', { username, password });
            localStorage.setItem('token', response.data.token);
            router.push('/'); // Redirect to home page or dashboard
        } catch (error) {
            console.error('Login error', error);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100%' },
                maxWidth: '400px',
                margin: 'auto',
                marginTop: 5
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleLogin}
        >
            <h1>Login</h1>
            <div>
                <TextField
                    required
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    required
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div style={{ marginTop: '20px', marginLeft: '10px' }}>
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </div>
        </Box>
    );
};

export default LoginPage;
