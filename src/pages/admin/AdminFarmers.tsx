 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Eye, CheckCircle, XCircle, Search, Package, Tractor } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Input } from "@/components/ui/input";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import { AdminSidebar, AdminHeader } from "@/components/admin/AdminSidebar";
 import { useToast } from "@/hooks/use-toast";
 
 interface Farmer {
   id: number;
   name: string;
   email: string;
   phone: string;
   farmName: string;
   location: string;
   totalProducts: number;
   pendingProducts: number;
   joinedDate: string;
   status: "active" | "pending" | "suspended";
 }
 
 const mockFarmers: Farmer[] = [
   { id: 1, name: "John Smith", email: "john@greenvalley.com", phone: "+1234567890", farmName: "Green Valley Farm", location: "Springfield, IL", totalProducts: 12, pendingProducts: 2, joinedDate: "2023-06-15", status: "active" },
   { id: 2, name: "Sarah Johnson", email: "sarah@sunrise.com", phone: "+1234567891", farmName: "Sunrise Organics", location: "Austin, TX", totalProducts: 8, pendingProducts: 1, joinedDate: "2023-08-20", status: "active" },
   { id: 3, name: "Mike Wilson", email: "mike@tropical.com", phone: "+1234567892", farmName: "Tropical Gardens", location: "Miami, FL", totalProducts: 15, pendingProducts: 0, joinedDate: "2023-04-10", status: "active" },
   { id: 4, name: "Emily Davis", email: "emily@heritage.com", phone: "+1234567893", farmName: "Heritage Farms", location: "Portland, OR", totalProducts: 6, pendingProducts: 3, joinedDate: "2024-01-05", status: "pending" },
 ];
 
 const mockFarmerProducts = [
   { id: 1, name: "Organic Tomatoes", price: 3.99, status: "approved", image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=100" },
   { id: 2, name: "Fresh Spinach", price: 2.99, status: "pending", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100" },
   { id: 3, name: "Sweet Mangoes", price: 5.49, status: "approved", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=100" },
 ];
 
 const AdminFarmers = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
   const { toast } = useToast();
 
   const filteredFarmers = mockFarmers.filter((f) =>
     f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     f.farmName.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   const handleApproveProduct = (productId: number) => {
     toast({ title: "Product approved", description: "The product is now live on the marketplace." });
   };
 
   const handleRejectProduct = (productId: number) => {
     toast({ title: "Product rejected", description: "The farmer has been notified." });
   };
 
   return (
     <div className="min-h-screen bg-muted/30">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <AdminHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Farmers"
           subtitle={`${mockFarmers.length} registered farmers`}
         />
 
         <main className="p-6">
           {/* Search */}
           <div className="relative mb-6 max-w-md">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
             <Input
               placeholder="Search farmers..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-10"
             />
           </div>
 
           {/* Farmers Table */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="glass-card rounded-xl overflow-hidden"
           >
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-muted/50">
                   <tr>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Farmer</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Farm</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Location</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Products</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                   {filteredFarmers.map((farmer) => (
                     <tr key={farmer.id} className="hover:bg-muted/30">
                       <td className="px-6 py-4">
                         <div>
                           <p className="font-medium text-foreground">{farmer.name}</p>
                           <p className="text-sm text-muted-foreground">{farmer.email}</p>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-foreground">{farmer.farmName}</td>
                       <td className="px-6 py-4 text-sm text-muted-foreground">{farmer.location}</td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <span className="text-sm font-medium">{farmer.totalProducts}</span>
                           {farmer.pendingProducts > 0 && (
                             <Badge className="bg-amber-100 text-amber-700">
                               {farmer.pendingProducts} pending
                             </Badge>
                           )}
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <Badge className={
                           farmer.status === "active" ? "bg-green-100 text-green-700" :
                           farmer.status === "pending" ? "bg-amber-100 text-amber-700" :
                           "bg-red-100 text-red-700"
                         }>
                           {farmer.status}
                         </Badge>
                       </td>
                       <td className="px-6 py-4">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => setSelectedFarmer(farmer)}
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
 
       {/* Farmer Details Dialog */}
       <Dialog open={!!selectedFarmer} onOpenChange={() => setSelectedFarmer(null)}>
         <DialogContent className="max-w-2xl">
           <DialogHeader>
             <DialogTitle className="flex items-center gap-2">
               <Tractor className="w-5 h-5 text-primary" />
               {selectedFarmer?.farmName}
             </DialogTitle>
           </DialogHeader>
           {selectedFarmer && (
             <div className="space-y-6">
               <div className="grid sm:grid-cols-2 gap-4 text-sm">
                 <div><span className="text-muted-foreground">Owner:</span> <span className="font-medium">{selectedFarmer.name}</span></div>
                 <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selectedFarmer.email}</span></div>
                 <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selectedFarmer.phone}</span></div>
                 <div><span className="text-muted-foreground">Location:</span> <span className="font-medium">{selectedFarmer.location}</span></div>
                 <div><span className="text-muted-foreground">Joined:</span> <span className="font-medium">{new Date(selectedFarmer.joinedDate).toLocaleDateString()}</span></div>
               </div>
 
               <div>
                 <h3 className="font-semibold mb-3 flex items-center gap-2">
                   <Package className="w-4 h-4" />
                   Products ({mockFarmerProducts.length})
                 </h3>
                 <div className="space-y-3">
                   {mockFarmerProducts.map((product) => (
                     <div key={product.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                       <div className="flex items-center gap-3">
                         <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                         <div>
                           <p className="font-medium">{product.name}</p>
                           <p className="text-sm text-muted-foreground">${product.price}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-2">
                         {product.status === "pending" ? (
                           <>
                             <Button size="sm" onClick={() => handleApproveProduct(product.id)} className="bg-green-500 hover:bg-green-600 text-white">
                               <CheckCircle className="w-4 h-4" />
                             </Button>
                             <Button size="sm" variant="outline" onClick={() => handleRejectProduct(product.id)} className="text-destructive border-destructive hover:bg-destructive/10">
                               <XCircle className="w-4 h-4" />
                             </Button>
                           </>
                         ) : (
                           <Badge className="bg-green-100 text-green-700">Approved</Badge>
                         )}
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
 
 export default AdminFarmers;