import './App.css';
import { Routes, Route,} from 'react-router-dom'
import Home from "./pages/Home";
import FullPost from "./pages/FullPost";
import Header from "./components/header/Header";
function App() {
  return (
    <div>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/FullPost" element={<FullPost/>}/>
                </Routes>
    </div>
  );
}

export default App;
