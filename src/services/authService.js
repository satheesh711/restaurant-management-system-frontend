import axios from "axios"
import api from "../config/axiosConfig"

export const login =async (userDetails)=>
{
   const res= await api.post("/auth/login", userDetails, { withCredentials: true });
   localStorage.setItem("token",token)
   localStorage.setItem("role",role)
}

export const logout =async ()=>
{
   api.post("/auth/logout", {}, { withCredentials: true });
   localStorage.removeItem("token");
   localStorage.removeItem("role");
}