import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [image, setImage] = useState('');
   const baseApi = 'https://tarmeezacademy.com/api/v1';
  const [isLogin, setIsLogin] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [registerModalShow, setRegisterModalShow] = useState(false);

  function loginUser(){
    const params = {
      "username":username,
      "password":password
    }
    if(!params.username || !params.password){
      alert("Please enter username and password")
      return
    }
    axios.post(`${baseApi}/login`,params)
      .then((response) =>{
          localStorage.setItem("token",response.data.token)
          localStorage.setItem("user",JSON.stringify(response.data.user))
          setIsLogin(true);
          localStorage.setItem("isLogin",true)
          // Hide the modal after successful login
          setLoginModalShow(false);
          setRegisterModalShow(false);
          console.log('success',response)
      })
      .catch(error => {
        console.error('Login Failed:', error);
        // throw error;
      });
    };
    function RegisterUser(){
      // let formData = new FormData()
      //   formData.append("username",username)
      //   formData.append("password",password)
      //   formData.append("name",name)
      //   formData.append("email",email)
        // formData.append("image",image)
  
        let formData = {
          "username":username,
          "password":password,
          "name":name,
          "email":email
        }
      //    axios.post("https://tarmeezacademy.com/api/v1/register",formData//,{
      //   //   headers :{
      //   //     "Content-Type": "multipart/form-data"
      //   //   }
      //   // }
      // )
      //     .then((response) => {
              localStorage.setItem("token",formData)
              // localStorage.setItem("user",JSON.stringify(response.data.user))
              localStorage.setItem("isLogin",true)
              setIsLogin(true);
              // Hide the modal after successful login
              setRegisterModalShow(false);
              setLoginModalShow(false);
              // console.log('success',response)
          // })
          // .catch(error => {
          //   console.error('Register Failed:', error);
          //   // throw error;
          // });
    }
    let user = JSON.parse(localStorage.getItem("user"))
    // console.log('user',user)
  return (
      <div className="AppHeader">

          <div className="header">
            <div className="logo-header">
              <span className='logo'><a  href="/">FRIENDS</a></span>
              <a href="/">Home</a>
            </div>
            <div className="registeration">
              {
                localStorage.getItem("isLogin")? <Link to={`/users/${user.id}`}>{user.username}</Link>:
                <>
                <button onClick={()=>{
                  setLoginModalShow(true)
                  setRegisterModalShow(false)
                }}>Login</button>
                {/* <button onClick={()=> {
                
                  setRegisterModalShow(true)
                  setLoginModalShow(false)
                }}>Register</button> */}
                </>
              }
            </div>
          </div>

            {/* modals */}
            {/* register modal */}
            <Modal className='registerModal' show={registerModalShow} onHide={() => setRegisterModalShow(false)}>
              <Modal.Header >
                <Modal.Title className='title'>Register</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form >
                  <label htmlFor="username">Username:</label>
                  <input onChange={(e)=> setUsername(e.target.value)} type="text" id="username" name="username" required />
                  <label htmlFor="password">Password:</label>
                  <input onChange={(e)=> setPassword(e.target.value)} type="password" id="password" name="password" required />
                  <label htmlFor="name">Name:</label>
                  <input onChange={(e)=> setName(e.target.value)} type="text" id="name" name="name" required />
                  <label htmlFor="email">Email:</label>
                  <input onChange={(e)=> setEmail(e.target.value)} type="email" id="email" name="email" required />
                  {/* <label htmlFor="image">Image:</label> */}
                  {/* <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" name="image" crossorigin="anonymous" /> */}
                  <Modal.Footer>
                    <Button className='close '  onClick={() => setRegisterModalShow(false)}>
                      Close
                    </Button>
                    <Button className='save' type="submit" onClick={RegisterUser}>
                      Register
                    </Button>
                  </Modal.Footer>
                </form>
              </Modal.Body>
            </Modal>
            {/* //////////////register modal */}
            {/* Login modal */}
            <Modal className='loginModal' show={loginModalShow} onHide={() => setLoginModalShow(false)}>
              <Modal.Header >
                <Modal.Title className='title'>Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form >
                  <label htmlFor="username">Username:</label>
                  <input onChange={(e)=> setUsername(e.target.value)} type="text" id="username" name="username" required />
                  <label htmlFor="password">Password:</label>
                  <input onChange={(e)=> setPassword(e.target.value)} type="password" id="password" name="password" required />
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button className='close' onClick={() => setLoginModalShow(false)}>
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