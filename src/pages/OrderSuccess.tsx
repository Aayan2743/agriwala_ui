 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { CheckCircle, Package, ArrowRight } from "lucide-react";
 import { Navbar } from "@/components/layout/Navbar";
 import { Footer } from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 
 const OrderSuccess = () => {
   const orderId = `ORD-${Date.now().toString().slice(-6)}`;
 
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       <main className="pt-24 pb-16">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="max-w-lg mx-auto text-center"
           >
             <motion.div
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 0.2, type: "spring" }}
               className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
             >
               <CheckCircle className="w-12 h-12 text-green-600" />
             </motion.div>
 
             <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
               Order Placed Successfully!
             </h1>
             <p className="text-lg text-muted-foreground mb-8">
               Thank you for your order. We'll send you a confirmation email with order details shortly.
             </p>
 
             <div className="glass-card p-6 rounded-2xl mb-8">
               <div className="flex items-center justify-center gap-3 mb-4">
                 <Package className="w-6 h-6 text-primary" />
                 <span className="text-lg font-semibold">Order ID</span>
               </div>
               <p className="text-2xl font-bold text-primary">{orderId}</p>
             </div>
 
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link to="/account/orders">
                 <Button size="lg" className="bg-primary hover:bg-primary/90">
                   View My Orders
                   <ArrowRight className="ml-2 w-5 h-5" />
                 </Button>
               </Link>
               <Link to="/products">
                 <Button size="lg" variant="outline">
                   Continue Shopping
                 </Button>
               </Link>
             </div>
           </motion.div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default OrderSuccess;