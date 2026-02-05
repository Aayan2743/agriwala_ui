 import { Link, useLocation, useNavigate } from "react-router-dom";
 import { 
   LayoutDashboard, Users, Tractor, Package, Tag, DollarSign, 
   Settings, LogOut, ChevronRight, Leaf, Menu 
 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useAuth } from "@/contexts/AuthContext";
 
 const sidebarLinks = [
   { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
   { name: "Farmers", href: "/admin/farmers", icon: Tractor },
   { name: "Users", href: "/admin/users", icon: Users },
   { name: "Products", href: "/admin/products", icon: Package },
   { name: "Categories", href: "/admin/categories", icon: Tag },
   { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
   { name: "Settings", href: "/admin/settings", icon: Settings },
 ];
 
 interface AdminSidebarProps {
   isOpen: boolean;
   onClose: () => void;
 }
 
 export const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
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
         className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-300 lg:translate-x-0 ${
           isOpen ? "translate-x-0" : "-translate-x-full"
         }`}
       >
         <div className="flex flex-col h-full">
           {/* Logo */}
           <div className="p-6 border-b border-primary-foreground/20">
             <Link to="/" className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                 <Leaf className="w-6 h-6" />
               </div>
               <div>
                 <span className="font-display text-xl font-semibold">AgriValah</span>
                 <p className="text-xs text-primary-foreground/70">Admin Panel</p>
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
                       ? "bg-primary-foreground/20"
                       : "hover:bg-primary-foreground/10"
                   }`}
                 >
                   <link.icon className="w-5 h-5" />
                   {link.name}
                 </Link>
               );
             })}
           </nav>
 
           {/* Footer */}
           <div className="p-4 border-t border-primary-foreground/20 space-y-2">
             <Link to="/">
               <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
                 <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                 Back to Website
               </Button>
             </Link>
             <Button
               variant="ghost"
               onClick={handleLogout}
               className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
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
 
 export const AdminHeader = ({ onMenuClick, title, subtitle, children }: { onMenuClick: () => void; title: string; subtitle?: string; children?: React.ReactNode }) => (
   <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4">
     <div className="flex items-center justify-between">
       <div className="flex items-center gap-4">
         <button onClick={onMenuClick} className="lg:hidden p-2 text-foreground">
           <Menu className="w-6 h-6" />
         </button>
         <div>
           <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
           {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
         </div>
       </div>
       {children}
     </div>
   </header>
 );