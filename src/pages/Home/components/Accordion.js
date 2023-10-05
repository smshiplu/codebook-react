import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export const Accordion = ({faq}) => {
    const {question, answer} = faq;
    const [show, setShow] = useState(false);

    return (
        <div>
            <h2 id="accordion-flush-heading-1">
                <button onClick={() => setShow(!show)} type="button" className="text-lg flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                  <span className="text-xl text-slate-900 dark:text-white">{question}</span>
                  { !show &&  <FaAngleDown />}
                  { show && <FaAngleUp/> } 
                </button>
            </h2>     
            { show && (
                <div id="accordion-flush-body-1" className="" aria-labelledby="accordion-flush-heading-1">
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-lg mb-2 text-gray-500 dark:text-gray-400">{answer}</p>
                  </div>
                </div> 
            ) }                           
        </div>
    )
}
