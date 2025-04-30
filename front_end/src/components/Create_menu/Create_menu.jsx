import React, { useState } from 'react'
import './Create_menu.css'
import { NavLink } from 'react-router-dom';

const Create_menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  return (
    <>
      <div className="create_menu">
        <div className="img_create">
        <img src="./image/pngegg.png" alt="" />
        <p>Choose one of the posts to create it.</p>
        </div>
        <button onClick={toggleMenu}>Create Post</button>

        <div className={`menus ${showMenu ? 'show' : ''}`}>
        <NavLink to="/Create_Bost_Video_and_image" className='links'>
            <p>Video And Image And Word</p>
          </NavLink>
          
          <NavLink to="/create_bost_choose_the_correct_answer" className='links'>
            <p>Choose The Correct Answer</p>
          </NavLink>
          <NavLink to="/create_bost_image_and_answer" className='links'>
            <p>Image And Answer</p>
          </NavLink>
          <NavLink to="/create_bost_image_and_ward" className='links'>
            <p>Image And Ward</p>
          </NavLink>
          <NavLink to="/create_bost_true_or_false" className='links'>
            <p>True Or False</p>
          </NavLink>
          <NavLink to="/Create_Bost_Ifrem" className='links'>
            <p>Create Bost Ifrem</p>
          </NavLink>

        </div>
      </div>
    </>
  )
}

export default Create_menu;
