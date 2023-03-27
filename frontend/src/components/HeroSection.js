import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';



function HeroSection(){
    return(
    <div classname= 'hero-container'>
        <video src= "/videos/video-2.mp4" autoPlay loop muted/>
        <h1>Learning Never Exhausts the Mind</h1>
        <p>Join Now!</p>
        <div className="hero-btns">
            <Button 
            className='btns' 
            buttonStyle= 'btn--outline'
            buttonSize='btn--large'
            >
                GET STARTED</Button>
        <Button className='btns' buttonStyle= 'btn--primary'
            buttonSize='btn--large'>About the Tutors <i className='far fa-play-circle'/></Button>
        
        </div>
    </div>)


}

export default HeroSection
