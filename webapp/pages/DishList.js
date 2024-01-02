import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const DishList = () => {
    const [dishes, setDishes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDishes = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token'); // Get token from local storage
            if (!token) {
                // If no token is found, redirect to the login page
                router.push('/login');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/dishes', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request headers
                    }
                });
                setDishes(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDishes();
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading dishes: {error}</p>;

    return (
        <div>
            <h2>Dishes</h2>
            <ul>
                {dishes.map(dish => (
                    <li key={dish._id}>
                        <h3>{dish.name}</h3>
                        <p>{dish.description}</p>
                        <p>Price: ${dish.price}</p>
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DishList;
