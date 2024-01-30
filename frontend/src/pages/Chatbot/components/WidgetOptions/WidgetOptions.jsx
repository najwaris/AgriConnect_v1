import React from "react";

import "./WidgetOptions.css";

const WidgetOptions = (props) => {
  const options = [
    { text: "Agriculture", 
    handler: props.actionProvider.handleAgricultureList, 
    id: 1 
    },
    { text: "SDG1: No Poverty", 
    handler: props.actionProvider.handleNoPovList, 
    id: 2 },
    { text: "SDG12: Responsible Consumption and Production", 
    handler: props.actionProvider.handleConsumpList, 
    id: 3 },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="widget-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="widget-options-container">{optionsMarkup}</div>;
};

export default WidgetOptions;