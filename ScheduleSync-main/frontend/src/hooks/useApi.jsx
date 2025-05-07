import { useState } from 'react';

function useApi() {

    const API_URL = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async (path, data, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            let x=localStorage.getItem('token')
            console.log(x);
            console.log(data);
            const response = await fetch(`${API_URL}${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    ...options.headers,
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (!response.ok) {
                setError(new Error(`HTTP error! status: ${response.status}`));
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            setError(error);
            console.error("Error in POST request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const get = async (path, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}${path}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    ...options.headers,
                },
                credentials: 'include',
            });
            if (!response.ok) {
                setError(new Error(`HTTP error! status: ${response.status}`));
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            setError(error);
            console.error("Error in GET request:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        post,
        get,
        loading,
        error,
    }

}

export default useApi;