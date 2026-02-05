 import { createContext, useContext, useState, ReactNode } from "react";
 
 interface User {
   id: string;
   name: string;
   phone: string;
   email?: string;
   role: "user" | "farmer" | "admin";
 }
 
 interface AuthContextType {
   user: User | null;
   isAuthenticated: boolean;
   login: (phone: string, role?: "user" | "farmer" | "admin") => void;
   logout: () => void;
 }
 
 const AuthContext = createContext<AuthContextType | undefined>(undefined);
 
 export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [user, setUser] = useState<User | null>(null);
 
   const login = (phone: string, role: "user" | "farmer" | "admin" = "user") => {
     setUser({
       id: "user-" + Date.now(),
       name: role === "farmer" ? "John Farmer" : role === "admin" ? "Admin User" : "John Doe",
       phone,
       email: role === "admin" ? "admin@AgriValah.com" : undefined,
       role,
     });
   };
 
   const logout = () => {
     setUser(null);
   };
 
   return (
     <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 };
 
 export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
     throw new Error("useAuth must be used within AuthProvider");
   }
   return context;
 };