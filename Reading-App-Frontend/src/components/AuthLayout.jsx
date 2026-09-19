import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'


export default function Protected({children, authentication = "true"}){
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(authStatus == null) return

         if (authentication !== authStatus) {
            navigate(authentication ? "/login" : "/", { replace: true })
            return
        }
    },[authStatus, navigate, authentication])

    return <>{children}</>
}