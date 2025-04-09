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
      sender: "toelating@glr.nl",
      subject: "GEFELICITEERD! Je bent aangenomen!",
      body: `
Beste toekomstige wereldverbeteraar,

Goed nieuws! Je bent officieel toegelaten tot het MBO Lyceum voor Ambitieuze Tot En Met Redelijk Wakkere Studenten.

Op basis van je indrukwekkende motivatie ("mijn moeder zei dat ik moest") en je unieke talent om formulieren nét op tijd in te leveren, verwelkomen wij je met open armen, een stapel roosters en een printer die het nét niet doet.

Wat kun je verwachten?

- Koffie die smaakt naar opgewarmde twijfel
- Docenten met mysterieuze bureauladen vol stressballen
- En natuurlijk: vrijdagmiddag Excel-feestjes!

Klik hieronder om je aanmelding te bevestigen en je eerste les in "Hoe Overleef Ik De Eerste Week" te starten.

Tot snel in de aula!
Met administratieve groet,
Team Toelating & Toverkunst
Grafisch Lyceum Rotterdam`,
    },
    {
      id: 2,
      sender: "not_@_scam.com",
      subject: "Your Banana Is Too Small 😱🍌",
      body: `
Hey you!

Tired of your tiny pet banana being ignored by the fruit bowl elite?
With Banana Boost™, your banana can grow 6 sizes in 3 days!*

Benefits include:

Instant potassium power 💪

Banana ballet skills 🩰

Slightly more respect from apples 🍏

Click now before your banana gets jealous:
👉 [Grow My Banana]

Totally serious,
Dr. Peely von Splits
Chief Bananaologist

*Not approved by any real scientists.
      `,
    },
    {
      id: 3,
      sender: "every@company.com",
      subject: "You Blinked. Now You Owe Us Your Soul (and $29.99/month)",
      body: `
Hey there, Valuable Human Asset!

We noticed you hovered over our ad for 0.7 seconds. That's basically a legally binding contract. Welcome to our Gold Elite Ultra-Plus Membership Plan™—it includes:

- A monthly newsletter full of things you'll never read
- Access to exclusive content that doesn't exist
- A badge for your profile no one will see

If you act now (and by now, we mean within the next 3 seconds), we'll throw in a digital high-five—absolutely free.

Click below to confirm your eternal loyalty:

👉 [I Submit Willingly]

Hugs,
The Monetization Elves`,
    },
  ];

  const handleScroll = () => {
    const totalDistance = window.innerHeight * 2;
    const duration = 2000; 
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
                {selectedEmail.body.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                {selectedEmail.id === 1 && (
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