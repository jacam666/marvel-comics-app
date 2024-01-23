import React, { useEffect, useState } from 'react';
import { getComics } from '../services/marvelApi';

const ComicList = () => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        const fetchComics = async () => {
            try {
                const data = await getComics();
                setComics(data);
            } catch (error) {
                // Handle error
            }
        };

        fetchComics();
    }, []);

    return (
        <div>
            <h1>Marvel Comics</h1>
            <ul>
                {comics.map((comic) => (
                    <li key={comic.id}>{comic.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ComicList;
