import React from 'react'
import {Link} from 'react-router-dom'
import './post.css'
export default function Post({post}) {
  // let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className='post'>
        <div >
          <Link className='postHeader' to={`/users/${post.author.id}`} >
            <div className='icon'><img src={post.author.profile_image} alt=""/></div>
            <h4 className='username'>{post.author.username}</h4>
          </Link>
          {
            // post.author.id === user.id &&
            // <div className='deletePost'>
            //   <button>delete</button>
            // </div>
          }
        </div>
        <Link to={`/posts/${post.id}`}>
          <div className='postImage'>
            <img src={post.image} alt="" />
          </div>
          <div className='postBody'>
            <div className='postTitleTime'>
              <h3 className='postTitle'>{post.title}</h3>
              <p className='postTime'>{post.created_at}</p>
            </div>
            <p className='postDesc'>{post.body}</p>
          </div>
          <div className='postComments'>
            <p>({post.comments_count}) <span>Comments</span> </p>
          </div>
        </Link>
    </div>
  )
}
