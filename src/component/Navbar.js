import './Navbar.css';
import troll from '../images/trollFace.svg'

export default function Navbar() {
    return (
        <div className="Navbar">
            <img className='nav--img' src={troll} alt='Troll'/>
            <h1 className='nav--title'>Meme Generator</h1>
        </div>
    )
}