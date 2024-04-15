import React,{useState} from 'react'
import './User.css'
import {useDispatch} from 'react-redux'
import { followUser, unFollowUser } from '../../actions/UserAction'
import { useSelector } from 'react-redux'
const User = ({person}) => {
  const serverpublic = process.env.REACT_APP_PUBLIC_FOLDER
  const {user} = useSelector((state) => state.authReducer.authData)
  const [following, setFollowing] = useState(person.followers.includes(user.following))
  const dispatch = useDispatch()
  const handleFollow = () =>{
    following ?
    dispatch(unFollowUser(person._id,user)):
    dispatch(followUser(person._id,user))
    setFollowing((prev)=>!prev)
  }
  return (
    <div className="follower">
    <div>
      <img src={person.profilePicture ? serverpublic + person.profilePicture : serverpublic + "profile.png"} alt="" className="followerImage" />
      <div className="name">
        <span>{person.firstname}</span>
        <span>{person.username}</span>
      </div>
    </div>
    <button className={ following ? "button fc-button UnfollowButton" : "button fc-button" }
         onClick={handleFollow}
        >{following ? "Unfollow" : "Follow"}</button>
  </div>
  )
}

export default User