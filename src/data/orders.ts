 export interface OrderItem {
   id: number;
   name: string;
   price: number;
   quantity: number;
   image: string;
 }
 
 export interface Order {
   id: string;
   userId: string;
   items: OrderItem[];
   total: number;
   status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
   address: {
     fullName: string;
     phone: string;
     street: string;
     city: string;
     state: string;
     pincode: string;
   };
   paymentMethod: "cod" | "upi";
   createdAt: string;
   reviewed: boolean;
 }
 
 export const mockOrders: Order[] = [
   {
     id: "ORD-2024001",
     userId: "user-1",
     items: [
       { id: 1, name: "Fresh Organic Tomatoes", price: 3.99, quantity: 2, image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=200" },
       { id: 6, name: "Organic Apples", price: 4.99, quantity: 3, image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=200" },
     ],
     total: 22.95,
     status: "delivered",
     address: { fullName: "John Doe", phone: "+1234567890", street: "123 Main St", city: "Springfield", state: "IL", pincode: "62701" },
     paymentMethod: "cod",
     createdAt: "2024-01-20T10:30:00Z",
     reviewed: false,
   },
   {
     id: "ORD-2024002",
     userId: "user-1",
     items: [
       { id: 2, name: "AgriValah Spinach", price: 2.99, quantity: 2, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200" },
     ],
     total: 5.98,
     status: "shipped",
     address: { fullName: "John Doe", phone: "+1234567890", street: "123 Main St", city: "Springfield", state: "IL", pincode: "62701" },
     paymentMethod: "upi",
     createdAt: "2024-01-22T14:15:00Z",
     reviewed: false,
   },
   {
     id: "ORD-2024003",
     userId: "user-1",
     items: [
       { id: 8, name: "AgriValah Eggs", price: 5.99, quantity: 1, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200" },
     ],
     total: 5.99,
     status: "processing",
     address: { fullName: "John Doe", phone: "+1234567890", street: "123 Main St", city: "Springfield", state: "IL", pincode: "62701" },
     paymentMethod: "cod",
     createdAt: "2024-01-25T09:00:00Z",
     reviewed: false,
   },
 ];