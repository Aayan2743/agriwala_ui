 import { useState } from "react";
 import { motion } from "framer-motion";
 import { useNavigate } from "react-router-dom";
 import { MapPin, CreditCard, Truck, Check, ArrowLeft } from "lucide-react";
 import { Navbar } from "@/components/layout/Navbar";
 import { Footer } from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
 import { useCart } from "@/contexts/CartContext";
 import { useAuth } from "@/contexts/AuthContext";
 
 const Checkout = () => {
   const navigate = useNavigate();
   const { items, total, clearCart } = useCart();
   const { isAuthenticated } = useAuth();
   const [paymentMethod, setPaymentMethod] = useState("cod");
   const [address, setAddress] = useState({
     fullName: "",
     phone: "",
     street: "",
     city: "",
     state: "",
     pincode: "",
   });
 
   // Redirect to login if not authenticated
   if (!isAuthenticated) {
     navigate("/login?redirect=/checkout");
     return null;
   }
 
   if (items.length === 0) {
     navigate("/cart");
     return null;
   }
 
   const shipping = total > 50 ? 0 : 5.99;
   const finalTotal = total + shipping;
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Simulate order placement
     clearCart();
     navigate("/order-success");
   };
 
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       <main className="pt-24 pb-16">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <motion.button
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             onClick={() => navigate("/cart")}
             className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Cart
           </motion.button>
 
           <motion.h1
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8"
           >
             Checkout
           </motion.h1>
 
           <form onSubmit={handleSubmit}>
             <div className="grid lg:grid-cols-3 gap-8">
               {/* Left Column - Address & Payment */}
               <div className="lg:col-span-2 space-y-8">
                 {/* Delivery Address */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="glass-card p-6 rounded-2xl"
                 >
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <MapPin className="w-5 h-5 text-primary" />
                     </div>
                     <h2 className="font-display text-xl font-semibold">Delivery Address</h2>
                   </div>
 
                   <div className="grid sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <Label htmlFor="fullName">Full Name</Label>
                       <Input
                         id="fullName"
                         value={address.fullName}
                         onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="phone">Phone Number</Label>
                       <Input
                         id="phone"
                         type="tel"
                         value={address.phone}
                         onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                         required
                       />
                     </div>
                     <div className="space-y-2 sm:col-span-2">
                       <Label htmlFor="street">Street Address</Label>
                       <Input
                         id="street"
                         value={address.street}
                         onChange={(e) => setAddress({ ...address, street: e.target.value })}
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="city">City</Label>
                       <Input
                         id="city"
                         value={address.city}
                         onChange={(e) => setAddress({ ...address, city: e.target.value })}
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="state">State</Label>
                       <Input
                         id="state"
                         value={address.state}
                         onChange={(e) => setAddress({ ...address, state: e.target.value })}
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="pincode">PIN Code</Label>
                       <Input
                         id="pincode"
                         value={address.pincode}
                         onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                         required
                       />
                     </div>
                   </div>
                 </motion.div>
 
                 {/* Payment Method */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="glass-card p-6 rounded-2xl"
                 >
                   <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                       <CreditCard className="w-5 h-5 text-primary" />
                     </div>
                     <h2 className="font-display text-xl font-semibold">Payment Method</h2>
                   </div>
 
                   <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                     <label
                       className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                         paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border"
                       }`}
                     >
                       <RadioGroupItem value="cod" id="cod" />
                       <div className="flex-1">
                         <div className="flex items-center gap-2">
                           <Truck className="w-5 h-5 text-primary" />
                           <span className="font-medium">Cash on Delivery</span>
                         </div>
                         <p className="text-sm text-muted-foreground mt-1">Pay when you receive your order</p>
                       </div>
                     </label>
 
                     <label
                       className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all mt-3 ${
                         paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border"
                       }`}
                     >
                       <RadioGroupItem value="upi" id="upi" />
                       <div className="flex-1">
                         <div className="flex items-center gap-2">
                           <CreditCard className="w-5 h-5 text-primary" />
                           <span className="font-medium">UPI Payment</span>
                         </div>
                         <p className="text-sm text-muted-foreground mt-1">Pay instantly using UPI</p>
                       </div>
                     </label>
                   </RadioGroup>
                 </motion.div>
               </div>
 
               {/* Right Column - Order Summary */}
               <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="lg:col-span-1"
               >
                 <div className="glass-card p-6 rounded-2xl sticky top-24">
                   <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                     Order Summary
                   </h2>
 
                   <div className="space-y-4 mb-6">
                     {items.map((item) => (
                       <div key={item.id} className="flex gap-3">
                         <img
                           src={item.image}
                           alt={item.name}
                           className="w-16 h-16 rounded-lg object-cover"
                         />
                         <div className="flex-1 min-w-0">
                           <p className="font-medium text-sm truncate">{item.name}</p>
                           <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                         </div>
                         <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                       </div>
                     ))}
                   </div>
 
                   <div className="space-y-3 pt-4 border-t border-border">
                     <div className="flex justify-between text-muted-foreground">
                       <span>Subtotal</span>
                       <span>${total.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-muted-foreground">
                       <span>Shipping</span>
                       <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                     </div>
                     <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                       <span>Total</span>
                       <span className="text-primary">${finalTotal.toFixed(2)}</span>
                     </div>
                   </div>
 
                   <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 mt-6">
                     <Check className="w-5 h-5 mr-2" />
                     Place Order
                   </Button>
                 </div>
               </motion.div>
             </div>
           </form>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Checkout;