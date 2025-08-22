import axios from "axios"
import api from "../config/axiosConfig"

const login =async ()=>
{
   const res= await api.post("/auth/login");
   const token = res.data.token;
   const role = res.data.role;
   localStorage.setItem("token",token)
   localStorage.setItem("role",role)
   console.log(token,role);
}