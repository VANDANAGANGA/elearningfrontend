import React from 'react';
import { Navigate } from "react-router-dom"
import { authService } from "../authService"

export const AdminPrivateRoute = ({children}) => {
    
   return (authService.getUserRole() === 1) ? children : <Navigate to="/" />
}

export const StudentPrivateRoute = ({children}) => {
    
   return (authService.getUserRole() === 2) ? children : <Navigate to="/" />
}

export const TeacherPrivateRoute = ({children}) => {
    
   return (authService.getUserRole() === 3) ? children : <Navigate to="/" />
}