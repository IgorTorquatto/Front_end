import React from 'react'
import{ useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import './AccordionComp.css'

export const AccordionComp = ({ title, content }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
          <div className="accordion-header" onClick={toggleAccordion}>
            <h3>{title}</h3>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {isOpen && <div className="accordion-content">{content}</div>}
        </div>
      );
}
