// services/commonAPI.js
import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody) => {
    try {
        const config = {
            method: httpMethod,
            url: url,
            data: reqBody,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await axios(config);
        return response;
    } catch (error) {
        console.error('API Error:', error);
        if (error.response) {
            throw new Error(`Server Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('Network Error: Unable to connect to server. Please check if JSON server is running on port 3001.');
        } else {
            throw new Error('Request Error: ' + error.message);
        }
    }
}

export default commonAPI;