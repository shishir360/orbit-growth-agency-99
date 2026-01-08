import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypeWriterProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypeWriter = ({ text, delay = 50, className = "", onComplete }: TypeWriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, delay, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
};

interface TypeWriterMultiLineProps {
  lines: { text: string; className?: string }[];
  delay?: number;
  lineDelay?: number;
}

export const TypeWriterMultiLine = ({ lines, delay = 50, lineDelay = 300 }: TypeWriterMultiLineProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = () => {
    if (currentLine < lines.length - 1) {
      setCompletedLines(prev => [...prev, lines[currentLine].text]);
      setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, lineDelay);
    }
  };

  return (
    <div>
      {completedLines.map((line, index) => (
        <div key={index} className={lines[index]?.className}>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <div className={lines[currentLine]?.className}>
          <TypeWriter
            text={lines[currentLine].text}
            delay={delay}
            onComplete={handleLineComplete}
          />
        </div>
      )}
    </div>
  );
};

export default TypeWriter;
