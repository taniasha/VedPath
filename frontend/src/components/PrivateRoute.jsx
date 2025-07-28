import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function PrivateRoute({children}) {
    const {isLoggedIn} = useAuth();
    return ( 
       isLoggedIn ? children : <Navigate to = "/login"/> 
    )
};

//✅ No <> </> fragment is needed unless you're returning 
// multiple elements. Since you're returning one conditional 
// expression, it's clean and correct this way.