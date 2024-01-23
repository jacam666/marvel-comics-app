import axios from 'axios';
import CryptoJS from 'crypto-js';

const publicKey = '1403c870bb6c735fe8beca397b1b9613';
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const baseUrl = 'https://gateway.marvel.com/v1/public/comics';

export const getComics = async () => {
    try {
        // generate a timestamp
        const ts = new Date().getTime();

        // generate a hash using md5
        const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

        // make the API request with axios
        const response = await axios.get(baseUrl, {
            params: {
                apikey: publicKey,
                ts: ts,
                hash: hash,
                // other parameters if needed
            },
        });
        return response.data.data.results;
    } catch (error) {
        console.error('Error fetching comics:', error);
        throw error;
    }
};
