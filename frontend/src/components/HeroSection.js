import React from 'react';
import '../App.css';
import { Button } from './Button';
import './styles/HeroSection.css';



export const HeroSection = () =>{
    return<>
    <div classname= 'hero-container'>
        <video src= "/videos/video-2.mp4" autoPlay loop muted/>
        <center>
        <h1 style={{color: 'white'}}>               Learning Never Exhausts the Mind</h1>
        <p style={{color: 'white'}}>                Join Now!</p>
        </center>
        <div className="hero-btns">
            
        {/* <Button className='btns' buttonStyle= 'btn--primary'
            buttonSize='btn--large'>About the Tutors</Button> */}
        
        </div>
    </div>
    </>;


}
