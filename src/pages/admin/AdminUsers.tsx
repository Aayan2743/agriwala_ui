 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Eye, Search, Package, User } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Input } from "@/components/ui/input";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import { AdminSidebar, AdminHeader } from "@/components/admin/AdminSidebar";
 
 interface UserData {
   id: number;
   name: string;
   email: string;
   phone: string;
   totalOrders: number;
   totalSpent: number;
   joinedDate: string;
   lastOrder: string;
 }
 
 const mockUsers: UserData[] = [
   { id: 1, name: "Alice Brown", email: "alice@example.com", phone: "+1234567890", totalOrders: 15, totalSpent: 450.50, joinedDate: "2023-03-10", lastOrder: "2024-01-20" },
   { id: 2, name: "Bob Wilson", email: "bob@example.com", phone: "+1234567891", totalOrders: 8, totalSpent: 220.00, joinedDate: "2023-06-15", lastOrder: "2024-01-18" },
   { id: 3, name: "Carol Davis", email: "carol@example.com", phone: "+1234567892", totalOrders: 22, totalSpent: 680.75, joinedDate: "2022-11-20", lastOrder: "2024-01-22" },
   { id: 4, name: "David Lee", email: "david@example.com", phone: "+1234567893", totalOrders: 5, totalSpent: 125.00, joinedDate: "2024-01-05", lastOrder: "2024-01-15" },
 ];
 
 const mockUserOrders = [
   { id: "ORD-001", date: "2024-01-20", total: 45.97, status: "delivered", items: 3 },
   { id: "ORD-002", date: "2024-01-15", total: 28.98, status: "delivered", items: 2 },
   { id: "ORD-003", date: "2024-01-10", total: 67.45, status: "delivered", items: 5 },
 ];
 
 const AdminUsers = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
 
   const filteredUsers = mockUsers.filter((u) =>
     u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     u.email.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   return (
     <div className="min-h-screen bg-muted/30">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <AdminHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Users"
           subtitle={`${mockUsers.length} registered users`}
         />
 
         <main className="p-6">
           {/* Search */}
           <div className="relative mb-6 max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
             <Input
               placeholder="Search users..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10"
             />
           </div>
 
           {/* Users Table */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="glass-card rounded-xl overflow-hidden"
           >
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-muted/50">
                   <tr>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">User</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Phone</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Orders</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Total Spent</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Last Order</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                   {filteredUsers.map((user) => (
                     <tr key={user.id} className="hover:bg-muted/30">
                       <td className="px-6 py-4">
                         <div>
                           <p className="font-medium text-foreground">{user.name}</p>
                           <p className="text-sm text-muted-foreground">{user.email}</p>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-muted-foreground">{user.phone}</td>
                       <td className="px-6 py-4 text-sm font-medium text-foreground">{user.totalOrders}</td>
                       <td className="px-6 py-4 text-sm font-medium text-primary">${user.totalSpent.toFixed(2)}</td>
                       <td className="px-6 py-4 text-sm text-muted-foreground">{new Date(user.lastOrder).toLocaleDateString()}</td>
                       <td className="px-6 py-4">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => setSelectedUser(user)}
                         >
                           <Eye className="w-4 h-4 mr-1" />
                           View
                         </Button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </motion.div>
         </main>
       </div>
 
       {/* User Details Dialog */}
       <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle className="flex items-center gap-2">
               <User className="w-5 h-5 text-primary" />
               {selectedUser?.name}
             </DialogTitle>
           </DialogHeader>
           {selectedUser && (
             <div className="space-y-6">
               <div className="grid sm:grid-cols-2 gap-4 text-sm">
                 <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedUser.email}</span></div>
                 <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selectedUser.phone}</span></div>
                 <div><span className="text-muted-foreground">Joined:</span> <span className="font-medium">{new Date(selectedUser.joinedDate).toLocaleDateString()}</span></div>
                 <div><span className="text-muted-foreground">Total Spent:</span> <span className="font-medium text-primary">${selectedUser.totalSpent.toFixed(2)}</span></div>
               </div>
 
               <div>
                 <h3 className="font-semibold mb-3 flex items-center gap-2">
                   <Package className="w-4 h-4" />
                   Recent Orders ({selectedUser.totalOrders})
                 </h3>
                 <div className="space-y-3">
                   {mockUserOrders.map((order) => (
                     <div key={order.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                       <div>
                         <p className="font-medium">{order.id}</p>
                         <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()} · {order.items} items</p>
                       </div>
                       <div className="text-right">
                         <p className="font-medium text-primary">${order.total.toFixed(2)}</p>
                         <Badge className="bg-green-100 text-green-700">{order.status}</Badge>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>
     </div>
   );
 };
 
 export default AdminUsers;