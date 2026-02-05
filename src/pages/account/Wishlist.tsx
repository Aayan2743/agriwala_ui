 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { Heart, ShoppingCart, Trash2 } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { useWishlist } from "@/contexts/WishlistContext";
 import { useCart } from "@/contexts/CartContext";
 import { useToast } from "@/hooks/use-toast";
 
 const Wishlist = () => {
   const { items, removeFromWishlist } = useWishlist();
   const { addToCart } = useCart();
   const { toast } = useToast();
 
   const handleAddToCart = (item: typeof items[0]) => {
     addToCart({
       id: item.id,
       name: item.name,
       price: item.offerPrice,
       image: item.image,
       farmer: item.farmer,
     });
     toast({ title: "Added to cart", description: `${item.name} added to your cart.` });
   };
 
   return (
     <div className="space-y-6">
       <h2 className="font-display text-2xl font-semibold text-foreground">My Wishlist</h2>
 
       {items.length === 0 ? (
         <div className="text-center py-16 glass-card rounded-2xl">
           <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
           <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
           <p className="text-muted-foreground mb-6">Save items you love to buy them later.</p>
           <Link to="/products">
             <Button className="bg-primary hover:bg-primary/90">Browse Products</Button>
           </Link>
         </div>
       ) : (
         <div className="grid sm:grid-cols-2 gap-4">
           {items.map((item, index) => (
             <motion.div
               key={item.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
               className="glass-card p-4 rounded-xl flex gap-4"
             >
               <Link to={`/product/${item.id}`}>
                 <img
                   src={item.image}
                   alt={item.name}
                   className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                 />
               </Link>
               <div className="flex-1 min-w-0">
                 <Link to={`/product/${item.id}`}>
                   <h3 className="font-semibold text-foreground hover:text-primary transition-colors">{item.name}</h3>
                 </Link>
                 <p className="text-sm text-muted-foreground mb-2">{item.farmer}</p>
                 <div className="flex items-center gap-2 mb-3">
                   <span className="font-bold text-primary">${item.offerPrice}</span>
                   {item.offerPrice < item.price && (
                     <span className="text-sm text-muted-foreground line-through">${item.price}</span>
                   )}
                 </div>
                 <div className="flex gap-2">
                   <Button size="sm" onClick={() => handleAddToCart(item)} className="bg-primary hover:bg-primary/90">
                     <ShoppingCart className="w-4 h-4 mr-1" />
                     Add to Cart
                   </Button>
                   <Button
                     size="sm"
                     variant="outline"
                     onClick={() => removeFromWishlist(item.id)}
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
     </div>
   );
 };
 
 export default Wishlist;