import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './header.css'
import { Link } from 'react-router-dom';
export default function CreatePost() {
    const [postModalShow, setPostModalShow] = useState(false);
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [image,setImage] = useState('')
    const baseApi = 'https://tarmeezacademy.com/api/v1';
    const createNewPost = (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token")
      let formData = new FormData()
      formData.append("title",title)
      formData.append("body",body)
      formData.append("image",image)
      axios.post(`${baseApi}/posts`,formData,{
        headers :{
          "authorization": `Bearer ${token}`
        }
      }).then((response) => {
            console.log('success',response)
        })
        .catch((error) => {
          console.error('Login Failed:', error);
          // throw error;
        });
      }
  return (
    <div className='createPost'>
      <div className='addPost' ><span onClick={() => setPostModalShow((postModalShow) => !postModalShow)}>+</span></div>

        {/* modal */}
        <Modal className='createPostModal' show={postModalShow} onHide={() => setPostModalShow(false)}>
              <Modal.Header >
                <Modal.Title className='title'>Register</Modal.Title>
              </Modal.Header>
            <Modal.Body>
                <form >
                  <label htmlFor="title">Title:</label>
                  <input onChange={(e)=> setTitle(e.target.value)} type="text" id="title" name="title" required />
                  <label htmlFor="body">Body:</label>
                  <input onChange={(e)=> setBody(e.target.value)} type="text" id="body" name="body" required />
                  <label htmlFor="image">Image:</label>
                  <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" name="image"  />
                  <Modal.Footer>
                    <Button className='close '  onClick={() => setPostModalShow(false)}>
                      Close
                    </Button>
                    <Button className='save' type="submit" onClick={createNewPost}>
                      Create
                    </Button>
                  </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
    </div>
  )
}
