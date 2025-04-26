import React, { useState } from 'react';
import "./Create_Bost_image_and_answer.css";
import Menu from '../main_menu/Menu';
import Chat from '../chat/Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { useCookies } from 'react-cookie';

const Create_Bost_image_and_answer = () => {


  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
    const [images, setImages] = useState([]);
    const [img_qes1, setimg_qes1] = useState([]);
    const [answer1_qes1, setanswer1_qes1] = useState('');
    const [answer2_qes1, setanswer2_qes1] = useState('');
    const [answer3_qes1, setanswer3_qes1] = useState('');
    const [answer4_qes1, setanswer4_qes1] = useState('');

    const [img_qes2, setimg_qes2] = useState([]);
    const [answer1_qes2, setanswer1_qes2] = useState('');
    const [answer2_qes2, setanswer2_qes2] = useState('');
    const [answer3_qes2, setanswer3_qes2] = useState('');
    const [answer4_qes2, setanswer4_qes2] = useState('');

    const [img_qes3, setimg_qes3] = useState([]);
    const [answer1_qes3, setanswer1_qes3] = useState('');
    const [answer2_qes3, setanswer2_qes3] = useState('');
    const [answer3_qes3, setanswer3_qes3] = useState('');
    const [answer4_qes3, setanswer4_qes3] = useState('');

    const [img_qes4, setimg_qes4] = useState([]);
    const [answer1_qes4, setanswer1_qes4] = useState('');
    const [answer2_qes4, setanswer2_qes4] = useState('');
    const [answer3_qes4, setanswer3_qes4] = useState('');
    const [answer4_qes4, setanswer4_qes4] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData =new FormData();
      formData.append('question_1_img' ,img_qes1)
      formData.append('question_1_word_1' ,answer1_qes1)
      formData.append('question_1_word_2' ,answer2_qes1)
      formData.append('question_1_word_3' ,answer3_qes1)
      formData.append('question_1_word_4' ,answer4_qes1)

      formData.append('question_2_img' ,img_qes2)
      formData.append('question_2_word_1' ,answer1_qes2)
      formData.append('question_2_word_2' ,answer2_qes2)
      formData.append('question_2_word_3' ,answer3_qes2)
      formData.append('question_2_word_4' ,answer4_qes2)

      formData.append('question_3_img' ,img_qes3)
      formData.append('question_3_word_1' ,answer1_qes3)
      formData.append('question_3_word_2' ,answer2_qes3)
      formData.append('question_3_word_3' ,answer3_qes3)
      formData.append('question_3_word_4' ,answer4_qes3)

      formData.append('question_4_img' ,img_qes4)
      formData.append('question_4_word_1' ,answer1_qes4)
      formData.append('question_4_word_2' ,answer2_qes4)
      formData.append('question_4_word_3' ,answer3_qes4)
      formData.append('question_4_word_4' ,answer4_qes4)


      axios.post('http://localhost:8000/api/v2/post/post_4',formData,{
        headers:{
          Authorization: `Bearer ${cookies.token}`,
        }
      }).then((res)=>{
        navigate('/')
      }).catch((err)=>{
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
        // تحديث عرض الصورة في الواجهة (اختياري)
        const newImages = [...images];
        newImages[index] = URL.createObjectURL(file);
        setImages(newImages);
    
        // تخزين الملف الفعلي حسب السؤال
        switch (index) {
          case 0:
            setimg_qes1(file);
            break;
          case 1:
            setimg_qes2(file);
            break;
          case 2:
            setimg_qes3(file);
            break;
          case 3:
            setimg_qes4(file);
            break;
          default:
            break;
        }
      }
    };
    



  return (
    <div className="home">
      <div className="container">
        <Menu />
        <div className="Create_Bost_image_and_answer">
          <h2>Create Bost Image And Word</h2>
          <form className="unified_form">

{/* Question 1 */}
<div className="form">
  <label className="image-box">
    {images[0] ? (
      <img src={images[0]} alt="preview" className="preview-image" />
    ) : formErrors[`question_1_img`] ? (
      <p className="image_error">{formErrors[`question_1_img`]}</p>
    ) : (
      <span className="plus-sign">+</span>
    )}
    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 0)} />
  </label>
  <div className="all_input_answer">
    <div className="word_error">
      {formErrors[`question_1_word_1`] && <p className="_error">{formErrors[`question_1_word_1`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer1_qes1} onChange={(e) => setanswer1_qes1(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_1_word_2`] && <p className="_error">{formErrors[`question_1_word_2`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer2_qes1} onChange={(e) => setanswer2_qes1(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_1_word_3`] && <p className="_error">{formErrors[`question_1_word_3`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer3_qes1} onChange={(e) => setanswer3_qes1(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_1_word_4`] && <p className="_error">{formErrors[`question_1_word_4`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer4_qes1} onChange={(e) => setanswer4_qes1(e.target.value)} />
    </div>
  </div>
</div>

{/* Question 2 */}
<div className="form">
  <label className="image-box">
    {images[1] ? (
      <img src={images[1]} alt="preview" className="preview-image" />
    ) : formErrors[`question_2_img`] ? (
      <p className="image_error">{formErrors[`question_2_img`]}</p>
    ) : (
      <span className="plus-sign">+</span>
    )}
    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 1)} />
  </label>
  <div className="all_input_answer">
    <div className="word_error">
      {formErrors[`question_2_word_1`] && <p className="_error">{formErrors[`question_2_word_1`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer1_qes2} onChange={(e) => setanswer1_qes2(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_2_word_2`] && <p className="_error">{formErrors[`question_2_word_2`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer2_qes2} onChange={(e) => setanswer2_qes2(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_2_word_3`] && <p className="_error">{formErrors[`question_2_word_3`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer3_qes2} onChange={(e) => setanswer3_qes2(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_2_word_4`] && <p className="_error">{formErrors[`question_2_word_4`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer4_qes2} onChange={(e) => setanswer4_qes2(e.target.value)} />
    </div>
  </div>
</div>

{/* Question 3 */}

<div className="form">
  <label className="image-box">
    {images[2] ? (
      <img src={images[2]} alt="preview" className="preview-image" />
    ) : formErrors[`question_3_img`] ? (
      <p className="image_error">{formErrors[`question_3_img`]}</p>
    ) : (
      <span className="plus-sign">+</span>
    )}
    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 2)} />
  </label>
  <div className="all_input_answer">
    <div className="word_error">
      {formErrors[`question_3_word_1`] && <p className="_error">{formErrors[`question_3_word_1`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer1_qes3} onChange={(e) => setanswer1_qes3(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_3_word_2`] && <p className="_error">{formErrors[`question_3_word_2`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer2_qes3} onChange={(e) => setanswer2_qes3(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_3_word_3`] && <p className="_error">{formErrors[`question_3_word_3`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer3_qes3} onChange={(e) => setanswer3_qes3(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_3_word_4`] && <p className="_error">{formErrors[`question_3_word_4`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer4_qes3} onChange={(e) => setanswer4_qes3(e.target.value)} />
    </div>
  </div>
</div>

{/* Question 4 */}
<div className="form">
  <label className="image-box">
    {images[3] ? (
      <img src={images[3]} alt="preview" className="preview-image" />
    ) : formErrors[`question_4_img`] ? (
      <p className="image_error">{formErrors[`question_4_img`]}</p>
    ) : (
      <span className="plus-sign">+</span>
    )}
    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e, 3)} />
  </label>
  <div className="all_input_answer">
    <div className="word_error">
      {formErrors[`question_4_word_1`] && <p className="_error">{formErrors[`question_4_word_1`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer1_qes4} onChange={(e) => setanswer1_qes4(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_4_word_2`] && <p className="_error">{formErrors[`question_4_word_2`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer2_qes4} onChange={(e) => setanswer2_qes4(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_4_word_3`] && <p className="_error">{formErrors[`question_4_word_3`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer3_qes4} onChange={(e) => setanswer3_qes4(e.target.value)} />
    </div>
    <div className="word_error">
      {formErrors[`question_4_word_4`] && <p className="_error">{formErrors[`question_4_word_4`]}</p>}
      <input className="input_ward" type="text" placeholder="Enter word..." value={answer4_qes4} onChange={(e) => setanswer4_qes4(e.target.value)} />
    </div>
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

export default Create_Bost_image_and_answer;
