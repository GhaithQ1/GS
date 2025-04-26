import React from 'react'
import "./Home.css";
import Menu from '../main_menu/Menu';
import Bosts from '../bosts/Bosts';
import Chat from '../chat/Chat';
import ImageSlider from '../ImageSlider/ImageSlider';
import Create_menu from '../Create_menu/Create_menu';
const Home = () => {
  return (
    <>
    <div className='home'>
      <div className='container'>
        <Menu/>
        <div className="rew">
        <ImageSlider/>
        <Create_menu/>
        <Bosts/>
        </div>
        
        <Chat/>
      </div>
    </div>
    </>
  )
}

export default Home