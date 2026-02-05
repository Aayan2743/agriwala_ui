 import { createContext, useContext, useState, ReactNode } from "react";
 
 export interface WishlistItem {
   id: number;
   name: string;
   price: number;
   offerPrice: number;
   image: string;
   farmer: string;
 }
 
 interface WishlistContextType {
   items: WishlistItem[];
   addToWishlist: (item: WishlistItem) => void;
   removeFromWishlist: (id: number) => void;
   isInWishlist: (id: number) => boolean;
 }
 
 const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
 
 export const WishlistProvider = ({ children }: { children: ReactNode }) => {
   const [items, setItems] = useState<WishlistItem[]>([]);
 
   const addToWishlist = (item: WishlistItem) => {
     setItems((prev) => {
       if (prev.find((i) => i.id === item.id)) return prev;
       return [...prev, item];
     });
   };
 
   const removeFromWishlist = (id: number) => {
     setItems((prev) => prev.filter((item) => item.id !== id));
   };
 
   const isInWishlist = (id: number) => items.some((item) => item.id === id);
 
   return (
     <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
       {children}
     </WishlistContext.Provider>
   );
 };
 
 export const useWishlist = () => {
   const context = useContext(WishlistContext);
   if (!context) {
     throw new Error("useWishlist must be used within WishlistProvider");
   }
   return context;
 };