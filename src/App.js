import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import { Route ,Routes } from 'react-router-dom';
import PostDetails from './components/PostDetails'
function App() {
  
  return (
    <>
      <div className="App">
        <Header/>
      <Routes>
        <Route path="/" element={<Posts/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
