import React from 'react'
import { useSelector } from 'react-redux';


function ProfileHeader() {

    const userData = useSelector((state)=> state.auth.userData);

    const fullName = userData?.fullName || "Boot Reader One"
  return (
    <div>

    </div>
  )
}

export default ProfileHeader