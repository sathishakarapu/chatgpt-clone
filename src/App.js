import './App.css';
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import svaed from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import usericon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";

import { sendMsgOpenAi } from './OpenAi';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setChats([...chats, userMessage]);
    setInput("");

    try {
      const botResponse = await sendMsgOpenAi(input);
      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: botResponse,
      };
      setChats((prevChats) => [...prevChats, botMessage]);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='App'>
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt='logo' className='logo' />
            <span className='brand'>ChatGPT</span>
          </div>
          <button className='midBtn'>
            <img src={addBtn} className='addBtn' alt='btn-logo' />
            New Chat
          </button>
          <div className='upperSideBottom'>
            <button className='query'>
              <img src={msgIcon} alt='text-1' className='' />
              What is Programming ?
            </button>
            <button className='query'>
              <img src={msgIcon} alt='text-1' className='' />
              How Create An API ?
            </button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className='listItems'>
            <img src={home} alt='Home' className='listItemsImg' />
            Home
          </div>
          <div className='listItems'>
            <img src={svaed} alt='Saved' className='listItemsImg' />
            Saved
          </div>
          <div className='listItems'>
            <img src={rocket} alt='Upgrade' className='listItemsImg' />
            Upgrade to Pro
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='chats'>
          {chats.map((chat) => (
            <div key={chat.id} className={`chat ${chat.sender === "bot" ? "bot" : ""}`}>
              <img src={chat.sender === "bot" ? gptImgLogo : usericon} alt={chat.sender} className='chatImg' />
              <p className='txt'>{chat.text}</p>
            </div>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <div className='chatFooter'>
          <div className='inp'>
            <input
              type='text'
              placeholder='Send a Message'
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
            />
            <button className='send' onClick={handleSend}>
              <img src={sendBtn} alt='sendButton' />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT August 20 Version.</p>
        </div>
      </div>
    </div>
  );
}

export default App;