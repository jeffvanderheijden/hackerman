import { useState, useEffect } from "react";
import SpeechBubble from "./SpeechBubble"; // Import SpeechBubble component

const Conversation = ({
    name,    
    textArray,
    speechBubbleRef,
    setShowMessage,
    toggleExpand,
    afterClose,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [showText, setShowText] = useState(true); // Controls when to update text

    useEffect(() => {
        // Run method if it exists on first render
        if (textArray[currentIndex]?.method) {
            textArray[currentIndex].method();
        }
    }, []);

    const handleNext = () => {
        const nextIndex = currentIndex + 1;

        if (nextIndex < textArray.length) {
            setShowText(false);
            setTimeout(() => {
                // Run method if present
                if (textArray[nextIndex]?.method) {
                    textArray[nextIndex].method();
                }
                setCurrentIndex(nextIndex);
                setShowText(true);
            }, 100);
        } else {
            setIsVisible(false);
            setShowMessage(false);
            toggleExpand();
            afterClose && afterClose();
        }
    };

    const currentItem = textArray[currentIndex] || {};

    return (
        <div>
            {isVisible && showText && (
                <SpeechBubble 
                    name={name} 
                    text={currentItem.text || ""}
                    speechBubbleRef={speechBubbleRef}
                    onNext={handleNext} // Only update text when button is clicked
                    isLast={currentIndex === textArray.length - 1} // Pass flag for last text
                />
            )}
        </div>
    );
};

export default Conversation;
