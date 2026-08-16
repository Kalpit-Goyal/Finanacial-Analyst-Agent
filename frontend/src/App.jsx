import { useState } from "react";
import CompanySetup from "./components/CompanySetup";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [company, setCompany] = useState("");
  const [started, setStarted] = useState(false);

  const handleCompanySubmit = (companyName) => {
    setCompany(companyName);
    setStarted(true);
  };

  if (!started) {
    return <CompanySetup onSubmit={handleCompanySubmit} />;
  }

  return (
    <ChatWindow
      company={company}
    />
  );
}

export default App;