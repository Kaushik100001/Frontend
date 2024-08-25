import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'https://express-js-teal.vercel.app/bfhl'; // Replace with your Vercel URL

function App() {
    const [postData, setPostData] = useState('');
    const [postResponse, setPostResponse] = useState('');
    const [getResponse, setGetResponse] = useState('');

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(apiUrl, JSON.parse(postData), {
                headers: { 'Content-Type': 'application/json' },
            });
            setPostResponse(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setPostResponse(`Error: ${error.message}`);
        }
    };

    const handleGetRequest = async () => {
        try {
            const response = await axios.get(apiUrl);
            setGetResponse(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setGetResponse(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <h1>API Tester</h1>

            <h2>Test POST Request</h2>
            <form onSubmit={handlePostSubmit}>
                <textarea
                    value={postData}
                    onChange={(e) => setPostData(e.target.value)}
                    placeholder='Enter JSON data, e.g., {"data":["M","1","334","4","B","Z","a"]}'
                    required
                />
                <button type="submit">Send POST Request</button>
            </form>
            <pre>{postResponse || 'Response will appear here...'}</pre>

            <h2>Test GET Request</h2>
            <button onClick={handleGetRequest}>Send GET Request</button>
            <pre>{getResponse || 'Response will appear here...'}</pre>
        </div>
    );
}

export default App;
