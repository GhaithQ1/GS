import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useUser } from '../Context';

const ChatBetweenUsers = () => {
  const { userById } = useUser();
  const [reload, setReload] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const {setShowChat} = useUser();
  const [cookies] = useCookies(["token"]);
  const [sentRequests, setSentRequests] = useState({});
  const [Mydata, SetMydata] = useState();

  // ⚡️ Ref for auto-scroll
  const bottomRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('chat-page');
    return () => {
      document.body.classList.remove('chat-page');
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v2/auth/get_date_my', {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      }
    })
    .then((res) => {
      SetMydata(res.data.data);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    })
    .finally(() => {
      setLoadingRequest(false);
    });
  }, []);

  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const user1Id = Mydata?._id;
  const [user2Id, setUser2Id] = useState(null);

  // 👇 التمرير للأسفل تلقائياً عند تغير المحادثة
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  useEffect(() => {
    if (!user1Id || !userById) return;

    const fetchChat = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v2/chat/${user1Id}/${userById}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          }
        });

        setChat(res.data.data.messages);
      } catch (err) {
        if (err.response?.data?.errors) {
          const formattedErrors = {};
          err.response.data.errors.forEach(error => {
            formattedErrors[error.path] = error.msg;
          });
          console.log(formattedErrors);
        }
      }
    };

    fetchChat();
    const interval = setInterval(fetchChat, 1000);
    return () => clearInterval(interval);
  }, [user1Id, userById]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v2/chat`,
        {
          user1Id,
          user2Id: userById,
          content: input,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      setChat(res.data.chat.messages);
      setInput("");
    } catch (err) {
      console.error("فشل في الإرسال:", err.response?.data || err.message);
    }
  };

  return (

        <div className="chat-container">
          <div className="chat-box">
            <FontAwesomeIcon
              className="search_icon"
              onClick={() => setShowChat(false)}
              icon={faTimes}
            />
  
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === Mydata?._id || msg.sender?._id === Mydata?._id
                    ? "me"
                    : "other"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            ))}
  
            <div ref={bottomRef} />
          </div>
  
          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب رسالة..."
            />
            <button type="submit">Send</button>
          </form>
        </div>

  );
  
  
};

export default ChatBetweenUsers;
