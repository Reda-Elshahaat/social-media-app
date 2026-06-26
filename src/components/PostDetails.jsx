import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import './postDetails&comments.css'
export default function PostDetails() {
    const [post , setPost] = useState({})
    const [postLoading , setPostLoading] = useState(true)
    const id = useParams()
    useEffect(() => {
        fetch(`https://tarmeezacademy.com/api/v1/posts/${id.id}`)
        .then(res => res.json())
        .then(res => setPost(res.data))
        .catch(err => {
          console.log(`Error fetching in post with id : ${id.id} `,err)
        }).finally(()=>{
            console.log(post)
            setPostLoading(false)
        })
    })
  return (
    <div>
      {postLoading? "Loading..." :
        <div>
            <div  className='post'>
                <div className='postHeader'>
                    <div className='icon'><img src={post.author.profile_image} alt=""/></div>
                    <h4 className='username'>{post.author.username}</h4>
                </div>
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
        </div>

      }
    </div>
  )
}
