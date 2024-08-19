
import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.clear();
        navigate('/login');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Profile
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Container>
    );
};

export default Profile;
