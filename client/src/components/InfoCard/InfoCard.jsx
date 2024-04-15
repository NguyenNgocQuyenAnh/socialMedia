import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import {UilPen} from '@iconscout/react-unicons'
import ProfileModel from '../../components/ProfileModel/ProfileModel'
import {useDispatch , useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'
import { logOut } from '../../actions/AuthAction'
const InfoCard = () => {
    const [modelOpened, setModelOpened] = useState(false)
    const [profileUser, setProfileUser] = useState({})
    const dispatch = useDispatch()
    const params = useParams()
    const profileUserId = params.id
    const {user} = useSelector((state)=> state.authReducer.authData)
   
   useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
       
      }
    };
    fetchProfileUser();
  }, [user,profileUserId]);
  
    const handleLogOut = () =>{
        dispatch(logOut())
    }
    
  return (
    <div className="InfoCard">
        <div className="InfoHead">
            <h4>Your Info</h4>
           {user._id === profileUserId ? (
              <div>
              <UilPen onClick={()=> setModelOpened(true)} width='2rem' height='1.5rem' />
              <ProfileModel modelOpened={modelOpened} setModelOpened={setModelOpened} data={user}/>
              </div>
           ): ""}
         </div>

        <div className="info">
            <span>
                <b>Status</b>
            </span>
            <span> {profileUser?.relationship}</span>
        </div>
        <div className="info">
            <span>
                <b>Lives in</b>
            </span>
            <span> {profileUser?.livesin}</span>
        </div>
        <div className="info">
            <span>
                <b>Works at</b>
            </span>
            <span> {profileUser?.worksAt}</span>
        </div>
        <button className="button logout-button" onClick={handleLogOut}>
            Logout
        </button>
    </div>
  )
}

export default InfoCard