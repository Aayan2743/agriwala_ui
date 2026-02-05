 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Edit, Trash2, Search, Eye, CheckCircle, XCircle, Filter } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Input } from "@/components/ui/input";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
 import { AdminSidebar, AdminHeader } from "@/components/admin/AdminSidebar";
 import { useToast } from "@/hooks/use-toast";
 
 interface Product {
   id: number;
   name: string;
   category: string;
   price: number;
   stock: number;
   farmer: string;
   status: "approved" | "pending" | "rejected";
   sales: number;
   image: string;
 }
 
 const mockProducts: Product[] = [
   { id: 1, name: "Organic Tomatoes", category: "Vegetables", price: 3.99, stock: 150, farmer: "Green Valley Farm", status: "approved", sales: 156, image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=100" },
   { id: 2, name: "Fresh Spinach", category: "Vegetables", price: 2.99, stock: 80, farmer: "Sunrise Organics", status: "pending", sales: 0, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100" },
   { id: 3, name: "Sweet Mangoes", category: "Fruits", price: 5.49, stock: 200, farmer: "Tropical Gardens", status: "approved", sales: 234, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=100" },
   { id: 4, name: "Brown Rice", category: "Grains", price: 7.49, stock: 500, farmer: "Heritage Farms", status: "approved", sales: 78, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100" },
   { id: 5, name: "Organic Avocados", category: "Fruits", price: 4.99, stock: 120, farmer: "Green Valley Farm", status: "pending", sales: 0, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100" },
 ];
 
 const categories = ["All", "Vegetables", "Fruits", "Grains", "Dairy", "Herbs"];
 
 const AdminProducts = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [products, setProducts] = useState(mockProducts);
   const [searchQuery, setSearchQuery] = useState("");
   const [categoryFilter, setCategoryFilter] = useState("All");
   const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);
   const { toast } = useToast();
 
   const filteredProducts = products.filter((p) => {
     const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.farmer.toLowerCase().includes(searchQuery.toLowerCase());
     const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
     return matchesSearch && matchesCategory;
   });
 
   const handleApprove = (id: number) => {
     setProducts(products.map(p => p.id === id ? { ...p, status: "approved" as const } : p));
     toast({ title: "Product approved" });
   };
 
   const handleReject = (id: number) => {
     setProducts(products.map(p => p.id === id ? { ...p, status: "rejected" as const } : p));
     toast({ title: "Product rejected" });
   };
 
   const handleDelete = () => {
     if (!deleteConfirm) return;
     setProducts(products.filter(p => p.id !== deleteConfirm.id));
     toast({ title: "Product deleted" });
     setDeleteConfirm(null);
   };
 
   const getStatusBadge = (status: string) => {
     switch (status) {
       case "approved": return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
       case "pending": return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
       case "rejected": return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
       default: return null;
     }
   };
 
   return (
     <div className="min-h-screen bg-muted/30">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <AdminHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Products"
           subtitle={`${products.length} total products`}
         />
 
         <main className="p-6">
           {/* Filters */}
           <div className="flex flex-col sm:flex-row gap-4 mb-6">
             <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 placeholder="Search products or farmers..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10"
               />
             </div>
             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
               <SelectTrigger className="w-[180px]">
                 <Filter className="w-4 h-4 mr-2" />
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 {categories.map((cat) => (
                   <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>
 
           {/* Products Table */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="glass-card rounded-xl overflow-hidden"
           >
             <div className="overflow-x-auto">
               <table className="w-full">
                 <thead className="bg-muted/50">
                   <tr>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Product</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Category</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Farmer</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Price</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Stock</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Sales</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-border">
                   {filteredProducts.map((product) => (
                     <tr key={product.id} className="hover:bg-muted/30">
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                           <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                           <span className="font-medium text-foreground">{product.name}</span>
                         </div>
                       </td>
                       <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                       <td className="px-6 py-4 text-sm text-muted-foreground">{product.farmer}</td>
                       <td className="px-6 py-4 text-sm font-medium text-foreground">${product.price.toFixed(2)}</td>
                       <td className="px-6 py-4 text-sm">{product.stock}</td>
                       <td className="px-6 py-4 text-sm">{product.sales}</td>
                       <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                       <td className="px-6 py-4">
                         <div className="flex gap-1">
                           {product.status === "pending" && (
                             <>
                               <Button size="sm" variant="ghost" onClick={() => handleApprove(product.id)} className="text-green-600 hover:text-green-700 hover:bg-green-50">
                                 <CheckCircle className="w-4 h-4" />
                               </Button>
                               <Button size="sm" variant="ghost" onClick={() => handleReject(product.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                 <XCircle className="w-4 h-4" />
                               </Button>
                             </>
                           )}
                           <Button size="sm" variant="ghost">
                             <Edit className="w-4 h-4" />
                           </Button>
                           <Button size="sm" variant="ghost" onClick={() => setDeleteConfirm(product)} className="text-destructive hover:text-destructive">
                             <Trash2 className="w-4 h-4" />
                           </Button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </motion.div>
         </main>
       </div>
 
       {/* Delete Confirmation */}
       <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Delete Product</DialogTitle>
           </DialogHeader>
           <p className="text-muted-foreground">
             Are you sure you want to delete "{deleteConfirm?.name}"?
           </p>
           <DialogFooter>
             <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
             <Button variant="destructive" onClick={handleDelete}>Delete</Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
     </div>
   );
 };
 
 export default AdminProducts;