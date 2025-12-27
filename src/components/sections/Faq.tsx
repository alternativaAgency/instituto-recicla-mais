import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { faqQuestions } from "@/constants/faqQuestions";

const BasicFAQ = () => {
  const renderAnswer = (answer: string | string[] | React.ReactNode) => {
    // If it's a React.ReactNode, render directly
    if (typeof answer !== "string" && !Array.isArray(answer)) {
      return answer;
    }
    
    // If it's an array of strings, render each as a paragraph
    if (Array.isArray(answer)) {
      return (
        <>
          {answer.map((paragraph, index) => (
            <p key={index} className={index > 0 ? "mt-4" : ""}>
              {paragraph}
            </p>
          ))}
        </>
      );
    }
    
    // If it's a string, render as a single paragraph (backward compatible)
    return <p>{answer}</p>;
  };

  return (
    <div className="py-12 bg-limpeza">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-380">
        <h3 className="mb-4 text-center text-5xl font-semibold text-mata-900">
          Perguntas Frequentes
        </h3>
        {faqQuestions.map((question, index) => (
          <Question
            key={index}
            title={question.title}
            defaultOpen={question.defaultOpen}
          >
            {renderAnswer(question.answer)}
          </Question>
        ))}
      </div>
    </div>
  );
};

const Question = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={open ? "" : "border-b border-b-mata-200"}>
      <button
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 py-6 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 border-none focus:border-none active:bg-mata-100/50 active:opacity-90 transition-colors duration-150 min-h-[44px]"
        style={{ 
          WebkitTapHighlightColor: "transparent",
        } as React.CSSProperties}
      >
        <span
          className={`text-left text-xl sm:text-2xl font-semibold transition-colors duration-150 ${
            open
              ? "text-mata-900"
              : "bg-linear-to-r from-mata-600 to-mata-500 bg-clip-text text-transparent"
          }`}
          style={{
            fontFamily: "'Geom', system-ui, -apple-system, sans-serif",
            WebkitBackgroundClip: open ? "unset" : "text",
            WebkitTextFillColor: open ? "unset" : "transparent",
          }}
        >
          {title}
        </span>
        <span
          className={`text-2xl transition-all duration-250 ease-out ${
            open ? "text-mata-600 rotate-180" : "text-mata-700 rotate-0"
          }`}
        >
          <FiChevronDown />
        </span>
      </button>
      <div
        className={`overflow-hidden ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          transition: "max-height 250ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease-out",
        }}
      >
        <div
          className="text-gray-600 pb-6 text-base leading-relaxed"
          style={{
            fontFamily: "'ObjectSans', system-ui, -apple-system, sans-serif",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasicFAQ;
