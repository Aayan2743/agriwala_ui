 export interface Product {
   id: number;
   name: string;
   category: string;
   price: number;
   offerPrice: number;
   rating: number;
   reviews: number;
   image: string;
   images: string[];
   farmer: string;
   farmerId: number;
   organic: boolean;
   description: string;
   stock: number;
 }
 
 export const products: Product[] = [
   {
     id: 1,
     name: "Fresh Organic Tomatoes",
     category: "Vegetables",
     price: 4.99,
     offerPrice: 3.99,
     rating: 4.8,
     reviews: 124,
     image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=800&h=800&fit=crop",
       "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&h=800&fit=crop",
       "https://images.unsplash.com/photo-1561136594-7f68413baa99?w=800&h=800&fit=crop",
     ],
     farmer: "Green Valley Farm",
     farmerId: 1,
     organic: true,
     description: "Freshly picked organic tomatoes grown with sustainable farming practices. Our tomatoes are vine-ripened for maximum flavor and nutrition. Perfect for salads, sauces, and everyday cooking.",
     stock: 150,
   },
   {
     id: 2,
     name: "AgriValah Spinach",
     category: "Vegetables",
     price: 3.49,
     offerPrice: 2.99,
     rating: 4.9,
     reviews: 89,
     image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=800&fit=crop",
       "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=800&h=800&fit=crop",
     ],
     farmer: "Sunrise Organics",
     farmerId: 2,
     organic: true,
     description: "Fresh, tender spinach leaves harvested at peak freshness. Rich in iron and vitamins, perfect for salads, smoothies, or cooking.",
     stock: 80,
   },
   {
     id: 3,
     name: "Sweet Mangoes",
     category: "Fruits",
     price: 6.99,
     offerPrice: 5.49,
     rating: 4.7,
     reviews: 156,
     image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&h=800&fit=crop",
       "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&h=800&fit=crop",
     ],
     farmer: "Tropical Gardens",
     farmerId: 3,
     organic: false,
     description: "Sweet, juicy mangoes ripened naturally on the tree. These alphonso variety mangoes are known for their exceptional sweetness and aroma.",
     stock: 200,
   },
   {
     id: 4,
     name: "Organic Brown Rice",
     category: "Grains",
     price: 8.99,
     offerPrice: 7.49,
     rating: 4.6,
     reviews: 78,
     image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=800&fit=crop",
     ],
     farmer: "Heritage Farms",
     farmerId: 4,
     organic: true,
     description: "Premium quality organic brown rice with high fiber content. Grown using traditional methods without any chemicals or pesticides.",
     stock: 500,
   },
   {
     id: 5,
     name: "Fresh Carrots Bundle",
     category: "Vegetables",
     price: 2.99,
     offerPrice: 2.49,
     rating: 4.8,
     reviews: 203,
     image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&h=800&fit=crop",
       "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=800&h=800&fit=crop",
     ],
     farmer: "Root Valley",
     farmerId: 5,
     organic: true,
     description: "Crisp, sweet carrots freshly harvested from organic farms. Perfect for salads, juicing, or cooking. Rich in beta-carotene and vitamins.",
     stock: 120,
   },
   {
     id: 6,
     name: "Organic Apples",
     category: "Fruits",
     price: 5.99,
     offerPrice: 4.99,
     rating: 4.9,
     reviews: 312,
     image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&h=800&fit=crop",
       "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800&h=800&fit=crop",
     ],
     farmer: "Apple Orchards",
     farmerId: 6,
     organic: true,
     description: "Crisp and sweet organic apples from our mountain orchards. Handpicked at perfect ripeness for the best flavor experience.",
     stock: 300,
   },
   {
     id: 7,
     name: "Fresh Basil Bunch",
     category: "Herbs",
     price: 2.49,
     offerPrice: 1.99,
     rating: 4.7,
     reviews: 67,
     image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=800&h=800&fit=crop",
     ],
     farmer: "Herb Gardens",
     farmerId: 7,
     organic: true,
     description: "Aromatic fresh basil grown with care. Perfect for Italian dishes, Thai cuisine, or fresh pesto. Harvested daily for maximum freshness.",
     stock: 50,
   },
   {
     id: 8,
     name: "AgriValah Eggs",
     category: "Dairy",
     price: 6.49,
     offerPrice: 5.99,
     rating: 4.9,
     reviews: 445,
     image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
     images: [
       "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&h=800&fit=crop",
     ],
     farmer: "Happy Hens Farm",
     farmerId: 8,
     organic: true,
     description: "Free-range eggs from happy, pasture-raised hens. Rich in omega-3 and vitamins. Our hens enjoy a natural diet and open pastures.",
     stock: 200,
   },
 ];
 
 export const categories = ["All", "Vegetables", "Fruits", "Grains", "Dairy", "Herbs", "Organic"];
 
 export interface Review {
   id: number;
   productId: number;
   userId: string;
   userName: string;
   rating: number;
   comment: string;
   date: string;
 }
 
 export const reviews: Review[] = [
   { id: 1, productId: 1, userId: "u1", userName: "Sarah M.", rating: 5, comment: "Absolutely delicious! Best tomatoes I've ever had.", date: "2024-01-15" },
   { id: 2, productId: 1, userId: "u2", userName: "Mike T.", rating: 4, comment: "Great quality and taste. Will order again.", date: "2024-01-10" },
   { id: 3, productId: 1, userId: "u3", userName: "Emily R.", rating: 5, comment: "So fresh and flavorful. My family loved them!", date: "2024-01-05" },
   { id: 4, productId: 2, userId: "u1", userName: "Sarah M.", rating: 5, comment: "Super fresh spinach, great for smoothies!", date: "2024-01-12" },
   { id: 5, productId: 6, userId: "u4", userName: "John D.", rating: 5, comment: "These apples are incredible! So crisp and sweet.", date: "2024-01-08" },
 ];