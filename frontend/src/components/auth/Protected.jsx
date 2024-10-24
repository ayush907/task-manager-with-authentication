import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = ({children , islogIn, redirect="/login"}) => {
  if(islogIn){
    return children ? children : <Outlet/>
  }
  else{
    return <Navigate to={redirect} />
  }
}

export default Protected
