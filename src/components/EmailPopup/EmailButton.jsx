import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./EmailButton.css";
import Email from "./../Icons/Email";

const EmailAppIcon = ({
    onClick
}) => {
    const [showIcon, setShowIcon] = useState(false);
    const emailRef = useRef(null);
    const badgeRef = useRef(null);

    useEffect(() => {
        // Simulate delay before the email icon appears (like a system boot-up)
        setTimeout(() => setShowIcon(true), 1000);
    }, []);

    useEffect(() => {
        if (showIcon) {
            gsap.fromTo(
                emailRef.current,
                { opacity: 0, y: -50, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
            );

            gsap.fromTo(
                badgeRef.current,
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.5, delay: 1, ease: "bounce.out" }
            );
        }
    }, [showIcon]);

    return (
        <>
            {showIcon && (
                <div className="email-icon" ref={emailRef} onClick={onClick}>
                    <div className="icon">
                        <Email />
                    </div>
                    <div className="badge" ref={badgeRef}>1</div>
                </div>
            )}
        </>
    );
}

export default EmailAppIcon;
