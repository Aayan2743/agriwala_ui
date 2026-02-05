import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, Upload, User, LogOut, Menu, X,
  Leaf, TrendingUp, DollarSign, ShoppingBag, Clock, ChevronRight,
  Plus, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarLinks = [
  { name: "Dashboard", href: "/farmer/dashboard", icon: LayoutDashboard },
  { name: "Upload Products", href: "/farmer/upload-product", icon: Upload },
  { name: "My Products", href: "/farmer/my-products", icon: Package },
  { name: "Profile Settings", href: "/farmer/profile", icon: User },
];

const stats = [
  { label: "Total Products", value: "24", icon: Package, color: "bg-primary/10 text-primary" },
  { label: "Total Sales", value: "$12,450", icon: DollarSign, color: "bg-harvest/10 text-harvest" },
  { label: "Pending Orders", value: "8", icon: Clock, color: "bg-amber-500/10 text-amber-600" },
  { label: "Revenue This Month", value: "$3,240", icon: TrendingUp, color: "bg-leaf/10 text-leaf" },
];

const recentProducts = [
  { id: 1, name: "Organic Tomatoes", price: 3.99, status: "approved", sales: 156, image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=100&h=100&fit=crop" },
  { id: 2, name: "Fresh Spinach", price: 2.99, status: "pending", sales: 89, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop" },
  { id: 3, name: "Sweet Mangoes", price: 5.49, status: "approved", sales: 234, image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=100&h=100&fit=crop" },
  { id: 4, name: "Brown Rice", price: 7.49, status: "rejected", sales: 0, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop" },
];

const recentOrders = [
  { id: "ORD-001", customer: "John Smith", items: 3, total: 45.97, status: "completed" },
  { id: "ORD-002", customer: "Sarah Johnson", items: 2, total: 28.98, status: "processing" },
  { id: "ORD-003", customer: "Mike Wilson", items: 5, total: 67.45, status: "pending" },
];

const FarmerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "pending":
      case "processing":
        return <Badge className="bg-amber-100 text-amber-700"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-foreground">AgriValah</span>
                <p className="text-xs text-muted-foreground">Farmer Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link to="/">
              <Button variant="outline" className="w-full justify-start">
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Website
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-foreground"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div>
                <h1 className="font-display text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, John!</p>
              </div>
            </div>
            <Link to="/farmer/upload-product">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">Recent Products</h2>
                <Link to="/farmer/products" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentProducts.map((product) => (
                  <div key={product.id} className="p-4 flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">${product.price} · {product.sales} sales</p>
                    </div>
                    {getStatusBadge(product.status)}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
                <Link to="/farmer/orders" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer} · {order.items} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${order.total}</p>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
