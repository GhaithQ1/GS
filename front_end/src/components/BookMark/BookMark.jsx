import React, { useEffect, useState, useRef, use } from 'react';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faCheck, faTimes, faHeart, faComment, faBookmark, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";
import Menu from '../main_menu/Menu';
import Chat from '../chat/Chat';
import { format } from "date-fns";



const BookMark = () => {
  const audioRefs = useRef([]);
  const [poststs, setPosts] = useState([]);
  const [cookies] = useCookies(['token']);
  const inputRef = useRef();
  const [NewComment, SetNewComment] = useState([]);
  const [showCommentForPostId, setShowCommentForPostId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookMark, setbookMark] = useState(false);
  const [Mydata, SetMydata] = useState();
  const [bookId, SetbookId] = useState();
  const [solvedPost_3, SetsolvedPost_3] = useState();
  const [allAnswered, setAllAnswered] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const bottomRef = useRef(null);

  const playSound = (index) => audioRefs.current[index].play();

  const Commentary = async (id, e) => {
    e.preventDefault();
    const commentValue = inputRef.current.value;
    try {
      const res = await axios.post(`http://localhost:8000/api/v2/post/create_post_comments/${id}`, {
        comment: commentValue
      }, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
      inputRef.current.value = '';
      SetNewComment(res.data.data.comments);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v2/auth/get_date_my`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        setPosts(res.data.data.savedPosts);
        console.log(res.data.data.savedPosts)
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchPosts();
  }, [NewComment]);

  const handleCommentClick = (postId) => setShowCommentForPostId(showCommentForPostId === postId ? null : postId);
  const handleCloseComment = () => setShowCommentForPostId(null);

  const Likes = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/v2/post/toggle_post_like/${id}`, {}, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleLike = () => setLiked(!liked);
  const handleBook = () => setbookMark(!bookMark);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v2/auth/get_date_my', {
          headers: { Authorization: `Bearer ${cookies.token}` },
        });
        SetMydata(res.data.data._id);
        SetbookId(res.data.data.savedPosts);
        SetsolvedPost_3(res.data.data.solvedPost_3);
        console.log(res.data.data.solvedPost_3[0].postId)
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchMyData();
  }, []);

  const bookMarks = async (id) => {
    try {
      await axios.post(`http://localhost:8000/api/v2/auth/toggleSavedPost/${id}`, {}, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      });
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [NewComment]);

  const [answerTest, setanswerTest] = useState([]);

  let answers = []

  const chick_post_3 = async (IdPost, id, answer) => {
    try {

      answers = [...answers, {
        questionId: id,
        answer: answer
      }]

      // إرسال البيانات إلى API
      const res = await axios.post(
        `http://localhost:8000/api/v2/post/post_3_chick`,  // URL الخاص بالـ API
        {
          postId: IdPost,
          answers
        },
        {
          headers: { Authorization: `Bearer ${cookies.token}` },  // إضافة التوكن في الهيدر
        }
      );

      // استلام البيانات من الـ API
      console.log(res.data);

    } catch (error) {
      console.error('Error fetching data', error);  // في حال حدوث خطأ
    }
  };






  // ========================================

  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState({});
  const [activeIcon, setActiveIcon] = useState({});
  const [localAnswers, setLocalAnswers] = useState({});



  // ===========================================

  return (
    <div className="home">
      <div className="container">
        <Menu/>
    <div className='bosts'>


      {/* عرض البوستات حسب النوع */}
      {poststs.map((post, index) => {
    //     if (post.type === "post_1") {
    //       return (
    //         <div key={index} className="all_bost click_and_listen posts1">
    //           <div className="name_shoole">
    //             <img src='./image/test.jpg' alt="" />
    //             <div className="date_shoole">
    //               <p>{post.user.name}</p>
    //               <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>

    //             </div>
    //           </div>
    //           <h2>Click on the image and listen</h2>
    //           <div className="click_listen">

    //             <div
    //               className="click_img"
    //               onClick={() => playSound(index)}
    //               style={{ cursor: 'pointer' }}
    //             >

    //               <img src={`http://localhost:8000/posts/${post.box1.postImage_1}`} alt={`Image ${index}`} />
    //               <p>{post.box1.word_1}</p>
    //             </div>
    //             <div
    //               className="click_img"
    //               onClick={() => playSound(index)}
    //               style={{ cursor: 'pointer' }}
    //             >

    //               <img src={`http://localhost:8000/posts/${post.box2.postImage_2}`} alt={`Image ${index}`} />
    //               <p>{post.box2.word_2}</p>
    //             </div>
    //             <div
    //               className="click_img"
    //               onClick={() => playSound(index)}
    //               style={{ cursor: 'pointer' }}
    //             >

    //               <img src={`http://localhost:8000/posts/${post.box3.postImage_3}`} alt={`Image ${index}`} />
    //               <p>{post.box3.word_3}</p>
    //             </div>
    //             <div
    //               className="click_img"
    //               onClick={() => playSound(index)}
    //               style={{ cursor: 'pointer' }}
    //             >
    //               <img src={`http://localhost:8000/posts/${post.box4.postImage_4}`} alt={`Image ${index}`} />
    //               <p>{post.box4.word_4}</p>

    //             </div>
    //             <div
    //               className="click_img"
    //               onClick={() => playSound(index)}
    //               style={{ cursor: 'pointer' }}
    //             >
    //               <img src={`http://localhost:8000/posts/${post.box5.postImage_5}`} alt={`Image ${index}`} />
    //               <p>{post.box5.word_5}</p>

    //             </div>

    //           </div>
    //           <div className="comment_lenght">
    //             <p onClick={() => handleCommentClick(post._id)} className='onclick_comment'>Comments : <span>{post.comments.length}</span></p>
    //             <p>Like : <span>{post.likes.length}</span></p>
    //           </div>
    //           <div className="interaction">
    //             <div className="inter">
    //               <FontAwesomeIcon onClick={() => { Likes(post._id); handleLike(); }} icon={faHeart} className={`inter-icon ${liked ? 'active_hart' : ''}
    //               ${post.likes.includes(Mydata) ? 'active_hart' : ''}`} />
    //               <FontAwesomeIcon icon={faComment} className="inter-icon" onClick={() => handleCommentClick(post._id)} />
    //             </div>
    //             <FontAwesomeIcon
    //               onClick={() => { bookMarks(post._id); handleBook(); }}
    //               className={`inter-icon ${bookMark ? 'active_book' : ''} 
    // ${bookId && bookId.some(item => item.post?._id === post._id) ? 'active_book' : ''}`}
    //               icon={faBookmark}
    //             />

    //           </div>



    //           {showCommentForPostId === post._id && (
    //             <div className="blore">
    //               <div className="comments">
    //                 <div className="publisher">
    //                   <FontAwesomeIcon className="out_icon" onClick={handleCloseComment} icon={faTimes} />
    //                   <p>publication <span>{post.user.name}</span></p>
    //                 </div>
    //                 <div className="comment">
    //                   {post.comments.map((com, index) => (
    //                     <div key={index} className="com">
    //                       <img
    //                         src={com.user_comment.profilImage ? `http://localhost:8000/user/${com.user_comment.profilImage}` : '/image/pngegg.png'}
    //                         alt={`Image of ${com.user_comment.name}`}
    //                       />
    //                       <div className="name_user_comment">
    //                         <span>{com.user_comment.name}</span>
    //                         <p style={{ whiteSpace: "pre-line" }}>{com.comment}</p>
    //                       </div>
    //                     </div>
    //                   ))}

    //                 </div>
    //                 <form action="" onSubmit={(e) => Commentary(post._id, e)}>
    //                   <input type="text"
    //                     placeholder='Write a comment...'
    //                     ref={inputRef}
    //                   />
    //                   <button type="submit">Send</button>

    //                 </form>
    //               </div>
    //             </div>
    //           )}

    //         </div>
    //       );
    //     }
    //     else if (post.type === "post_2") {

    //       return (
    //         <div key={index} className="all_bost choose_the_correct_answer">
    //           <div className="name_shoole">
    //             <img
    //               src={post.profilImage ? `http://localhost:8000/user/${post.profilImage}` : '/image/pngegg.png'}
    //               alt={`Image of ${post.name}`}
    //             />
    //             <div className="date_shoole">
    //               <p>{post.user.name}</p>

    //               <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
    //             </div>
    //           </div>
    //           <div className="choose_answer">
    //             <h2>Choose the correct answer!!!</h2>
    //             <div className="qustion_choose">
    //               <h3>{post.question_1.question}</h3>
    //               <div className="answer">
    //                 <p>A- {post.question_1.Answer_1}</p>
    //                 <p>B- {post.question_1.Answer_2}</p>
    //                 <p>C- {post.question_1.Answer_3}</p>
    //                 <p>D- {post.question_1.Answer_4}</p>
    //               </div>
    //             </div>
    //             <div className="qustion_choose">
    //               <h3>{post.question_2.question}</h3>
    //               <div className="answer">
    //                 <p>A- {post.question_2.Answer_1}</p>
    //                 <p>B- {post.question_2.Answer_2}</p>
    //                 <p>C- {post.question_2.Answer_3}</p>
    //                 <p>D- {post.question_2.Answer_4}</p>
    //               </div>
    //             </div>
    //             <div className="qustion_choose">
    //               <h3>{post.question_3.question}</h3>
    //               <div className="answer">
    //                 <p>A- {post.question_3.Answer_1}</p>
    //                 <p>B- {post.question_3.Answer_2}</p>
    //                 <p>C- {post.question_3.Answer_3}</p>
    //                 <p>D- {post.question_3.Answer_4}</p>
    //               </div>
    //             </div>
    //             <div className="qustion_choose">
    //               <h3>{post.question_4.question}</h3>
    //               <div className="answer">
    //                 <p>A- {post.question_4.Answer_1}</p>
    //                 <p>B- {post.question_4.Answer_2}</p>
    //                 <p>C- {post.question_4.Answer_3}</p>
    //                 <p>D- {post.question_4.Answer_4}</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="comment_lenght">
    //             <p>Comments : <span>{post.comments.length}</span></p>
    //             <p>Like : <span>{post.likes.length}</span></p>
    //           </div>
    //           <div className="interaction">
    //             <div className="inter">
    //               <FontAwesomeIcon onClick={() => { Likes(post._id); handleLike(); }} icon={faHeart} className={`inter-icon ${liked ? 'active_hart' : ''}
    //               ${post.likes.includes(Mydata) ? 'active_hart' : ''}`} />
    //               <FontAwesomeIcon icon={faComment} className="inter-icon" onClick={() => handleCommentClick(post._id)} />
    //             </div>
    //             <FontAwesomeIcon
    //               onClick={() => { bookMarks(post._id); handleBook(); }}
    //               className={`inter-icon ${bookMark ? 'active_book' : ''} 
    // ${bookId && bookId.some(item => item.post?._id === post._id) ? 'active_book' : ''}`}
    //               icon={faBookmark}
    //             />
    //           </div>
    //           {showCommentForPostId === post._id && (
    //             <div className="blore">
    //               <div className="comments">
    //                 <div className="publisher">
    //                   <FontAwesomeIcon className="out_icon" onClick={handleCloseComment} icon={faTimes} />
    //                   <p>publication <span>{post.user.name}</span></p>
    //                 </div>
    //                 <div className="comment">
    //                   {post.comments.map((com, index) => (
    //                     <div key={index} className="com">
    //                       <img
    //                         src={com.user_comment.profilImage ? `http://localhost:8000/user/${com.user_comment.profilImage}` : '/image/pngegg.png'}
    //                         alt={`Image of ${com.user_comment.name}`}
    //                       />
    //                       <div className="name_user_comment">
    //                         <span>{com.user_comment.name}</span>
    //                         <p style={{ whiteSpace: "pre-line" }}>{com.comment}</p>
    //                       </div>
    //                     </div>
    //                   ))}

    //                 </div>
    //                 <form action="" onSubmit={(e) => Commentary(post._id, e)}>
    //                   <input type="text"
    //                     placeholder='Write a comment...'
    //                     ref={inputRef}
    //                   />
    //                   <button type="submit">Send</button>

    //                 </form>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       );
    //     }
         if (post.type === "post_3") {
          return (
            <div key={index} className="all_bost bost_true_or-false posts3">
              <div className="name_shoole">
                <img src={post.userImage || './image/test.jpg'} alt="" />
                <div className="date_shoole">
                  <p>{post.user.name}</p>
                  <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
                </div>
              </div>
              <h2>Choose the correct answer!!!</h2>
              {(() => {
                if (!post || !post.questions) return null;

                // لتخزين الأيقونات النشطة لكل سؤال
                const questionsPerPage = 5;
                const startIndex = (pages[post._id] || 0) * questionsPerPage;
                const endIndex = startIndex + questionsPerPage;
                const visibleQuestions = post.questions.slice(startIndex, endIndex);

                const currentPage = pages[post._id] || 0;

                const handlePrev = () => {
                  const currentPage = pages[post._id] || 0;
                  if (currentPage > 0) {
                    setPages(prev => ({
                      ...prev,
                      [post._id]: currentPage - 1
                    }));
                  }
                };

                const handleNext = () => {
                  const current = pages[post._id] || 0;
                  const totalQuestions = post.questions.length;

                  if ((current + 1) * questionsPerPage < totalQuestions) {
                    setPages(prev => ({
                      ...prev,
                      [post._id]: current + 1
                    }));
                  }
                };

                const toggleActiveIcon = (questionId, iconType) => {
                  setActiveIcon(prev => ({
                    ...prev,
                    [questionId]: iconType
                  }));

                };
                const handleAnswer = (questionId, answer) => {
                  // تخزين الإجابة مؤقتاً
                  setLocalAnswers(prev => ({
                    ...prev,
                    [questionId]: answer,
                  }));

                  // إرسال الإجابة للسيرفر
                  chick_post_3(post._id, questionId, answer ? "true" : "false");
                };

                return (
                  <>
                    {visibleQuestions.map((item, index) => {
                      const solved = solvedPost_3?.find(p => p.postId === post._id);
                      const question = solved?.result.find(q => q.questionId === item._id);

                      const local = localAnswers[item._id];
                      const isCorrect = local !== undefined
                        ? local === true
                        : question?.isCorrect;

                      const answerClass = isCorrect !== undefined
                        ? `que_tr_or_fa ${isCorrect ? "active_true" : "active_false"}`
                        : "que_tr_or_fa";

                        const iconClass = isCorrect !== undefined
                        ? `icon_true_or_false ${isCorrect ? "iconnone" : "iconnone"}`
                        : "icon_true_or_false";

                      return (
                        <div className='true_or_false' key={item._id}>
                          <div className={answerClass}>
                            <p>{item.question}</p>
                            <div className={iconClass} >
                              <FontAwesomeIcon
                                icon={faTimes}
                                className={`error-icon ${local === false ? 'active_false' : ''}`}
                                onClick={() => {
                                  toggleActiveIcon(item._id, 'error');
                                  handleAnswer(item._id, false);
                                }}
                              />
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={`check-icon ${local === true ? 'active_true' : ''}`}
                                onClick={() => {
                                  toggleActiveIcon(item._id, 'check');
                                  handleAnswer(item._id, true);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="pagination-controls">
                      <button onClick={handlePrev} disabled={currentPage === 0}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </button>
                      <span>{currentPage + 1}/{Math.ceil(post.questions.length / questionsPerPage)}</span>
                      <button
                        onClick={handleNext}
                        disabled={(currentPage + 1) * questionsPerPage >= post.questions.length}
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                  </>

                );
              })()}



              <div className="comment_lenght">
                <p>Comments : <span>{post.comments.length}</span></p>
                <p>Like : <span>{post.likes.length}</span></p>
              </div>
              <div className="interaction">
                <div className="inter">
                  <FontAwesomeIcon onClick={() => { Likes(post._id); handleLike(); }} icon={faHeart} className={`inter-icon ${liked ? 'active_hart' : ''}
                  ${post.likes.includes(Mydata) ? 'active_hart' : ''}`} />
                  <FontAwesomeIcon icon={faComment} className="inter-icon" onClick={() => handleCommentClick(post._id)} />
                </div>
                <FontAwesomeIcon
                  onClick={() => { bookMarks(post._id); handleBook(); }}
                  className={`inter-icon ${bookMark ? 'active_book' : ''} 
    ${bookId && bookId.some(item => item.post?._id === post._id) ? 'active_book' : ''}`}
                  icon={faBookmark}
                />
              </div>
              {showCommentForPostId === post._id && (
                <div className="blore">
                  <div className="comments">
                    <div className="publisher">
                      <FontAwesomeIcon className="out_icon" onClick={handleCloseComment} icon={faTimes} />
                      <p>publication <span>{post.user.name}</span></p>
                    </div>
                    <div className="comment">
                      {post.comments.map((com, index) => (
                        <div key={index} className="com">
                          <img
                            src={com.user_comment.profilImage ? `http://localhost:8000/user/${com.user_comment.profilImage}` : '/image/pngegg.png'}
                            alt={`Image of ${com.user_comment.name}`}
                          />
                          <div className="name_user_comment">
                            <span>{com.user_comment.name}</span>
                            <p style={{ whiteSpace: "pre-line" }}>{com.comment}</p>
                          </div>
                        </div>
                      ))}

                    </div>
                    <form action="" onSubmit={(e) => Commentary(post._id, e)}>
                      <input type="text"
                        placeholder='Write a comment...'
                        ref={inputRef}
                      />
                      <button type="submit">Send</button>

                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        }
    //     else if (post.type === "post_4") {
    //       return (
    //         <div key={index} className="all_bost image_and_answer posts4">
    //           <div className="name_shoole">
    //             <img src={post.userImage || './image/test.jpg'} alt="" />
    //             <div className="date_shoole">
    //               <p>{post.user.name}</p>
    //               <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
    //             </div>
    //           </div>
    //           <div className="image_answer">
    //             <h2>What's in the picture?</h2>
    //             <div className="img_ans">
    //               <img src={`http://localhost:8000/posts/${post.question_1_img}`} alt="" />
    //               <div className="anwser">
    //                 <p>{post.question_1_word_1}</p>
    //                 <p>{post.question_1_word_2}</p>
    //                 <p>{post.question_1_word_3}</p>
    //                 <p>{post.question_1_word_4}</p>
    //               </div>
    //             </div>
    //             <div className="img_ans">
    //               <img src={`http://localhost:8000/posts/${post.question_2_img}`} alt="" />
    //               <div className="anwser">
    //                 <p>{post.question_2_word_1}</p>
    //                 <p>{post.question_2_word_2}</p>
    //                 <p>{post.question_2_word_3}</p>
    //                 <p>{post.question_2_word_4}</p>
    //               </div>
    //             </div>
    //             <div className="img_ans">
    //               <img src={`http://localhost:8000/posts/${post.question_3_img}`} alt="" />
    //               <div className="anwser">
    //                 <p>{post.question_3_word_1}</p>
    //                 <p>{post.question_3_word_2}</p>
    //                 <p>{post.question_3_word_3}</p>
    //                 <p>{post.question_3_word_4}</p>
    //               </div>
    //             </div>
    //             <div className="img_ans">
    //               <img src={`http://localhost:8000/posts/${post.question_4_img}`} alt="" />
    //               <div className="anwser">
    //                 <p>{post.question_4_word_1}</p>
    //                 <p>{post.question_4_word_2}</p>
    //                 <p>{post.question_4_word_3}</p>
    //                 <p>{post.question_4_word_4}</p>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="comment_lenght">
    //             <p>Comments : <span>{post.comments.length}</span></p>
    //             <p>Like : <span>{post.likes.length}</span></p>
    //           </div>
    //           <div className="interaction">
    //             <div className="inter">
    //               <FontAwesomeIcon onClick={() => { Likes(post._id); handleLike(); }} icon={faHeart} className={`inter-icon ${liked ? 'active_hart' : ''}
    //               ${post.likes.includes(Mydata) ? 'active_hart' : ''}`} />
    //               <FontAwesomeIcon icon={faComment} className="inter-icon" onClick={() => handleCommentClick(post._id)} />
    //             </div>
    //             <FontAwesomeIcon
    //               onClick={() => { bookMarks(post._id); handleBook(); }}
    //               className={`inter-icon ${bookMark ? 'active_book' : ''} 
    // ${bookId && bookId.some(item => item.post?._id === post._id) ? 'active_book' : ''}`}
    //               icon={faBookmark}
    //             />
    //           </div>
    //           {showCommentForPostId === post._id && (
    //             <div className="blore">
    //               <div className="comments">
    //                 <div className="publisher">
    //                   <FontAwesomeIcon className="out_icon" onClick={handleCloseComment} icon={faTimes} />
    //                   <p>publication <span>{post.user.name}</span></p>
    //                 </div>
    //                 <div className="comment">
    //                   {post.comments.map((com, index) => (
    //                     <div key={index} className="com">
    //                       <img
    //                         src={com.user_comment.profilImage ? `http://localhost:8000/user/${com.user_comment.profilImage}` : '/image/pngegg.png'}
    //                         alt={`Image of ${com.user_comment.name}`}
    //                       />
    //                       <div className="name_user_comment">
    //                         <span>{com.user_comment.name}</span>
    //                         <p style={{ whiteSpace: "pre-line" }}>{com.comment}</p>
    //                       </div>
    //                     </div>
    //                   ))}

    //                 </div>
    //                 <form action="" onSubmit={(e) => Commentary(post._id, e)}>
    //                   <input type="text"
    //                     placeholder='Write a comment...'
    //                     ref={inputRef}
    //                   />
    //                   <button type="submit">Send</button>

    //                 </form>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       );
    //     }
    //     else if (post.type === "post_5") {
    //       return (
    //         <div key={index} className="all_bost video_img_word posts4">
    //           <div className="name_shoole">
    //             <img src={post.userImage || './image/test.jpg'} alt="" />
    //             <div className="date_shoole">
    //               <p>{post.user.name}</p>
    //               <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
    //             </div>
    //           </div>
    //           <div className="image_video_word">

    //             <p style={{ whiteSpace: "pre-line" }}>{post.writing ? post.writing : null}</p>
    //             <img src={post.img_post ? `http://localhost:8000/posts/${post.img_post}` : null} alt="" />
    //             {post.video_post ? <video
    //               src={`http://localhost:8000/posts/${post.video_post}`}
    //               controls
    //             ></video> : null}


    //             <div className="comment_lenght">
    //               <p>Comments : <span>{post.comments.length}</span></p>
    //               <p>Like : <span>{post.likes.length}</span></p>
    //             </div>
    //           </div>
    //           <div className="interaction">
    //             <div className="inter">
    //               <FontAwesomeIcon onClick={() => { Likes(post._id); handleLike(); }} icon={faHeart} className={`inter-icon ${liked ? 'active_hart' : ''}
    //               ${post.likes.includes(Mydata) ? 'active_hart' : ''}`} />
    //               <FontAwesomeIcon icon={faComment} className="inter-icon" onClick={() => handleCommentClick(post._id)} />
    //             </div>
    //             <FontAwesomeIcon
    //               onClick={() => { bookMarks(post._id); handleBook(); }}
    //               className={`inter-icon ${bookMark ? 'active_book' : ''} 
    // ${bookId && bookId.some(item => item.post?._id === post._id) ? 'active_book' : ''}`}
    //               icon={faBookmark}
    //             />
    //           </div>
    //           {showCommentForPostId === post._id && (
    //             <div className="blore">
    //               <div className="comments">
    //                 <div className="publisher">
    //                   <FontAwesomeIcon className="out_icon" onClick={handleCloseComment} icon={faTimes} />
    //                   <p>publication <span>{post.user.name}</span></p>
    //                 </div>
    //                 <div className="comment" ref={bottomRef}>
    //                   {post.comments.map((com, index) => (
    //                     <div key={index} className="com">
    //                       <img
    //                         src={com.user_comment ? com.user_comment.profilImage ? `http://localhost:8000/user/${com.user_comment.profilImage}` : '/image/pngegg.png' : '/image/pngegg.png'}
    //                         alt={`Image of ${com.user_comment.name}`}
    //                       />
    //                       <div className="name_user_comment">
    //                         <span>{com.user_comment.name}</span>
    //                         <span style={{ whiteSpace: "pre-line" }}>{com.comment}</span>
    //                       </div>
    //                     </div>
    //                   ))}

    //                 </div>
    //                 <form action="" onSubmit={(e) => Commentary(post._id, e)}>
    //                   <input type="text"
    //                     placeholder='Write a comment...'
    //                     ref={inputRef}
    //                   />
    //                   <button type="submit">Send</button>

    //                 </form>
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       );
    //     }
        else {
          return null;
        }
      })}
    </div>
    <Chat/>
    </div>
    </div>
  );
};

export default BookMark;
