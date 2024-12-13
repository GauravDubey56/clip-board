import React, { useEffect, useState } from "react";

const ListTemplates = (props) => {
  const [template, setTemplate] = useState([]);

  useEffect(() => {
    if (props.templateList && props.templateList.length > 0) {
      setTemplate(props.templateList);
    }
  }, [props.templateList]);
  const onClickHandler = (templateName) => {
    console.log("templateName", templateName);
    if (typeof props.viewTemplate === "function") {
      props.viewTemplate(templateName);
    }
  };
  return (
    <>
      <div className="central-container">
        <h2>Templates</h2>
        <ul>
          {template.map((templateName, index) => (
            <li key={index}>
              <div>
                <h3>{templateName}</h3>
                <button
                  onClick={() => {
                    onClickHandler(templateName);
                  }}
                >
                  CreateText
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListTemplates;
