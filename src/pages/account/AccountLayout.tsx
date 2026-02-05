 import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
 import { Package, Heart, LogOut, User, ChevronRight } from "lucide-react";
 import { Navbar } from "@/components/layout/Navbar";
 import { Footer } from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { useAuth } from "@/contexts/AuthContext";
 
 const accountLinks = [
   { name: "My Orders", href: "/account/orders", icon: Package },
   { name: "Wishlist", href: "/account/wishlist", icon: Heart },
 ];
 
 const AccountLayout = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { user, logout } = useAuth();
 
   const handleLogout = () => {
     logout();
     navigate("/");
   };
 
   if (!user) {
     navigate("/login");
     return null;
   }
 
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       <main className="pt-24 pb-16">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8"
           >
             My Account
           </motion.h1>
 
           <div className="grid lg:grid-cols-4 gap-8">
             {/* Sidebar */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:col-span-1"
             >
               <div className="glass-card rounded-2xl overflow-hidden sticky top-24">
                 {/* User Info */}
                 <div className="p-6 border-b border-border">
                   <div className="flex items-center gap-4">
                     <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                       <User className="w-7 h-7 text-primary" />
                     </div>
                     <div>
                       <p className="font-semibold text-foreground">{user.name}</p>
                       <p className="text-sm text-muted-foreground">{user.phone}</p>
                     </div>
                   </div>
                 </div>
 
                 {/* Navigation */}
                 <nav className="p-4 space-y-1">
                   {accountLinks.map((link) => {
                     const isActive = location.pathname === link.href;
                     return (
                       <Link
                         key={link.name}
                         to={link.href}
                         className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                           isActive
                             ? "bg-primary text-primary-foreground"
                             : "text-muted-foreground hover:bg-muted"
                         }`}
                       >
                         <div className="flex items-center gap-3">
                           <link.icon className="w-5 h-5" />
                           {link.name}
                         </div>
                         <ChevronRight className="w-4 h-4" />
                       </Link>
                     );
                   })}
                 </nav>
 
                 {/* Logout */}
                 <div className="p-4 border-t border-border">
                   <Button
                     variant="ghost"
                     onClick={handleLogout}
                     className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                   >
                     <LogOut className="w-5 h-5 mr-3" />
                     Logout
                   </Button>
                 </div>
               </div>
             </motion.div>
 
             {/* Content */}
             <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="lg:col-span-3"
             >
               <Outlet />
             </motion.div>
           </div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default AccountLayout;