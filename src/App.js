import React, { useEffect, useState } from 'react';
import { getComics } from './services/marvelApi';
import './App.css';

function App() {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await getComics();
        setComics(data);
      } catch (error) {
        // Handle error
        console.error('Error fetching comics:', error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className="App">
        <header className="App-header">
            <h1>Marvel Comics</h1>
            <ul>
                {comics.map((comic) => (
                      <li key={comic.id}>
                        <h3 className='comic-title'>{comic.title}</h3>
                        {comic.imageUrl && <img className='card-image' src={comic.imageUrl} alt={comic.title} />}
                        <p>{comic.description}</p>
                    </li>
                ))}
            </ul>
        </header>
    </div>
);
}

export default App;
