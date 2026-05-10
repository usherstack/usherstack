import React, { useEffect, useState } from "react";

export function TypingText({
  phrases = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
  className = "",
}) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;

    const currentPhrase = phrases[currentPhraseIndex];

    let timeout;

    // Typing
    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    // Deleting
    else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);

        // Next phrase
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return (
    <span className={className}>
      {displayText}

      {/* Cursor */}
      <span className="animate-pulse ml-1">|</span>
    </span>
  );
}
export default TypingText;
