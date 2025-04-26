import { useState, useRef } from 'react';
import "./Create_Bost_Video_End_Image.css";
import Menu from '../main_menu/Menu';
import Chat from '../chat/Chat';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const Create_Bost_Video_and_image = () => {
const [formErrors, setFormErrors] = useState({});
  const Navigate = useNavigate();
  const [cookies] = useCookies(["token"]);



  const [qus1, Setrqs1] = useState('')


  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setImagePreview(imgURL);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  
  const removeImage = () => {
    setImagePreview(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = ''; // يفرغ الملف
    }
  };
  
  const removeVideo = () => {
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = ''; // يفرغ الملف
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    if (qus1) {
      formData.append('writing', qus1);
    }
  
    // إذا في صورة، أضفها
    if (imageInputRef.current && imageInputRef.current.files.length > 0) {
      formData.append('img_post', imageInputRef.current.files[0]);
    }
  
    // إذا في فيديو، أضفه
    if (videoInputRef.current && videoInputRef.current.files.length > 0) {
      formData.append('video_post', videoInputRef.current.files[0]);
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/v2/post/post', formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        }
      });
  
      console.log('تم الإرسال:', response.data);
      // تفضي الفورم إذا بدك
      setImagePreview(null);
      setVideoPreview(null);
      Setrqs1("");
      imageInputRef.current.value = '';
      videoInputRef.current.value = '';

      Navigate("/")
  
    } catch (err) {
      if (err.response?.data?.errors) {
        // تحويل مصفوفة الأخطاء إلى كائن
        const formattedErrors = {};
        err.response.data.errors.forEach(error => {
          formattedErrors[error.path] = error;
          console.log(formattedErrors)
        });
        setFormErrors(formattedErrors);
      }
    }
  };
  


  return (
    <div className="home">
      <div className="container">
        <Menu />
        <div className="Create_Bost_Video_and_image">
      <h2>Create Bost True Or False</h2>
      <div className="all_form">
      {formErrors[''] && <p className="_error">{formErrors[''].msg}</p>}
        <div className='form'>
          <div className="qes_error">
            {formErrors[`question_1.question`] && (
              <p className="_error">{formErrors[`question_1.question`]}</p>
            )}

            <textarea
              type="text"
              placeholder='Put the first question.'
              value={qus1}
              onChange={(e) => Setrqs1(e.target.value)}
            ></textarea>

            {/* أيقونات */}
            <div className="iconvideandimg">
              <FontAwesomeIcon
                className='icon_v_m'
                icon={faImage}
                onClick={() => imageInputRef.current.click()}
                style={{ cursor: 'pointer', marginRight: '15px' }}
              />
              <FontAwesomeIcon
                className='icon_v_m'
                icon={faVideo}
                onClick={() => videoInputRef.current.click()}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* input مخفي للصورة */}
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />

            {/* input مخفي للفيديو */}
            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              onChange={handleVideoChange}
              style={{ display: 'none' }}
            />


          </div>
          <div className="img_vid_flex">
            {imagePreview && (
              <div style={{ position: 'relative', marginTop: '10px', width: '50%' }}>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <button
                  onClick={removeImage}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* عرض الفيديو + زر حذف */}
            {videoPreview && (
              <div style={{ position: 'relative', marginTop: '10px', width: '50%' }}>
                <video
                  src={videoPreview}
                  controls
                  style={{ width: '100%', borderRadius: '8px' }}
                ></video>
                <button
                  onClick={removeVideo}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            )}
            </div>
        </div>
      </div>

      <button type="submit" className="submit_btn" onClick={handleSubmit}>Submit</button>
    </div>      
      <Chat />
      </div>
    </div>
  );
};

export default Create_Bost_Video_and_image;

