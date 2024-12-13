import * as LocalApi from '../api/LocalStore';
import React, {useEffect, useState} from "react";

const CreateMessageModal = ({ templateName , closeModal, visible }) => {
    const [template, setTemplate] = useState();
    const [fields, setFields] = useState([]);
    const [finalMessage, setFinalMessage] = useState("");
    const [finalFields, setFinalFields] = useState({});
    useEffect(() => {
        const templateData = LocalApi.getItem(templateName);
        if (templateData) {
            setTemplate(templateData.template.messageText);
            setFields(templateData.template.fields);
        }
    }, [templateName]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFinalFields({
            ...finalFields,
            [name]: value
        });
    };

    useEffect(() => {
        let updatedMessage = template;
        for (const key in finalFields) {
            const regex = new RegExp(`{{${key}}}`, 'g');
            updatedMessage = updatedMessage.replace(regex, finalFields[key]);
        }
        setFinalMessage(updatedMessage);
    }, [finalFields, template]);

    const copyMessage = () => {
        const input = document.createElement('input');
        input.value = finalMessage;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };

    if (!visible) {
        return <></>;
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>{templateName}</h2>
                <p>{finalMessage}</p>
                <ul>
                    {fields.map((field, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                placeholder={field}
                                name={field}
                                onChange={handleInputChange}
                            />
                            <br />
                        </li>
                    ))}
                </ul>
                <button onClick={copyMessage}>Copy</button>
            </div>
        </div>
    );
    
}

export default CreateMessageModal;