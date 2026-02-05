 import { useState } from "react";
 import { motion } from "framer-motion";
 import { User, Mail, Phone, MapPin, Save, Lock } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { FarmerSidebar, FarmerHeader } from "@/components/farmer/FarmerSidebar";
 import { useToast } from "@/hooks/use-toast";
 
 const FarmerProfile = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const { toast } = useToast();
 
   const [profile, setProfile] = useState({
     name: "John Farmer",
     email: "john@greenvalleyfarm.com",
     phone: "+1 234 567 8900",
     farmName: "Green Valley Farm",
     address: "123 Farm Road, Springfield, IL 62701",
     bio: "Growing organic vegetables for over 15 years. Committed to sustainable farming practices and delivering fresh produce to families.",
   });
 
   const [passwords, setPasswords] = useState({
     current: "",
     new: "",
     confirm: "",
   });
 
   const handleProfileUpdate = (e: React.FormEvent) => {
     e.preventDefault();
     toast({ title: "Profile updated!", description: "Your changes have been saved." });
   };
 
   const handlePasswordChange = (e: React.FormEvent) => {
     e.preventDefault();
     if (passwords.new !== passwords.confirm) {
       toast({ title: "Passwords don't match", variant: "destructive" });
       return;
     }
     toast({ title: "Password changed!", description: "Your password has been updated." });
     setPasswords({ current: "", new: "", confirm: "" });
   };
 
   return (
     <div className="min-h-screen bg-muted/30">
       <FarmerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <FarmerHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Profile Settings"
           subtitle="Manage your account and farm details"
         />
 
         <main className="p-6">
           <div className="max-w-2xl mx-auto space-y-8">
             {/* Profile Information */}
             <motion.form
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               onSubmit={handleProfileUpdate}
               className="glass-card p-6 sm:p-8 rounded-2xl"
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <User className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-semibold">Personal Information</h2>
               </div>
 
               <div className="space-y-6">
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="name">Full Name</Label>
                     <Input
                       id="name"
                       value={profile.name}
                       onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                     />
                   </div>
                   <div>
                     <Label htmlFor="farmName">Farm Name</Label>
                     <Input
                       id="farmName"
                       value={profile.farmName}
                       onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                     />
                   </div>
                 </div>
 
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="email">Email</Label>
                     <div className="relative">
                       <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input
                         id="email"
                         type="email"
                         value={profile.email}
                         onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                         className="pl-10"
                       />
                     </div>
                   </div>
                   <div>
                     <Label htmlFor="phone">Phone</Label>
                     <div className="relative">
                       <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input
                         id="phone"
                         type="tel"
                         value={profile.phone}
                         onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                         className="pl-10"
                       />
                     </div>
                   </div>
                 </div>
 
                 <div>
                   <Label htmlFor="address">Farm Address</Label>
                   <div className="relative">
                     <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                     <Input
                       id="address"
                       value={profile.address}
                       onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                       className="pl-10"
                     />
                   </div>
                 </div>
 
                 <div>
                   <Label htmlFor="bio">About Your Farm</Label>
                   <Textarea
                     id="bio"
                     value={profile.bio}
                     onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                     rows={4}
                   />
                 </div>
 
                 <Button type="submit" className="bg-primary hover:bg-primary/90">
                   <Save className="w-4 h-4 mr-2" />
                   Save Changes
                 </Button>
               </div>
             </motion.form>
 
             {/* Change Password */}
             <motion.form
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               onSubmit={handlePasswordChange}
               className="glass-card p-6 sm:p-8 rounded-2xl"
             >
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <Lock className="w-5 h-5 text-primary" />
                 </div>
                 <h2 className="font-display text-xl font-semibold">Change Password</h2>
               </div>
 
               <div className="space-y-4">
                 <div>
                   <Label htmlFor="currentPassword">Current Password</Label>
                   <Input
                     id="currentPassword"
                     type="password"
                     value={passwords.current}
                     onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                   />
                 </div>
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label htmlFor="newPassword">New Password</Label>
                     <Input
                       id="newPassword"
                       type="password"
                       value={passwords.new}
                       onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                     />
                   </div>
                   <div>
                     <Label htmlFor="confirmPassword">Confirm Password</Label>
                     <Input
                       id="confirmPassword"
                       type="password"
                       value={passwords.confirm}
                       onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                     />
                   </div>
                 </div>
 
                 <Button type="submit" variant="outline">
                   <Lock className="w-4 h-4 mr-2" />
                   Update Password
                 </Button>
               </div>
             </motion.form>
           </div>
         </main>
       </div>
     </div>
   );
 };
 
 export default FarmerProfile;