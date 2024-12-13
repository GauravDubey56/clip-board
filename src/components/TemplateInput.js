import React, { useEffect, useState } from "react";
import * as LocalApi from "../api/LocalStore";
import * as Constants from "../constants";  
const TemplateInput = (props) => {

  const [template, setTemplate] = useState();
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);

  const validateInputs = () => {
    if (!name) {
      alert("Name is required");
      return false;
    }
    if (!template) {
      alert("Template is required");
      return false;
    }
    return true;
  };
  const submitTemplate = () => {
    if (!validateInputs()) {
      return;
    }
    const templateData = {
      name,
      template: {
        messageText: template,
        fields,
      },
    };
    const existingTemplate = LocalApi.getItem(Constants.TEMPLATES_LIST);
    console.log("existingTemplate", existingTemplate);
    if (existingTemplate && existingTemplate.length > 0 && !existingTemplate.includes(name)) {   
      LocalApi.saveItem(Constants.TEMPLATES_LIST, [...existingTemplate, name]); 
    } else  {
        if (!existingTemplate?.length) {
            LocalApi.saveItem(Constants.TEMPLATES_LIST, [name]);
        }
    }
    LocalApi.saveItem(name, templateData);
    if (props.onTemplateSubmit && typeof props.onTemplateSubmit === "function") {
        props.onTemplateSubmit();
    }
  };
  useEffect(() => {
  }, [])
  useEffect(() => {
    // check value inside {{ }} in template
    if (!template) {
      setFields([]);
      return;
    }
    try {
      const regex = /{{(.*?)}}/g;
      const matches = template.match(regex);
      if (matches) {
        const fields = matches.map((match) => match.replace(/{{|}}/g, ""));
        setFields(fields);
      } else {
        setFields([]);
      }
    } catch (error) {
      console.error("error in template check", error);
    }
  }, [template]);
return (
    <div className="central-container">
        <form>
            <div>
                <div className="input-bottom">
                    <label className="input-label">Name</label>
                    <input
                        className="input-bottom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                    <br />
                    <br />
                </div>
                <div className="input-bottom">
                    <label className="input-label">Template</label>
                    <textarea
                        className="input-bottom"
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                    ></textarea>
                    <br />
                    <br />
                </div>
                {fields.length > 0 && (
                    <div>
                        <h3>Fields</h3>
                        <ul>
                            {fields.map((field) => (
                                <li key={field}>{field}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <br />
            <br />
            <button type="button" onClick={submitTemplate}>
                Save
            </button>
        </form>
    </div>
);
};

export default TemplateInput;
