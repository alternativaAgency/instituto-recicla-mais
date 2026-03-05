import React, { useId, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import type { FAQQuestion } from "@/constants/faqQuestions";
import { faqQuestions } from "@/constants/faqQuestions";
import { SectionDivider } from "./SectionDivider";
import "../../styles/accordion.css"; // point to your single source-of-truth CSS

type AccordionProps = FAQQuestion;

export function AccordionItem({ title, answer, defaultOpen = false }: AccordionProps) {
  const [active, setActive] = useState(defaultOpen);

  const uid = useId();
  const buttonId = `accordion-button-${uid}`;
  const panelId = `accordion-panel-${uid}`;

  function toggleAccordion() {
    setActive((prev) => !prev);
  }

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

    // If it's a string, render as a single paragraph
    return <p>{answer}</p>;
  };

  return (
    <div className={`accordion__section ${!active ? "accordion__section--bordered" : ""}`}>
      <button
        id={buttonId}
        type="button"
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
        aria-expanded={active}
        aria-controls={panelId}
        style={{
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <span className="accordion__title">{title}</span>
        <span className={`accordion__icon ${active ? "rotate" : ""}`} aria-hidden="true">
          <FiChevronDown />
        </span>
      </button>

      <div
        className={`accordion__content-wrapper ${active ? "accordion__content-wrapper--active" : ""}`}
      >
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className={`accordion__content ${active ? "accordion__content--active" : ""}`}
        >
          <div className="accordion__text">
            {renderAnswer(answer)}
          </div>
        </div>
      </div>
    </div>
  );
}

const AccordionList = () => {
  return (
    <div className="relative pt-12 pb-36 md:pb-48 lg:pb-56 bg-limpeza">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-380 relative z-10">
        <h3 className="mb-6 text-center text-5xl font-semibold text-mata-900">
          Perguntas Frequentes
        </h3>
        <div className="px-2 md:px-4 lg:px-10 xl:px-18 2xl:px-24">
          {faqQuestions.map((question, index) => (
            <AccordionItem
              key={index}
              title={question.title}
              answer={question.answer}
              defaultOpen={question.defaultOpen}
            />
          ))}
        </div>
      </div>
      <SectionDivider type="curve" position="bottom" fill="fill-mata-950" />
    </div>
  );
};

export default AccordionList;
