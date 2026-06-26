import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import './header.css';

function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleClose = () => setLoginModalShow(false);
  const handleShow = () => setLoginModalShow(true);
  function loginUser(){
    const params = {
      "username":username,
      "password":password
    }
    axios.post("https://tarmeezacademy.com/api/v1/login",params)
        .then((response) =>{
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",JSON.stringify(response.data.user))
            setIsLogin(true);
            localStorage.setItem("isLogin",isLogin)
            // Hide the modal after successful login
            setLoginModalShow(false);
            console.log(response)
        })
        .catch(error => {
          console.error('Login Failed:', error);
          throw error;
        });
    };
  return (
      <div className="AppHeader">

         <div className="header">
            <div className="logo-header">
              <span className='logo'><a  href="/">FRIENDS</a></span>
              <a href="/">Home</a>
              <a href="/">Profile</a>
            </div>
            {
              localStorage.getItem("isLogin")? '':
              <div className="registeration">
                <button onClick={handleShow}>Login</button>
                <button >Register</button>
              </div>
            }
         </div>



            <Modal className='loginModal' show={loginModalShow} onHide={handleClose}>
              <Modal.Header >
                <Modal.Title className='title'>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form >
                  <label htmlFor="username">Username:</label>
                  <input onChange={(e)=> setUsername(e.target.value)} type="text" id="username" name="username" required />
                  <label htmlFor="password">Password:</label>
                  <input onChange={(e)=> setPassword(e.target.value)} type="password" id="password" name="password" required />
                  {/* <button type="submit">Login</button> */}
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button className='close '  onClick={handleClose}>
                  Close
                </Button>
                <Button className='save' type="submit" onClick={loginUser}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
      </div>
      );
}

export default Header;