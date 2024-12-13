
import { useEffect, useState } from 'react';
import './App.css';
import ListTemplates from './components/ListTemplates';
import TemplateInput from './components/TemplateInput';
import * as LocalApi from "./api/LocalStore";
import * as Constants from "./constants";
import CreateMessageModal from './components/CreateMessageModal';
function App() {
  const [viewTemplate, setViewTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const refreshList = () => {
    const templates = LocalApi.getItem(Constants.TEMPLATES_LIST);
    if (templates && templates.length > 0) {
      setTemplateList(templates);
    }
  }
  useEffect(() => {
    refreshList();
  }, []);
  const viewTemplateHandler = (templateName) => {
    setSelectedTemplate(templateName);
    setViewTemplate(true);
  };
  return (
    <div className="App">
      <CreateMessageModal
        templateName={selectedTemplate}
        closeModal={() => setViewTemplate(false)}
        visible={viewTemplate}
      />
      <TemplateInput onTemplateSubmit={refreshList} />
      <ListTemplates
        viewTemplate={viewTemplateHandler}
        templateList={templateList}
      />
    </div>
  );
}

export default App;
