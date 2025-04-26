import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ImageSlider.css'
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context';
const ImageSlider = () => {
  const [cookies , setCookies ] = useCookies(["token"]);
  const Navigate = useNavigate();
  const  {setGatUserById} = useUser();

  const [AllImageShoole, SetAllImageShoole] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/v2/user`, {
       headers: {
           Authorization: `Bearer ${cookies.token}`,
       },
   })
       .then(res => {
        SetAllImageShoole(res.data.data);
          
       })
       .catch(error => {
           console.error('Error fetching data', error);
       });
}, []);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        swipeToSlide: true,
      };
    
      const images = [
        "./image/test.jpg",
        "./image/test.jpg",
        "./image/test.jpg",
        "./image/test.jpg"
      ];
  return (
    <>
        {/* ImageSlider */}
          <div className="shoole">
        <Slider {...settings}>
          {AllImageShoole.map((src, index) => (
            <div className="img_shoole" key={index}>
          <img onClick={() => {Navigate(`/Get_Shoole_By/${src._id}`)}}
                  src={src.profilImage ? `http://localhost:8000/user/${src.profilImage}` : '/image/test.jpg'}
                  alt={`Image of ${src.name}`}
                />
            </div>
          ))}
        </Slider>
      </div>
      {/* ImageSlider */}
    </>
  )
}

export default ImageSlider