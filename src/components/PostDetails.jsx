import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './postDetails&comments.css'
export default function PostDetails() {
    const [post , setPost] = useState({})
    const [commentBody , setCommentBody] = useState('')
    const [postLoading , setPostLoading] = useState(true)
    const id = useParams()
    function addComment(){
        axios.post(`https://tarmeezacademy.com/api/v1/posts/${id.id}/comments`,{body:commentBody},{
            headers :{
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        // .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => setCommentBody(''))
    }
    useEffect(() => {
        fetch(`https://tarmeezacademy.com/api/v1/posts/${id.id}`)
        .then(res => res.json())
        .then(res => setPost(res.data))
        .catch(err => {
          console.log(`Error fetching in post with id : ${id.id} `,err)
        }).finally(()=>{
            // console.log(post)
            setPostLoading(false)
        })
    })
  return (
    <div>
      {postLoading? "Loading..." :
        <div>
            <div  className='post'>
                <Link to={`/users/${post.author.id}`}>
                    <div className='postHeader'>
                        <div className='icon'><img src={post.author.profile_image} alt=""/></div>
                        <h4  className='username'>{post.author.username}</h4>
                    </div>
                </Link>
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
                    <p>({post.comments_count}) <span>Comments  \/ </span> </p>
                </div>
            </div>
             {
                post.comments.map(comment => (
                    <div className="comments">
                        <div className='commentHeader'>
                            <div className='icon'><img src={comment.author.profile_image} alt=""/></div>
                            <h4 className='username'>{comment.author.username}</h4>
                        </div>
                        <div className='commentBody'>
                            <p>{comment.body}</p>
                            <span>{comment.created_at}</span>
                        </div>
                    </div>
                ))
             }
            {/* add comment */}
            <div>
                <div className='addComment'>
                    <input value={commentBody} onChange={(e) => setCommentBody(e.target.value)} className='commentInput' type="text" placeholder='Add a comment' />
                    <button className='commentBtn' type='submit' onClick={addComment}>Add</button>
                </div>
            </div>
        </div>

      }
    </div>
  )
}
