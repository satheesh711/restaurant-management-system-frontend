import api from "../config/axiosConfig";

export const login = async (userDetails) => {
   try {
      const res = await api.post("/auth/login", userDetails, { withCredentials: true });
      const { token, role } = res.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      alert("User Logged In successfully");
   } catch (error) {
      alert("Login failed, Invalid Username or Password");
      console.error("Login failed:", error);
   }
}

export const logout = async () => {
   try{
      const res = await api.post("/auth/logout", {}, { withCredentials: true });
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      alert("User Logged Out successfully");
   } catch (error) {
      alert("Logout failed");
      console.error("Logout failed:", error);
   }
}
