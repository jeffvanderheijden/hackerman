import { useState, useEffect } from "react";
import gsap from "gsap";
import "./EmailPopup.css";
import EmailButton from "./EmailButton";
import PixelButton from "../PixelButton/PixelButton";

const EmailPopup = ({
    setEmailVisible,
    setDialogVisible
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const email = {
        from: "Jane Smith <jane.smith@companymail.com>",
        to: "you@example.com",
        subject: "Meeting Recap & Action Items",
        date: "Thu, Mar 21, 2025 at 10:32 AM",
        body: `
Hi there,

Thanks for attending yesterday's meeting. Here's a quick summary of what we covered:

    - Project deadline moved to April 5th
    - Final design assets due by March 28th
    - Weekly stand-ups to be moved to Tuesdays at 9:00 AM

Please make sure your teams are aligned on these updates.

Best,  
Jane
        `,
    };

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                ".email-container",
                { opacity: 0, y: -50, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
            );
        } else {
            gsap.to(".email-container", {
                opacity: 0,
                y: -50,
                scale: 0.8,
                duration: 0.4,
                ease: "power3.in",
            });
        }
    }, [isOpen]);

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
        <div className="email-popup-container">
            <EmailButton onClick={() => setIsOpen(true)} />

            <div className={`email-container ${isOpen ? "show" : "hide"}`}>
                <div className="email-header">
                    <div className="email-subject">{email.subject}</div>
                    <div className="email-meta">
                        <div><strong>From:</strong> {email.from}</div>
                        <div><strong>To:</strong> {email.to}</div>
                        <div><strong>Date:</strong> {email.date}</div>
                    </div>
                </div>
                <div className="email-body">
                    {email.body.split("\n").map((line, index) => (
                        <p key={index} className="email-paragraph">{line}</p>
                    ))}
                </div>
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
            </div>
        </div>
    );
}

export default EmailPopup;