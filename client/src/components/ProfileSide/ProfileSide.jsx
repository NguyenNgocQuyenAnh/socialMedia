import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import './ProfileSide.css'
import FollowsCard from '../FollowerCard/FollowsCard'
const ProfileSide = () => {
    return (
        <div className='ProfileSide'>
            <LogoSearch/>
            <ProfileCard location="homepage"/>
            <FollowsCard/>
        </div>
    )
}
export default ProfileSide