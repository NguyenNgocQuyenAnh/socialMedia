import React, { useEffect, useState ,useRef} from "react";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ chat, currentUser,setSendMessage,receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef()
  //fetching data
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);
 
  useEffect(()=>{
    if(receiveMessage !==null && receiveMessage.chatId === chat._id){
      setMessages([...messages,receiveMessage])
    }
},[receiveMessage])
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
 const handleSend =async (e) =>{
   e.preventDefault()
   const message = {
     senderId: currentUser,
     text: newMessage,
     chatId: chat._id
   }

   // send message to database
   try {
    const {data } = await addMessage(message)
    setMessages([...messages,data])
    setNewMessage("")
   } catch (error) {
    
   }
 
 // send message to socket 
 const reciverId = chat.members.find((id)=> id!== currentUser)
 setSendMessage({...messages,reciverId})
}
//always scroll last message
useEffect(() =>{
    scroll.current?.scrollIntoView({behavior:"smooth"})
},[messages])
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                        "profile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                  <div ref={scroll} 
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              <div >+</div>
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" onClick={handleSend}>Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
