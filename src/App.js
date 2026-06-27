import './App.css';
import { Route ,Routes } from 'react-router-dom';
import Header from './components/Header';
import Posts from './components/Posts';
import Profile from './components/Profile';
import PostDetails from './components/PostDetails'
import CreatePost from './components/CreatePost'
function App() {
  
  return (
    <>
      <div className="App">
        <Header/>
        {localStorage.getItem("isLogin") && <CreatePost/>}
      <Routes>
        <Route path="/users/:id" element={<Profile/>}/>
        <Route path="/" element={<Posts/>}/>
        <Route path="/posts/:id" element={<PostDetails/>}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
