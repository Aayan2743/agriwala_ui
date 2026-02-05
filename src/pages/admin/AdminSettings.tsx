 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Settings, User, Lock, Bell, Save } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Switch } from "@/components/ui/switch";
 import { AdminSidebar, AdminHeader } from "@/components/admin/AdminSidebar";
 import { useToast } from "@/hooks/use-toast";
 
 const AdminSettings = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const { toast } = useToast();
 
   const [profile, setProfile] = useState({
     name: "Admin User",
     email: "admin@AgriValah.com",
   });
 
   const [notifications, setNotifications] = useState({
     newOrders: true,
     newFarmers: true,
     pendingProducts: true,
     lowStock: false,
   });
 
   const handleSaveProfile = () => {
     toast({ title: "Profile updated", description: "Your changes have been saved." });
   };
 
   return (
     <div className="min-h-screen bg-muted/30">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <AdminHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Settings"
           subtitle="Manage your admin preferences"
         />
 
         <main className="p-6">
           <div className="max-w-2xl space-y-8">
             {/* Profile Settings */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-card p-6 rounded-2xl"
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <User className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-semibold">Profile</h2>
               </div>
 
               <div className="space-y-4">
                 <div>
                   <Label htmlFor="name">Full Name</Label>
                   <Input
                     id="name"
                     value={profile.name}
                     onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                   />
                 </div>
                 <div>
                   <Label htmlFor="email">Email</Label>
                   <Input
                     id="email"
                     type="email"
                     value={profile.email}
                     onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                   />
                 </div>
                 <Button onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                   <Save className="w-4 h-4 mr-2" />
                   Save Changes
                 </Button>
               </div>
             </motion.div>
 
             {/* Notification Settings */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="glass-card p-6 rounded-2xl"
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <Bell className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-semibold">Notifications</h2>
               </div>
 
               <div className="space-y-4">
                 <div className="flex items-center justify-between py-2">
                   <div>
                     <p className="font-medium">New Orders</p>
                     <p className="text-sm text-muted-foreground">Get notified when a new order is placed</p>
                   </div>
                   <Switch
                     checked={notifications.newOrders}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between py-2">
                   <div>
                     <p className="font-medium">New Farmer Registrations</p>
                     <p className="text-sm text-muted-foreground">Get notified when a new farmer registers</p>
                   </div>
                   <Switch
                     checked={notifications.newFarmers}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, newFarmers: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between py-2">
                   <div>
                     <p className="font-medium">Pending Product Approvals</p>
                     <p className="text-sm text-muted-foreground">Get notified about products awaiting approval</p>
                   </div>
                   <Switch
                     checked={notifications.pendingProducts}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, pendingProducts: checked })}
                   />
                 </div>
                 <div className="flex items-center justify-between py-2">
                   <div>
                     <p className="font-medium">Low Stock Alerts</p>
                     <p className="text-sm text-muted-foreground">Get notified when products are running low</p>
                   </div>
                   <Switch
                     checked={notifications.lowStock}
                     onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                   />
                 </div>
               </div>
             </motion.div>
 
             {/* Change Password */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="glass-card p-6 rounded-2xl"
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <Lock className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-semibold">Security</h2>
               </div>
 
               <div className="space-y-4">
                 <div>
                   <Label htmlFor="currentPassword">Current Password</Label>
                   <Input id="currentPassword" type="password" />
                 </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="newPassword">New Password</Label>
                     <Input id="newPassword" type="password" />
                   </div>
                   <div>
                     <Label htmlFor="confirmPassword">Confirm Password</Label>
                     <Input id="confirmPassword" type="password" />
                   </div>
                 </div>
                 <Button variant="outline">
                   <Lock className="w-4 h-4 mr-2" />
                   Update Password
                 </Button>
               </div>
             </motion.div>
           </div>
         </main>
       </div>
     </div>
   );
 };
 
 export default AdminSettings;