 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { Edit, Trash2, Plus, Eye, CheckCircle, AlertCircle, XCircle, Search } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Input } from "@/components/ui/input";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
 import { FarmerSidebar, FarmerHeader } from "@/components/farmer/FarmerSidebar";
 import { useToast } from "@/hooks/use-toast";
 
 interface FarmerProduct {
   id: number;
   name: string;
   category: string;
   price: number;
   offerPrice: number;
   stock: number;
   status: "approved" | "pending" | "rejected";
   sales: number;
   image: string;
 }
 
 const initialProducts: FarmerProduct[] = [
   { id: 1, name: "Organic Tomatoes", category: "Vegetables", price: 4.99, offerPrice: 3.99, stock: 150, status: "approved", sales: 156, image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=200" },
   { id: 2, name: "Fresh Spinach", category: "Vegetables", price: 3.49, offerPrice: 2.99, stock: 80, status: "pending", sales: 0, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200" },
   { id: 3, name: "Sweet Mangoes", category: "Fruits", price: 6.99, offerPrice: 5.49, stock: 200, status: "approved", sales: 234, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=200" },
   { id: 4, name: "Brown Rice", category: "Grains", price: 8.99, offerPrice: 7.49, stock: 0, status: "rejected", sales: 0, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200" },
 ];
 
 const FarmerMyProducts = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [products, setProducts] = useState(initialProducts);
   const [searchQuery, setSearchQuery] = useState("");
   const [deleteConfirm, setDeleteConfirm] = useState<FarmerProduct | null>(null);
   const { toast } = useToast();
 
   const getStatusBadge = (status: string) => {
     switch (status) {
       case "approved":
         return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
       case "pending":
         return <Badge className="bg-amber-100 text-amber-700"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
       case "rejected":
         return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
       default:
         return null;
     }
   };
 
   const handleDelete = () => {
     if (!deleteConfirm) return;
     setProducts(products.filter((p) => p.id !== deleteConfirm.id));
     toast({ title: "Product deleted", description: `${deleteConfirm.name} has been removed.` });
     setDeleteConfirm(null);
   };
 
   const filteredProducts = products.filter((p) =>
     p.name.toLowerCase().includes(searchQuery.toLowerCase())
   );
 
   return (
     <div className="min-h-screen bg-muted/30">
       <FarmerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <FarmerHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="My Products"
           subtitle={`${products.length} products in your store`}
         />
 
         <main className="p-6">
           {/* Actions Bar */}
           <div className="flex flex-col sm:flex-row gap-4 mb-6">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
               <Input
                 placeholder="Search products..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10"
               />
             </div>
             <Link to="/farmer/upload-product">
               <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                 <Plus className="w-4 h-4 mr-2" />
                 Add Product
               </Button>
             </Link>
           </div>
 
           {/* Products Grid */}
           {filteredProducts.length === 0 ? (
             <div className="text-center py-16 glass-card rounded-2xl">
               <p className="text-muted-foreground">No products found.</p>
             </div>
           ) : (
             <div className="grid gap-4">
               {filteredProducts.map((product, index) => (
                 <motion.div
                   key={product.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.05 }}
                   className="glass-card p-4 rounded-xl flex flex-col sm:flex-row gap-4"
                 >
                   <img
                     src={product.image}
                     alt={product.name}
                     className="w-full sm:w-24 h-40 sm:h-24 rounded-lg object-cover"
                   />
                   <div className="flex-1">
                     <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                       <div>
                         <h3 className="font-semibold text-foreground">{product.name}</h3>
                         <p className="text-sm text-muted-foreground">{product.category}</p>
                       </div>
                       {getStatusBadge(product.status)}
                     </div>
                     <div className="flex flex-wrap gap-4 text-sm mb-3">
                       <div>
                         <span className="text-muted-foreground">Price: </span>
                         <span className="font-medium">${product.offerPrice}</span>
                         {product.offerPrice < product.price && (
                           <span className="text-muted-foreground line-through ml-1">${product.price}</span>
                         )}
                       </div>
                       <div>
                         <span className="text-muted-foreground">Stock: </span>
                         <span className={`font-medium ${product.stock === 0 ? "text-destructive" : ""}`}>
                           {product.stock}
                         </span>
                       </div>
                       <div>
                         <span className="text-muted-foreground">Sales: </span>
                         <span className="font-medium">{product.sales}</span>
                       </div>
                     </div>
                     <div className="flex gap-2">
                       <Button size="sm" variant="outline">
                         <Eye className="w-4 h-4 mr-1" />
                         View
                       </Button>
                       <Button size="sm" variant="outline">
                         <Edit className="w-4 h-4 mr-1" />
                         Edit
                       </Button>
                       <Button
                         size="sm"
                         variant="outline"
                         onClick={() => setDeleteConfirm(product)}
                         className="text-destructive hover:bg-destructive/10"
                       >
                         <Trash2 className="w-4 h-4" />
                       </Button>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
           )}
         </main>
       </div>
 
       {/* Delete Confirmation Dialog */}
       <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Delete Product</DialogTitle>
           </DialogHeader>
           <p className="text-muted-foreground">
             Are you sure you want to delete "{deleteConfirm?.name}"? This action cannot be undone.
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
 
 export default FarmerMyProducts;