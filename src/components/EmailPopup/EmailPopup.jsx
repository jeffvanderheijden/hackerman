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

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                ".email-popup",
                { opacity: 0, y: -50, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
            );
        } else {
            gsap.to(".email-popup", {
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

            <div className={`email-popup ${isOpen ? "show" : "hide"}`}>
                <p className="meta">From: Unknown Sender</p>
                <p className="meta">To: Jeff.vdh</p>
                <p className="meta">Subject: [URGENT]</p>

                <div className="email-body">
                    <p>
                        Jeff... the system is failing. Mediocrity is spreading. The students need guidance. Will you answer the call?
                    </p>
                    <br />
                    <p>- Unknown</p>
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