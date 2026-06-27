import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import './profile.css'
export default function Profile() {
    const {id} = useParams();
     const baseApi = 'https://tarmeezacademy.com/api/v1';
      const [profile , setProfile] = useState({})
      const [profileLoading , setProfileLoading] = useState(true)
      useEffect(() => {
        fetch(`${baseApi}/users/${id}`)
        .then(res => res.json())
        .then(res => setProfile(res.data))
        .catch(err => {
          console.log("Error fetching profile:",err)
        }).finally(() => setProfileLoading(false))
      }, [id])
  return (
    <div>
      {profileLoading? "Loading..." :
        <div className='profile'>
            <div className='profileHeader'>
                <div className='profileIcon'>
                    <div className='icon'><img src={profile.profile_image} alt=""/></div>
                    <h4 className='username'>{profile.username}</h4>
                </div>
                <h4 className='email'>{profile.email}</h4>
            </div>
            <div className='profileBody'>
                <h4 className='name'>name : {profile.name}</h4>
                <div className='comments-posts'>
                    <h4 className='email'>({profile.comments_count})<span> Comments</span></h4>
                    <h4 className='email'>({profile.posts_count})<span> Posts</span></h4>
                </div>
            </div>
        </div>
      }
    </div>
  )
}
