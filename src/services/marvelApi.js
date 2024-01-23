import axios from 'axios';
import CryptoJS from 'crypto-js';

const publicKey = '1403c870bb6c735fe8beca397b1b9613';
const privateKey = '0734c46da7dc7f24332596af5e1690156a697715';
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
        return response.data.data.results.map(comic => {
            const { id, title, description, images } = comic;
            const imageUrl = images.length > 0 ? `${images[0].path}.${images[0].extension}` : null;

            return {
                id,
                title,
                description,
                imageUrl,
            };
        });
    } catch (error) {
        console.error('Error fetching comics:', error);
        throw error;
    }
};
