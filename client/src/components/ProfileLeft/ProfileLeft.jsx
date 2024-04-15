import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowsCard from '../FollowerCard/FollowsCard'
import InfoCard from '../../components/InfoCard/InfoCard'
const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <InfoCard/>
        <FollowsCard/>
    </div>
  )
}

export default ProfileLeft