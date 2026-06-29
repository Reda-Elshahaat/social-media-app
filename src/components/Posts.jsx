import React, { useEffect ,useState } from 'react'
import Post from './Post'
export default function Posts() {
  const baseApi = 'https://tarmeezacademy.com/api/v1';
  const [posts , setPosts] = useState([])
  const [postsLoading , setPostsLoading] = useState(true)
  useEffect(() => {
    fetch(`${baseApi}/posts?limit=50`)
    .then(res => res.json())
    .then(res => setPosts(res.data))
    .catch(err => {
      console.log("Error fetching posts:",err)
    }).finally(() => setPostsLoading(false))
  }, [])
  return (
    <div>
      {postsLoading? "Loading..." :
        posts.map(post => (
          <Post key={post.id} post={post}/>
        ))
      }
    </div>
  )
}
