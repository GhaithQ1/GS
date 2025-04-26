// UserContext.js
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const {userId,setUserId} = useState(null); 
  const [userById, setuserById] = useState(null); 
  const [showChat, setShowChat] = useState(false); 
  return (
    <UserContext.Provider value={{ 
      userId, setUserId, 
      userById, setuserById,
      showChat, setShowChat
    }}>
      {children}
    </UserContext.Provider>
  );
};
