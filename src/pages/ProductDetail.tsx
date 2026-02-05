 import { useState } from "react";
 import { useParams, Link, useNavigate } from "react-router-dom";
 import { motion } from "framer-motion";
 import { 
   ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, Leaf, 
   Minus, Plus, ChevronLeft, ChevronRight 
 } from "lucide-react";
 import { Navbar } from "@/components/layout/Navbar";
 import { Footer } from "@/components/layout/Footer";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { products, reviews as allReviews } from "@/data/products";
 import { useCart } from "@/contexts/CartContext";
 import { useWishlist } from "@/contexts/WishlistContext";
 import { useToast } from "@/hooks/use-toast";
 
 const ProductDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const { toast } = useToast();
   const { addToCart } = useCart();
   const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
   
   const product = products.find((p) => p.id === Number(id));
   const productReviews = allReviews.filter((r) => r.productId === Number(id));
   
   const [selectedImage, setSelectedImage] = useState(0);
   const [quantity, setQuantity] = useState(1);
 
   if (!product) {
     return (
       <div className="min-h-screen bg-background">
         <Navbar />
         <main className="pt-24 pb-16">
           <div className="container mx-auto px-4 text-center py-16">
             <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
             <Link to="/products">
               <Button>Browse Products</Button>
             </Link>
           </div>
         </main>
         <Footer />
       </div>
     );
   }
 
   const inWishlist = isInWishlist(product.id);
 
   const handleAddToCart = () => {
     for (let i = 0; i < quantity; i++) {
       addToCart({
         id: product.id,
         name: product.name,
         price: product.offerPrice,
         image: product.image,
         farmer: product.farmer,
       });
     }
     toast({ title: "Added to cart", description: `${quantity}x ${product.name} added to your cart.` });
   };
 
   const handleWishlist = () => {
     if (inWishlist) {
       removeFromWishlist(product.id);
       toast({ title: "Removed from wishlist" });
     } else {
       addToWishlist({
         id: product.id,
         name: product.name,
         price: product.price,
         offerPrice: product.offerPrice,
         image: product.image,
         farmer: product.farmer,
       });
       toast({ title: "Added to wishlist" });
     }
   };
 
   const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
   const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
 
   return (
     <div className="min-h-screen bg-background">
       <Navbar />
       
       <main className="pt-24 pb-16">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           {/* Breadcrumb */}
           <motion.button
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
           >
             <ArrowLeft className="w-4 h-4" />
             Back to Products
           </motion.button>
 
           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
             {/* Image Gallery */}
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-4"
             >
               <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                 <img
                   src={product.images[selectedImage]}
                   alt={product.name}
                   className="w-full h-full object-cover"
                 />
                 {product.images.length > 1 && (
                   <>
                     <button
                       onClick={prevImage}
                       className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                     >
                       <ChevronLeft className="w-5 h-5" />
                     </button>
                     <button
                       onClick={nextImage}
                       className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                     >
                       <ChevronRight className="w-5 h-5" />
                     </button>
                   </>
                 )}
                 
                 {/* Badges */}
                 <div className="absolute top-4 left-4 flex gap-2">
                   {product.organic && (
                     <Badge className="bg-primary text-primary-foreground">
                       <Leaf className="w-3 h-3 mr-1" />
                       Organic
                     </Badge>
                   )}
                   {product.offerPrice < product.price && (
                     <Badge className="bg-harvest text-harvest-foreground">
                       {Math.round((1 - product.offerPrice / product.price) * 100)}% OFF
                     </Badge>
                   )}
                 </div>
               </div>
 
               {/* Thumbnails */}
               {product.images.length > 1 && (
                 <div className="flex gap-3 justify-center">
                   {product.images.map((img, idx) => (
                     <button
                       key={idx}
                       onClick={() => setSelectedImage(idx)}
                       className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                         selectedImage === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                       }`}
                     >
                       <img src={img} alt="" className="w-full h-full object-cover" />
                     </button>
                   ))}
                 </div>
               )}
             </motion.div>
 
             {/* Product Info */}
             <motion.div
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-6"
             >
               <div>
                 <p className="text-sm text-primary font-medium mb-2">{product.farmer}</p>
                 <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                   {product.name}
                 </h1>
                 
                 {/* Rating */}
                 <div className="flex items-center gap-3">
                   <div className="flex items-center">
                     {[...Array(5)].map((_, i) => (
                       <Star
                         key={i}
                         className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-harvest text-harvest" : "text-muted"}`}
                       />
                     ))}
                   </div>
                   <span className="font-medium">{product.rating}</span>
                   <span className="text-muted-foreground">({product.reviews} reviews)</span>
                 </div>
               </div>
 
               {/* Price */}
               <div className="flex items-baseline gap-4">
                 <span className="text-4xl font-bold text-primary">${product.offerPrice}</span>
                 {product.offerPrice < product.price && (
                   <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                 )}
               </div>
 
               {/* Stock Status */}
               <div className="flex items-center gap-2">
                 <div className={`w-3 h-3 rounded-full ${product.stock > 50 ? "bg-green-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
                 <span className="text-sm font-medium">
                   {product.stock > 50 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
                 </span>
               </div>
 
               {/* Description */}
               <p className="text-muted-foreground leading-relaxed">{product.description}</p>
 
               {/* Quantity & Add to Cart */}
               <div className="flex flex-wrap gap-4">
                 <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                   <button
                     onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                     className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-background transition-colors"
                   >
                     <Minus className="w-4 h-4" />
                   </button>
                   <span className="w-10 text-center font-semibold">{quantity}</span>
                   <button
                     onClick={() => setQuantity((q) => q + 1)}
                     className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-background transition-colors"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                 </div>
 
                 <Button
                   onClick={handleAddToCart}
                   size="lg"
                   className="flex-1 bg-primary hover:bg-primary/90 h-12"
                   disabled={product.stock === 0}
                 >
                   <ShoppingCart className="w-5 h-5 mr-2" />
                   Add to Cart
                 </Button>
 
                 <Button
                   onClick={handleWishlist}
                   size="lg"
                   variant="outline"
                   className={`h-12 px-4 ${inWishlist ? "text-destructive border-destructive" : ""}`}
                 >
                   <Heart className={`w-5 h-5 ${inWishlist ? "fill-destructive" : ""}`} />
                 </Button>
               </div>
 
               {/* Trust Badges */}
               <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                     <Truck className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-medium text-sm">Free Delivery</p>
                     <p className="text-xs text-muted-foreground">On orders over $50</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                     <Shield className="w-5 h-5 text-primary" />
                   </div>
                   <div>
                     <p className="font-medium text-sm">Quality Assured</p>
                     <p className="text-xs text-muted-foreground">100% fresh guarantee</p>
                   </div>
                 </div>
               </div>
             </motion.div>
           </div>
 
           {/* Reviews Section */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="mt-16"
           >
             <h2 className="font-display text-2xl font-bold text-foreground mb-6">
               Customer Reviews ({productReviews.length})
             </h2>
 
             {productReviews.length > 0 ? (
               <div className="grid gap-4">
                 {productReviews.map((review) => (
                   <div key={review.id} className="glass-card p-6 rounded-xl">
                     <div className="flex items-start justify-between mb-3">
                       <div>
                         <p className="font-semibold text-foreground">{review.userName}</p>
                         <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                       </div>
                       <div className="flex items-center">
                         {[...Array(5)].map((_, i) => (
                           <Star
                             key={i}
                             className={`w-4 h-4 ${i < review.rating ? "fill-harvest text-harvest" : "text-muted"}`}
                           />
                         ))}
                       </div>
                     </div>
                     <p className="text-muted-foreground">{review.comment}</p>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-12 glass-card rounded-xl">
                 <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
               </div>
             )}
           </motion.div>
         </div>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default ProductDetail;