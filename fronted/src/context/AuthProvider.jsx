// context Api to manage state globaaly ek cheez ko har jagah hum use kr sake

import { createContext, useContext, useState } from "react";
import cookies from "js-cookie"

export const AuthContext=createContext()

 export const AuthProvider=({children})=>{
    const intialuserState= cookies.get("jwt") || localStorage.getItem("chatApp")

    const[authUser,setAuthUser]= useState(intialuserState ? JSON.parse(intialuserState): undefined);

    return(
        <AuthContext.Provider value={[authUser,setAuthUser]}>
            {children}

        </AuthContext.Provider>
    )

}

export const useAuth= ()=>useContext(AuthContext);