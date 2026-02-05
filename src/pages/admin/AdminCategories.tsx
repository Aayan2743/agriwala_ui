 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Plus, Edit, Trash2, Tag, Check, X } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
 import { AdminSidebar, AdminHeader } from "@/components/admin/AdminSidebar";
 import { useToast } from "@/hooks/use-toast";
 
 interface Category {
   id: number;
   name: string;
   productCount: number;
   icon: string;
 }
 
 const initialCategories: Category[] = [
   { id: 1, name: "Vegetables", productCount: 45, icon: "🥬" },
   { id: 2, name: "Fruits", productCount: 32, icon: "🍎" },
   { id: 3, name: "Grains", productCount: 18, icon: "🌾" },
   { id: 4, name: "Dairy", productCount: 12, icon: "🥛" },
   { id: 5, name: "Herbs", productCount: 8, icon: "🌿" },
   { id: 6, name: "Organic", productCount: 56, icon: "🌱" },
 ];
 
 const AdminCategories = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [categories, setCategories] = useState(initialCategories);
   const [addModal, setAddModal] = useState(false);
   const [editModal, setEditModal] = useState<Category | null>(null);
   const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);
   const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
   const { toast } = useToast();
 
   const handleAdd = () => {
     if (!newCategory.name.trim()) return;
     setCategories([
       ...categories,
       { id: Date.now(), name: newCategory.name, productCount: 0, icon: newCategory.icon || "📦" }
     ]);
     toast({ title: "Category added" });
     setNewCategory({ name: "", icon: "" });
     setAddModal(false);
   };
 
   const handleEdit = () => {
     if (!editModal) return;
     setCategories(categories.map(c => c.id === editModal.id ? editModal : c));
     toast({ title: "Category updated" });
     setEditModal(null);
   };
 
   const handleDelete = () => {
     if (!deleteConfirm) return;
     setCategories(categories.filter(c => c.id !== deleteConfirm.id));
     toast({ title: "Category deleted" });
     setDeleteConfirm(null);
   };
 
   return (
     <div className="min-h-screen bg-muted/30">
       <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
       <div className="lg:ml-64">
         <AdminHeader
           onMenuClick={() => setSidebarOpen(true)}
           title="Categories"
           subtitle="Manage product categories"
         >
           <Button onClick={() => setAddModal(true)} className="bg-primary hover:bg-primary/90">
             <Plus className="w-4 h-4 mr-2" />
             Add Category
           </Button>
         </AdminHeader>
 
         <main className="p-6">
           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {categories.map((category, index) => (
               <motion.div
                 key={category.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: index * 0.05 }}
                 className="glass-card p-6 rounded-xl"
               >
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                       {category.icon}
                     </div>
                     <div>
                       <h3 className="font-semibold text-foreground">{category.name}</h3>
                       <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                     </div>
                   </div>
                 </div>
                 <div className="flex gap-2">
                   <Button
                     size="sm"
                     variant="outline"
                     onClick={() => setEditModal(category)}
                     className="flex-1"
                   >
                     <Edit className="w-4 h-4 mr-1" />
                     Edit
                   </Button>
                   <Button
                     size="sm"
                     variant="outline"
                     onClick={() => setDeleteConfirm(category)}
                     className="text-destructive hover:bg-destructive/10"
                   >
                     <Trash2 className="w-4 h-4" />
                   </Button>
                 </div>
               </motion.div>
             ))}
           </div>
         </main>
       </div>
 
       {/* Add Category Modal */}
       <Dialog open={addModal} onOpenChange={setAddModal}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Add Category</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div>
               <label className="text-sm font-medium">Category Name</label>
               <Input
                 value={newCategory.name}
                 onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                 placeholder="e.g., Vegetables"
               />
             </div>
             <div>
               <label className="text-sm font-medium">Icon (Emoji)</label>
               <Input
                 value={newCategory.icon}
                 onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                 placeholder="e.g., 🥬"
               />
             </div>
           </div>
           <DialogFooter>
             <Button variant="outline" onClick={() => setAddModal(false)}>Cancel</Button>
             <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">Add Category</Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
 
       {/* Edit Category Modal */}
       <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Edit Category</DialogTitle>
           </DialogHeader>
           {editModal && (
             <div className="space-y-4">
               <div>
                 <label className="text-sm font-medium">Category Name</label>
                 <Input
                   value={editModal.name}
                   onChange={(e) => setEditModal({ ...editModal, name: e.target.value })}
                 />
               </div>
               <div>
                 <label className="text-sm font-medium">Icon (Emoji)</label>
                 <Input
                   value={editModal.icon}
                   onChange={(e) => setEditModal({ ...editModal, icon: e.target.value })}
                 />
               </div>
             </div>
           )}
           <DialogFooter>
             <Button variant="outline" onClick={() => setEditModal(null)}>Cancel</Button>
             <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90">Save Changes</Button>
           </DialogFooter>
         </DialogContent>
       </Dialog>
 
       {/* Delete Confirmation */}
       <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Delete Category</DialogTitle>
           </DialogHeader>
           <p className="text-muted-foreground">
             Are you sure you want to delete "{deleteConfirm?.name}"? This will affect {deleteConfirm?.productCount} products.
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
 
 export default AdminCategories;