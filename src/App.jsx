import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BirthdayMessage from "./pages/message";
import ImageGallery from "./pages/Gallery"; // Ensure correct case and existence
// import Wishing from "./pages/Wishing";
import Wish from "./pages/Wish"; // Ensure correct case and existence
import CelebrateWithMe from "./pages/CelebrateWithMe";
import BirthdayPage from "./pages/BirthdayPage";
import Cake from "./pages/Cake"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BirthdayMessage />} />
        <Route path="/celebratewithme" element={<CelebrateWithMe />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/birthdaypage" element={<BirthdayPage />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/wish" element={<Wish />} />
        {/* <Route path="/wishing" element={<Wishing />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
