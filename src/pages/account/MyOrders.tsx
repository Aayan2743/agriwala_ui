 import { useState } from "react";
 import { motion } from "framer-motion";
 import { Package, Eye, Star, X } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
 import { Textarea } from "@/components/ui/textarea";
 import { mockOrders, Order } from "@/data/orders";
 import { useToast } from "@/hooks/use-toast";
 
 const MyOrders = () => {
   const { toast } = useToast();
   const [orders, setOrders] = useState(mockOrders);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const [reviewModal, setReviewModal] = useState<{ order: Order; itemId: number } | null>(null);
   const [reviewText, setReviewText] = useState("");
   const [reviewRating, setReviewRating] = useState(5);
 
   const getStatusColor = (status: string) => {
     switch (status) {
       case "delivered": return "bg-green-100 text-green-700";
       case "shipped": return "bg-blue-100 text-blue-700";
       case "processing": return "bg-amber-100 text-amber-700";
       case "pending": return "bg-gray-100 text-gray-700";
       case "cancelled": return "bg-red-100 text-red-700";
       default: return "bg-gray-100 text-gray-700";
     }
   };
 
   const handleSubmitReview = () => {
     if (!reviewModal) return;
     toast({ title: "Review submitted!", description: "Thank you for your feedback." });
     setOrders(orders.map(o => 
       o.id === reviewModal.order.id ? { ...o, reviewed: true } : o
     ));
     setReviewModal(null);
     setReviewText("");
     setReviewRating(5);
   };
 
   return (
     <div className="space-y-6">
       <h2 className="font-display text-2xl font-semibold text-foreground">My Orders</h2>
 
       {orders.length === 0 ? (
         <div className="text-center py-16 glass-card rounded-2xl">
           <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
           <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
           <p className="text-muted-foreground">Start shopping to see your orders here.</p>
         </div>
       ) : (
         <div className="space-y-4">
           {orders.map((order, index) => (
             <motion.div
               key={order.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="glass-card rounded-xl overflow-hidden"
             >
               <div className="p-4 sm:p-6 border-b border-border flex flex-wrap items-center justify-between gap-4">
                 <div>
                   <div className="flex items-center gap-3 mb-1">
                     <span className="font-semibold text-foreground">{order.id}</span>
                     <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                   </div>
                   <p className="text-sm text-muted-foreground">
                     Placed on {new Date(order.createdAt).toLocaleDateString()}
                   </p>
                 </div>
                 <div className="flex gap-2">
                   <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                     <Eye className="w-4 h-4 mr-2" />
                     View Details
                   </Button>
                   {order.status === "delivered" && !order.reviewed && (
                     <Button
                       size="sm"
                       className="bg-harvest hover:bg-harvest/90 text-harvest-foreground"
                       onClick={() => setReviewModal({ order, itemId: order.items[0].id })}
                     >
                       <Star className="w-4 h-4 mr-2" />
                       Write Review
                     </Button>
                   )}
                 </div>
               </div>
 
               <div className="p-4 sm:p-6">
                 <div className="flex flex-wrap gap-4">
                   {order.items.map((item) => (
                     <div key={item.id} className="flex items-center gap-3">
                       <img
                         src={item.image}
                         alt={item.name}
                         className="w-16 h-16 rounded-lg object-cover"
                       />
                       <div>
                         <p className="font-medium text-sm">{item.name}</p>
                         <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                       </div>
                     </div>
                   ))}
                 </div>
                 <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                   <span className="text-muted-foreground">{order.items.length} item(s)</span>
                   <span className="font-semibold text-lg text-primary">${order.total.toFixed(2)}</span>
                 </div>
               </div>
             </motion.div>
           ))}
         </div>
       )}
 
       {/* Order Details Modal */}
       <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
         <DialogContent className="max-w-lg">
           <DialogHeader>
             <DialogTitle>Order Details</DialogTitle>
           </DialogHeader>
           {selectedOrder && (
             <div className="space-y-4">
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Order ID</span>
                 <span className="font-medium">{selectedOrder.id}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Status</span>
                 <Badge className={getStatusColor(selectedOrder.status)}>{selectedOrder.status}</Badge>
               </div>
               <div className="flex justify-between">
                 <span className="text-muted-foreground">Payment</span>
                 <span className="font-medium uppercase">{selectedOrder.paymentMethod}</span>
               </div>
               <div className="pt-4 border-t border-border">
                 <p className="text-sm font-medium mb-2">Delivery Address</p>
                 <p className="text-sm text-muted-foreground">
                   {selectedOrder.address.fullName}<br />
                   {selectedOrder.address.street}<br />
                   {selectedOrder.address.city}, {selectedOrder.address.state} {selectedOrder.address.pincode}<br />
                   Phone: {selectedOrder.address.phone}
                 </p>
               </div>
               <div className="pt-4 border-t border-border">
                 <p className="text-sm font-medium mb-3">Items</p>
                 {selectedOrder.items.map((item) => (
                   <div key={item.id} className="flex justify-between items-center py-2">
                     <div className="flex items-center gap-3">
                       <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                       <span className="text-sm">{item.name} x{item.quantity}</span>
                     </div>
                     <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                 ))}
                 <div className="flex justify-between pt-4 border-t border-border mt-4">
                   <span className="font-semibold">Total</span>
                   <span className="font-semibold text-primary">${selectedOrder.total.toFixed(2)}</span>
                 </div>
               </div>
             </div>
           )}
         </DialogContent>
       </Dialog>
 
       {/* Review Modal */}
       <Dialog open={!!reviewModal} onOpenChange={() => setReviewModal(null)}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Write a Review</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <div>
               <p className="text-sm font-medium mb-2">Rating</p>
               <div className="flex gap-1">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button key={star} onClick={() => setReviewRating(star)}>
                     <Star
                       className={`w-8 h-8 ${star <= reviewRating ? "fill-harvest text-harvest" : "text-muted"}`}
                     />
                   </button>
                 ))}
               </div>
             </div>
             <div>
               <p className="text-sm font-medium mb-2">Your Review</p>
               <Textarea
                 value={reviewText}
                 onChange={(e) => setReviewText(e.target.value)}
                 placeholder="Share your experience with this product..."
                 rows={4}
               />
             </div>
             <Button onClick={handleSubmitReview} className="w-full bg-primary hover:bg-primary/90">
               Submit Review
             </Button>
           </div>
         </DialogContent>
       </Dialog>
     </div>
   );
 };
 
 export default MyOrders;