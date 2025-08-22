import axios from "axios"
import api from "../config/axiosConfig"

export const login =async (userDetails)=>
{
   const res= await api.post("/auth/login", userDetails);
   console.log(res);
   const token = res.data.data.token;
   const role = res.data.data.role;
   localStorage.setItem("token",token)
   localStorage.setItem("role",role)
   console.log(token,role);
}

export const logout =async ()=>
{
   const res= await api.post("/auth/logout");
   console.log(res);
   localStorage.removeItem("token");
   localStorage.removeItem("role");
}