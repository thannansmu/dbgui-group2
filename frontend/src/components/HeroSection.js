import React from 'react';
import '../App.css';
import { Button } from './Button';
import './styles/HeroSection.css'
import './styles/Button.css';

export const HeroSection = () => {
    
    return <>
        <div className='hero-container'>
            <video src="/videos/video-2.mp4" autoPlay loop muted />
            <center>
                <h1 style={{ color: 'white' }}>               Learning Never Exhausts the Mind</h1>
                <p style={{ color: 'white' }}>                Join Now!</p>
            </center>
            <div className="hero-btns">


            </div>
        </div>
    </>;
}
