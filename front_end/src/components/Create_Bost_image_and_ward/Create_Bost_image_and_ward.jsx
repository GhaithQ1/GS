import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useCookies } from 'react-cookie';
import "./Create_Bost_image_and_ward.css";
import Menu from '../main_menu/Menu';
import Chat from '../chat/Chat';

const Create_Bost_image_and_ward = () => {
  
const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [words, setWords] = useState(["", "", "", "", ""]);
    const [formErrors, setFormErrors] = useState({});


    const handleSubmit = (event) => {
      event.preventDefault();
      const formData =new FormData();
      formData.append('postImage_1',imageFiles[0])
      formData.append('postImage_2',imageFiles[1])
      formData.append('postImage_3',imageFiles[2])
      formData.append('postImage_4',imageFiles[3])
      formData.append('postImage_5',imageFiles[4])
      formData.append('word_1',words[0])
      formData.append('word_2',words[1])
      formData.append('word_3',words[2])
      formData.append('word_4',words[3])
      formData.append('word_5',words[4])

      axios.post('http://localhost:8000/api/v2/post/post_1',
        formData,
        {headers:{
          Authorization: `Bearer ${cookies.token}`,
        }}

      ).then((res)=>{
        navigate('/')
        console.log(res)
      }).catch((err)=>{
        // console.log(err)
        if (err.response?.data?.errors) {
          // تحويل مصفوفة الأخطاء إلى كائن
          console.log(err.response.data.errors)
          const formattedErrors = {};
          err.response.data.errors.forEach(error => {
            formattedErrors[error.path] = error.msg;
            setFormErrors(formattedErrors)
          });
        }
        
      })



    }

    const handleImageChange = (e, index) => {
      const file = e.target.files[0];
      if (file) {
        // للعرض
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);
    
        // للتخزين
        const newImageFiles = [...imageFiles];
        newImageFiles[index] = file;
        setImageFiles(newImageFiles);
      }
    };
    

  const handleWordChange = (e, index) => {
    const newWords = [...words];
    newWords[index] = e.target.value;
    setWords(newWords);
  };
  

  return (
<div className="home">
  <div className="container">
    <Menu />
    <div className="bost_image_and_ward">
      <h2>Create Bost Image And Word</h2>
      <form className="unified_form">
        
        <div className="form">
          <label className="image-box">
            {images[0] ? (
              <img src={images[0]} alt="preview" className="preview-image" />
            ) : formErrors[`postImage_1`] ? (
              <p className="image_error">{formErrors[`postImage_1`]}</p>
            ) : (
              <span className="plus-sign">+</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 0)} />
          </label>
          <div className="word_error">
            {formErrors[`word_1`] && <p className="_error">{formErrors[`word_1`]}</p>}
            <input className="input_ward" type="text" value={words[0]} onChange={(e) => handleWordChange(e, 0)} placeholder="Enter word..." />
          </div>
        </div>

        <div className="form">
          <label className="image-box">
            {images[1] ? (
              <img src={images[1]} alt="preview" className="preview-image" />
            ) : formErrors[`postImage_2`] ? (
              <p className="image_error">{formErrors[`postImage_2`]}</p>
            ) : (
              <span className="plus-sign">+</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 1)} />
          </label>
          <div className="word_error">
            {formErrors[`word_2`] && <p className="_error">{formErrors[`word_2`]}</p>}
            <input className="input_ward" type="text" value={words[1]} onChange={(e) => handleWordChange(e, 1)} placeholder="Enter word..." />
          </div>
        </div>

        <div className="form">
          <label className="image-box">
            {images[2] ? (
              <img src={images[2]} alt="preview" className="preview-image" />
            ) : formErrors[`postImage_3`] ? (
              <p className="image_error">{formErrors[`postImage_3`]}</p>
            ) : (
              <span className="plus-sign">+</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 2)} />
          </label>
          <div className="word_error">
            {formErrors[`word_3`] && <p className="_error">{formErrors[`word_3`]}</p>}
            <input className="input_ward" type="text" value={words[2]} onChange={(e) => handleWordChange(e, 2)} placeholder="Enter word..." />
          </div>
        </div>

        <div className="form">
          <label className="image-box">
            {images[3] ? (
              <img src={images[3]} alt="preview" className="preview-image" />
            ) : formErrors[`postImage_4`] ? (
              <p className="image_error">{formErrors[`postImage_4`]}</p>
            ) : (
              <span className="plus-sign">+</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 3)} />
          </label>
          <div className="word_error">
            {formErrors[`word_4`] && <p className="_error">{formErrors[`word_4`]}</p>}
            <input className="input_ward" type="text" value={words[3]} onChange={(e) => handleWordChange(e, 3)} placeholder="Enter word..." />
          </div>
        </div>

        <div className="form">
          <label className="image-box">
            {images[4] ? (
              <img src={images[4]} alt="preview" className="preview-image" />
            ) : formErrors[`postImage_5`] ? (
              <p className="image_error">{formErrors[`postImage_5`]}</p>
            ) : (
              <span className="plus-sign">+</span>
            )}
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 4)} />
          </label>
          <div className="word_error">
            {formErrors[`word_5`] && <p className="_error">{formErrors[`word_5`]}</p>}
            <input className="input_ward" type="text" value={words[4]} onChange={(e) => handleWordChange(e, 4)} placeholder="Enter word..." />
          </div>
        </div>

      </form>
      <button type="submit" className="submit_btn" onClick={handleSubmit}>Submit</button>
    </div>
    <Chat />
  </div>
</div>

  );
};

export default Create_Bost_image_and_ward;
