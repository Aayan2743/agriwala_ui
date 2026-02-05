 import { useState } from "react";
 import { motion } from "framer-motion";
 import { DollarSign, TrendingUp, ShoppingBag, Users, Calendar, BarChart3 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { AdminSidebar, AdminHeader } from "@/components/admin/AdminSidebar";
 
 const stats = [
   { label: "Total Revenue", value: "$145,670", icon: DollarSign, change: "+18%", color: "bg-primary/10 text-primary" },
   { label: "This Month", value: "$23,450", icon: Calendar, change: "+12%", color: "bg-harvest/10 text-harvest" },
   { label: "Total Orders", value: "3,847", icon: ShoppingBag, change: "+23%", color: "bg-leaf/10 text-leaf" },
   { label: "Avg. Order Value", value: "$37.89", icon: TrendingUp, change: "+5%", color: "bg-amber-500/10 text-amber-600" },
 ];
 
 const recentOrders = [
   { id: "ORD-2045", date: "2024-01-25", customer: "Alice Brown", farmer: "Green Valley", amount: 89.97 },
   { id: "ORD-2044", date: "2024-01-25", customer: "Bob Wilson", farmer: "Sunrise Organics", amount: 45.50 },
   { id: "ORD-2043", date: "2024-01-24", customer: "Carol Davis", farmer: "Heritage Farms", amount: 123.00 },
   { id: "ORD-2042", date: "2024-01-24", customer: "David Lee", farmer: "Tropical Gardens", amount: 67.25 },
   { id: "ORD-2041", date: "2024-01-23", customer: "Emily Chen", farmer: "Apple Orchards", amount: 55.00 },
 ];
 
 const AdminRevenue = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [period, setPeriod] = useState("monthly");
 
   return (
     <div className="min-h-screen bg-muted/30">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <AdminHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Revenue"
           subtitle="Financial overview and analytics"
         >
           <Select value={period} onValueChange={setPeriod}>
             <SelectTrigger className="w-[150px]">
               <SelectValue />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="weekly">Weekly</SelectItem>
               <SelectItem value="monthly">Monthly</SelectItem>
               <SelectItem value="yearly">Yearly</SelectItem>
             </SelectContent>
           </Select>
         </AdminHeader>
 
         <main className="p-6">
           {/* Stats */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
             {stats.map((stat, index) => (
               <motion.div
                 key={stat.label}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.1 }}
                 className="glass-card p-6 rounded-xl"
               >
                 <div className="flex items-center justify-between mb-4">
                   <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                     <stat.icon className="w-6 h-6" />
                   </div>
                   <div className="flex items-center gap-1 text-green-500">
                     <TrendingUp className="w-4 h-4" />
                     <span className="text-sm font-medium">{stat.change}</span>
                   </div>
                 </div>
                 <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                 <p className="text-sm text-muted-foreground">{stat.label}</p>
               </motion.div>
             ))}
           </div>
 
           <div className="grid lg:grid-cols-2 gap-6">
             {/* Revenue Chart Placeholder */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="glass-card rounded-xl p-6"
             >
               <h2 className="font-display text-lg font-semibold text-foreground mb-4">Revenue Trend</h2>
               <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                 <div className="text-center">
                   <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                   <p className="text-muted-foreground">Revenue chart visualization</p>
                   <p className="text-sm text-muted-foreground">Connect to backend for live data</p>
                 </div>
               </div>
             </motion.div>
 
             {/* Recent Orders */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="glass-card rounded-xl overflow-hidden"
             >
               <div className="p-6 border-b border-border">
                 <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
               </div>
               <div className="divide-y divide-border">
                 {recentOrders.map((order) => (
                   <div key={order.id} className="p-4 flex items-center justify-between">
                     <div>
                       <p className="font-medium text-foreground">{order.id}</p>
                       <p className="text-sm text-muted-foreground">{order.customer} · {order.farmer}</p>
                     </div>
                     <div className="text-right">
                       <p className="font-semibold text-primary">${order.amount.toFixed(2)}</p>
                       <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
           </div>
 
           {/* Orders Breakdown */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="mt-6 glass-card rounded-xl p-6"
           >
             <h2 className="font-display text-lg font-semibold text-foreground mb-4">Orders by Farmer</h2>
             <div className="space-y-4">
               {[
                 { farmer: "Green Valley Farm", orders: 156, revenue: 4520 },
                 { farmer: "Sunrise Organics", orders: 123, revenue: 3890 },
                 { farmer: "Heritage Farms", orders: 98, revenue: 3200 },
                 { farmer: "Tropical Gardens", orders: 87, revenue: 2890 },
               ].map((item, index) => (
                 <div key={item.farmer} className="flex items-center gap-4">
                   <div className="flex-1">
                     <div className="flex justify-between mb-1">
                       <span className="font-medium text-foreground">{item.farmer}</span>
                       <span className="text-sm text-muted-foreground">{item.orders} orders</span>
                     </div>
                     <div className="h-2 bg-muted rounded-full overflow-hidden">
                       <div
                         className="h-full bg-primary rounded-full transition-all"
                         style={{ width: `${(item.revenue / 4520) * 100}%` }}
                       />
                     </div>
                   </div>
                   <span className="font-semibold text-primary w-24 text-right">${item.revenue.toLocaleString()}</span>
                 </div>
               ))}
             </div>
           </motion.div>
         </main>
       </div>
     </div>
   );
 };
 
 export default AdminRevenue;