import { useState } from "react";
import "./EmailWindow.css";
import EmailButton from "./EmailButton";
import PixelButton from "../PixelButton/PixelButton";

const EmailWindow = ({
  setEmailVisible,
  setDialogVisible
}) => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const emails = [
    {
      id: 1,
      sender: "boss@company.com",
      subject: "Quarterly Report Due",
      body: "Don't forget to submit your Q1 report by Friday.",
    },
    {
      id: 2,
      sender: "friend@oldmail.com",
      subject: "Road Trip!",
      body: "Let's plan a road trip this summer!",
    },
    {
      id: 3,
      sender: "johndoe@anon.org",
      subject: "READ ME!!!1!",
      body: "HELP.",
    },
  ];

  const handleScroll = () => {
    const totalDistance = window.innerHeight * 2; // 200vh
    const duration = 2000; // Increase duration for a slower effect (2000ms = 2 seconds)
    let startTime = null;
    let initialPosition = window.scrollY;

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Slow start, fast middle, slow stop

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const scrollAmount = easeInOutQuad(progress) * totalDistance;
      window.scrollTo(0, initialPosition + scrollAmount);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className="email-window-container">
      <EmailButton onClick={() => setIsOpen(true)} />
      <div className={`window ${isOpen ? "show" : "hide"}`}>
        <div className="title-bar">
          <span className="title-text">GFail</span>
          <div className="title-controls">
            <button className="title-button">_</button>
            <button className="title-button">□</button>
            <button className="title-button" onClick={() => setIsOpen(false)}>X</button>
          </div>
        </div>
        <div className="toolbar">
          {/* TODO: easter egg dropdown? */}
          <button className="toolbar-button">File</button>
          <button className="toolbar-button">Edit</button>
          <button className="toolbar-button">View</button>
          <button className="toolbar-button">Help</button>
        </div>
        <div className="content-area">
          <div className="sidebar">
            <h2 className="header">Inbox</h2>
            <ul className="emailList">
              {emails.map((email) => (
                <li
                  key={email.id}
                  className="emailItem"
                  onClick={() => setSelectedEmail(email)}
                >
                  <strong>{email.sender}</strong>
                  <br />
                  {email.subject}
                </li>
              ))}
            </ul>
          </div>
          <div className="emailContent">
            {selectedEmail ? (
              <>
                <h3>{selectedEmail.subject}</h3>
                <p><strong>From:</strong> {selectedEmail.sender}</p>
                <p>{selectedEmail.body}</p>
                {selectedEmail.id === 3 && (
                  <div className="button-group">
                    <PixelButton
                      onClick={() => setIsOpen(false)}
                      text="Close email"
                    />
                    <PixelButton
                      onClick={() => {
                        setIsOpen(false)
                        setEmailVisible(false)
                        setTimeout(() => {
                          handleScroll()
                        }, 700)
                        setDialogVisible(false)
                      }}
                      text="Accept mission"
                    />
                  </div>
                )}
              </>
            ) : (
              <p>Select an email to read</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailWindow;