
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faHeart, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";
import './Profile.css'
import Menu from '../main_menu/Menu'
import Chat from '../chat/Chat'
import Create_menu from '../Create_menu/Create_menu';
import { format } from "date-fns";
const Profile = () => {

    const [posts, setPosts] = useState([]);
    const [MyData, setMyData] = useState([]);
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v2/auth/get_date_my`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
        })
            .then(res => {
                setMyData(res.data.data);

            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, []);



    const user1Id = MyData?._id;

    useEffect(() => {
        if (!user1Id) return; // لا تعمل شي إذا ما وصل الاي دي
        axios.get(`http://localhost:8000/api/v2/post/getUserPosts/${user1Id}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
        })
            .then(res => {
                setPosts(res.data.data);
                // console.log(res.data.data);

            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, [user1Id]);
    return (
        <>
            <div className="home">
                <div className="container">
                    <Menu />
                    <div className="main_profile_post">
                        <div className="profile">
                            <div className="back_img">
                                <img src="./image/back1.jpg" alt="" />
                            </div>
                            <div className="profile_all">
                                <img
                                    src={MyData.profilImage ? `http://localhost:8000/user/${MyData.profilImage}` : '/image/pngegg.png'}
                                    alt={`Image of ${MyData.name}`}
                                />
                                <div className="info_me">
                                    <h2>{MyData.name}</h2>
                                    <span>{MyData.email}</span>
                                </div>

                                <button>Update</button>
                            </div>
                        </div>
                        <Create_menu />
                        <div className='bosts'>
                            {posts.length === 0 ? (
                    <h1></h1>
                            ) : (
                                posts.map((post, index) => {

                                    if (post && post.type === "post_1") {
                                        return (
                                            <div key={index} className="all_bost click_and_listen posts1">
                                                <div className="name_shoole">
                                                    <img
                                                        src={MyData.profilImage ? `http://localhost:8000/user/${MyData.profilImage}` : '/image/pngegg.png'}
                                                        alt={`Image of ${MyData.name}`}
                                                    />
                                                    <div className="date_shoole">
                                                        <p>{post.user.name}</p>
                                                       <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
                                                    </div>
                                                </div>
                                                <h2>Click on the image and listen</h2>
                                                <div className="click_listen">
                                                    <div
                                                        className="click_img"
                                                        onClick={() => playSound(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <img src={`http://localhost:8000/posts/${post.box1.postImage_1}`} alt={`Image ${index}`} />
                                                        <p>{post.box1.word_1}</p>
                                                    </div>
                                                    <div
                                                        className="click_img"
                                                        onClick={() => playSound(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <img src={`http://localhost:8000/posts/${post.box2.postImage_2}`} alt={`Image ${index}`} />
                                                        <p>{post.box2.word_2}</p>
                                                    </div>
                                                    <div
                                                        className="click_img"
                                                        onClick={() => playSound(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <img src={`http://localhost:8000/posts/${post.box3.postImage_3}`} alt={`Image ${index}`} />
                                                        <p>{post.box3.word_3}</p>
                                                    </div>
                                                    <div
                                                        className="click_img"
                                                        onClick={() => playSound(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <img src={`http://localhost:8000/posts/${post.box4.postImage_4}`} alt={`Image ${index}`} />
                                                        <p>{post.box4.word_4}</p>
                                                    </div>
                                                    <div
                                                        className="click_img"
                                                        onClick={() => playSound(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <img src={`http://localhost:8000/posts/${post.box5.postImage_5}`} alt={`Image ${index}`} />
                                                        <p>{post.box5.word_5}</p>
                                                    </div>
                                                </div>
                                                <div className="interaction">
                                                    <div className="inter">
                                                        <FontAwesomeIcon icon={faHeart} className="inter-icon" />
                                                        <FontAwesomeIcon icon={faComment} className="inter-icon" />
                                                    </div>
                                                    <FontAwesomeIcon className="inter-icon" icon={faBookmark} />
                                                </div>
                                            </div>
                                        );
                                    }
                                    else if (post && post.type === "post_2") {
                                        return (
                                            <div key={index} className="all_bost choose_the_correct_answer">
                                                <div className="name_shoole">
                                                    <img
                                                        src={MyData.profilImage ? `http://localhost:8000/user/${MyData.profilImage}` : '/image/pngegg.png'}
                                                        alt={`Image of ${MyData.name}`}
                                                    />
                                                    <div className="date_shoole">
                                                        <p>{post.user.name}</p>
                                                        <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
                                                    </div>
                                                </div>
                                                <div className="choose_answer">
                                                    <h2>Choose the correct answer!!!</h2>
                                                    <div className="qustion_choose">
                                                        <h3>{post.question_1.question}</h3>
                                                        <div className="answer">
                                                            <p>A- {post.question_1.Answer_1}</p>
                                                            <p>B- {post.question_1.Answer_2}</p>
                                                            <p>C- {post.question_1.Answer_3}</p>
                                                            <p>D- {post.question_1.Answer_4}</p>
                                                        </div>
                                                    </div>
                                                    <div className="qustion_choose">
                                                        <h3>{post.question_2.question}</h3>
                                                        <div className="answer">
                                                            <p>A- {post.question_2.Answer_1}</p>
                                                            <p>B- {post.question_2.Answer_2}</p>
                                                            <p>C- {post.question_2.Answer_3}</p>
                                                            <p>D- {post.question_2.Answer_4}</p>
                                                        </div>
                                                    </div>
                                                    <div className="qustion_choose">
                                                        <h3>{post.question_3.question}</h3>
                                                        <div className="answer">
                                                            <p>A- {post.question_3.Answer_1}</p>
                                                            <p>B- {post.question_3.Answer_2}</p>
                                                            <p>C- {post.question_3.Answer_3}</p>
                                                            <p>D- {post.question_3.Answer_4}</p>
                                                        </div>
                                                    </div>
                                                    <div className="qustion_choose">
                                                        <h3>{post.question_4.question}</h3>
                                                        <div className="answer">
                                                            <p>A- {post.question_4.Answer_1}</p>
                                                            <p>B- {post.question_4.Answer_2}</p>
                                                            <p>C- {post.question_4.Answer_3}</p>
                                                            <p>D- {post.question_4.Answer_4}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="interaction">
                                                    <div className="inter">
                                                        <FontAwesomeIcon icon={faHeart} className="inter-icon" />
                                                        <FontAwesomeIcon icon={faComment} className="inter-icon" />
                                                    </div>
                                                    <FontAwesomeIcon className='inter-icon' icon={faBookmark} />
                                                </div>
                                            </div>
                                        );
                                    }
                                    else if (post && post.type === "post_3") {
                                        return (
                                            <div key={index} className="all_bost bost_true_or-false posts3">
                                                <div className="name_shoole">
                                                    <img
                                                        src={MyData.profilImage ? `http://localhost:8000/user/${MyData.profilImage}` : '/image/pngegg.png'}
                                                        alt={`Image of ${MyData.name}`}
                                                    />
                                                    <div className="date_shoole">
                                                        <p>{post.user.name}</p>
                                                        <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
                                                    </div>
                                                </div>
                                                <h2>Choose the correct answer!!!</h2>
                                                <div className="true_or_false">
                                                    <div className="que_tr_or_fa" >
                                                        <p>{post.question_1.question}</p>
                                                        <div className="icon_true_or_false">
                                                            <FontAwesomeIcon icon={faTimes} className="error-icon" />
                                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="true_or_false">
                                                    <div className="que_tr_or_fa" >
                                                        <p>{post.question_2.question}</p>
                                                        <div className="icon_true_or_false">
                                                            <FontAwesomeIcon icon={faTimes} className="error-icon" />
                                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="true_or_false">
                                                    <div className="que_tr_or_fa" >
                                                        <p>{post.question_3.question}</p>
                                                        <div className="icon_true_or_false">
                                                            <FontAwesomeIcon icon={faTimes} className="error-icon" />
                                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="true_or_false">
                                                    <div className="que_tr_or_fa" >
                                                        <p>{post.question_4.question}</p>
                                                        <div className="icon_true_or_false">
                                                            <FontAwesomeIcon icon={faTimes} className="error-icon" />
                                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="true_or_false">
                                                    <div className="que_tr_or_fa" >
                                                        <p>{post.question_5.question}</p>
                                                        <div className="icon_true_or_false">
                                                            <FontAwesomeIcon icon={faTimes} className="error-icon" />
                                                            <FontAwesomeIcon icon={faCheck} className="check-icon" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="interaction">
                                                    <div className="inter">
                                                        <FontAwesomeIcon icon={faHeart} className="inter-icon" />
                                                        <FontAwesomeIcon icon={faComment} className="inter-icon" />
                                                    </div>
                                                    <FontAwesomeIcon className="inter-icon" icon={faBookmark} />
                                                </div>
                                            </div>
                                        );
                                    }
                                    else if (post && post.type === "post_4") {
                                        return (
                                            <div key={index} className="all_bost image_and_answer posts4">
                                                <div className="name_shoole">
                                                    <img
                                                        src={MyData.profilImage ? `http://localhost:8000/user/${MyData.profilImage}` : '/image/pngegg.png'}
                                                        alt={`Image of ${MyData.name}`}
                                                    />
                                                    <div className="date_shoole">
                                                        <p>{post.user.name}</p>
                                                        <span>{format(new Date(post.createdAt), "dd/MM/yyyy")}</span>
                                                    </div>
                                                </div>
                                                <div className="image_answer">
                                                    <h2>What's in the picture?</h2>
                                                    <div className="img_ans">
                                                        <img src={`http://localhost:8000/posts/${post.question_1_img}`} alt="" />
                                                        <div className="anwser">
                                                            <p>{post.question_1_word_1}</p>
                                                            <p>{post.question_1_word_2}</p>
                                                            <p>{post.question_1_word_3}</p>
                                                            <p>{post.question_1_word_4}</p>
                                                        </div>
                                                    </div>
                                                    <div className="img_ans">
                                                        <img src={`http://localhost:8000/posts/${post.question_2_img}`} alt="" />
                                                        <div className="anwser">
                                                            <p>{post.question_2_word_1}</p>
                                                            <p>{post.question_2_word_2}</p>
                                                            <p>{post.question_2_word_3}</p>
                                                            <p>{post.question_2_word_4}</p>
                                                        </div>
                                                    </div>
                                                    <div className="img_ans">
                                                        <img src={`http://localhost:8000/posts/${post.question_3_img}`} alt="" />
                                                        <div className="anwser">
                                                            <p>{post.question_3_word_1}</p>
                                                            <p>{post.question_3_word_2}</p>
                                                            <p>{post.question_3_word_3}</p>
                                                            <p>{post.question_3_word_4}</p>
                                                        </div>
                                                    </div>
                                                    <div className="img_ans">
                                                        <img src={`http://localhost:8000/posts/${post.question_4_img}`} alt="" />
                                                        <div className="anwser">
                                                            <p>{post.question_4_word_1}</p>
                                                            <p>{post.question_4_word_2}</p>
                                                            <p>{post.question_4_word_3}</p>
                                                            <p>{post.question_4_word_4}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="interaction">
                                                    <div className="inter">
                                                        <FontAwesomeIcon icon={faHeart} className="inter-icon" />
                                                        <FontAwesomeIcon icon={faComment} className="inter-icon" />
                                                    </div>
                                                    <FontAwesomeIcon className="inter-icon" icon={faBookmark} />
                                                </div>
                                            </div>
                                        );
                                    }
                                    else {
                                        return null;
                                    }
                                })
                            )}
                        </div>
                    </div>
                    <Chat />
                </div>
            </div>
        </>
    )
}

export default Profile