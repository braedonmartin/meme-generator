import React, {useState, useEffect} from 'react';
import './Meme.css';

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        memeImg: ''
    });

    const [allMemeImages, setAllMemeImages] = useState([]);


    // On page load, randomize the meme
    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(data => setAllMemeImages(data.data.memes))
            .catch(err => console.log(err));
    },[]);

    // After the data is set on page load, randomize the meme
    useEffect(() => {randomMeme()}, [allMemeImages]);


    // Pick a random meme from the data array
    function randomMeme(){
        if (!allMemeImages.length) return console.log('No memes found');
        const randomIndex = Math.floor(Math.random() * allMemeImages.length);
        const url = allMemeImages[randomIndex].url
        setMeme(prevMeme => ({...prevMeme, memeImg: url}));
    }

    // Add top or bottom text to the meme depending on which input is used
    function handleChange(e) {
        const {name, value} = e.target; // apparently good practice
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    return (
        <main className="main">
            <div className='form'>
                <input
                    className='meme--input'
                    name='topText'
                    // setting the value to our state ensures there aren't multiple versions of truth,
                    // also gives react control of the input field, instead of the input telling react what to be
                    value={meme.topText} 
                    onChange={handleChange}
                    type='text'
                    placeholder='Meme top text'/>
                <input
                    className='meme--input'
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                    type='text' 
                    placeholder='Meme bottom text'/>
                <button 
                    className='meme--button' 
                    type='button'
                    onClick={randomMeme}
                    >Get a new meme image 🖼</button>
            </div>
            <div className='meme--container'>
                <h2 className='meme--top meme--text'>{meme.topText}</h2>
                <img className='meme--image' src={meme.memeImg} alt='meme'/>
                <h2 className='meme--bottom meme--text'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}