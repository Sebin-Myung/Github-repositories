import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import Main from "./pages/Main";
import Overview from "./pages/Overview";
import Repositories from "./pages/Repositories";

function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/repositories" element={<Repositories />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
