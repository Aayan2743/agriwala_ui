 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { LayoutDashboard, Package, Upload, User, LogOut, ChevronRight, Leaf, Menu, X } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useAuth } from "@/contexts/AuthContext";
 import { useState } from "react";
 
 const sidebarLinks = [
   { name: "Dashboard", href: "/farmer/dashboard", icon: LayoutDashboard },
   { name: "Upload Product", href: "/farmer/upload-product", icon: Upload },
   { name: "My Products", href: "/farmer/my-products", icon: Package },
   { name: "Profile", href: "/farmer/profile", icon: User },
 ];
 
 interface FarmerSidebarProps {
   isOpen: boolean;
   onClose: () => void;
 }
 
 export const FarmerSidebar = ({ isOpen, onClose }: FarmerSidebarProps) => {
   const location = useLocation();
   const navigate = useNavigate();
   const { logout } = useAuth();
 
   const handleLogout = () => {
     logout();
     navigate("/");
   };
 
   return (
     <>
       <aside
         className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
       >
         <div className="flex flex-col h-full">
           {/* Logo */}
           <div className="p-6 border-b border-border">
             <Link to="/" className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                 <Leaf className="w-6 h-6 text-primary-foreground" />
               </div>
               <div>
                 <span className="font-display text-xl font-semibold text-foreground">AgriValah</span>
                 <p className="text-xs text-muted-foreground">Farmer Portal</p>
               </div>
             </Link>
           </div>
 
           {/* Navigation */}
           <nav className="flex-1 p-4 space-y-1">
             {sidebarLinks.map((link) => {
               const isActive = location.pathname === link.href;
               return (
                 <Link
                   key={link.name}
                   to={link.href}
                   onClick={onClose}
                   className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                     isActive
                       ? "bg-primary text-primary-foreground"
                       : "text-muted-foreground hover:bg-muted"
                   }`}
                 >
                   <link.icon className="w-5 h-5" />
                   {link.name}
                 </Link>
               );
             })}
           </nav>
 
           {/* Footer */}
           <div className="p-4 border-t border-border space-y-2">
             <Link to="/">
               <Button variant="outline" className="w-full justify-start">
                 <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                 Back to Website
               </Button>
             </Link>
             <Button
               variant="ghost"
               onClick={handleLogout}
               className="w-full justify-start text-destructive hover:text-destructive"
             >
               <LogOut className="w-4 h-4 mr-2" />
               Logout
             </Button>
           </div>
         </div>
       </aside>
 
       {/* Mobile Overlay */}
       {isOpen && (
         <div
           className="fixed inset-0 bg-background/80 z-40 lg:hidden"
           onClick={onClose}
         />
       )}
     </>
   );
 };
 
 export const FarmerHeader = ({ onMenuClick, title, subtitle }: { onMenuClick: () => void; title: string; subtitle?: string }) => (
   <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4">
     <div className="flex items-center gap-4">
       <button onClick={onMenuClick} className="lg:hidden p-2 text-foreground">
         <Menu className="w-6 h-6" />
       </button>
       <div>
         <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
         {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
       </div>
     </div>
   </header>
 );