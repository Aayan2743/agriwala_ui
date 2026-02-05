import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Tractor, Package, Tag, DollarSign,
  Settings, LogOut, Menu, X, Leaf, TrendingUp, ShoppingBag,
  BarChart3, ChevronRight, Eye, CheckCircle, XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Farmers", href: "/admin/farmers", icon: Tractor },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

const stats = [
  { label: "Total Users", value: "10,234", icon: Users, change: "+12%", color: "bg-primary/10 text-primary" },
  { label: "Total Farmers", value: "543", icon: Tractor, change: "+8%", color: "bg-harvest/10 text-harvest" },
  { label: "Total Products", value: "2,847", icon: Package, change: "+23%", color: "bg-leaf/10 text-leaf" },
  { label: "Revenue", value: "$145,670", icon: DollarSign, change: "+18%", color: "bg-amber-500/10 text-amber-600" },
];

const pendingApprovals = [
  { id: 1, name: "Organic Avocados", farmer: "Green Valley Farm", price: 4.99, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100&h=100&fit=crop" },
  { id: 2, name: "Fresh Strawberries", farmer: "Berry Gardens", price: 6.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=100&h=100&fit=crop" },
  { id: 3, name: "Organic Honey", farmer: "Mountain Bees", price: 12.99, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop" },
];

const recentOrders = [
  { id: "ORD-2045", customer: "Emily Davis", farmer: "Green Valley", total: 89.97, status: "delivered" },
  { id: "ORD-2044", customer: "Michael Brown", farmer: "Sunrise Organics", total: 45.50, status: "processing" },
  { id: "ORD-2043", customer: "Sarah Wilson", farmer: "Heritage Farms", total: 123.00, status: "pending" },
  { id: "ORD-2042", customer: "James Taylor", farmer: "Apple Orchards", total: 67.25, status: "delivered" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary-foreground/20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold">AgriValah</span>
                <p className="text-xs text-primary-foreground/70">Admin Panel</p>
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
                      ? "bg-primary-foreground/20"
                      : "hover:bg-primary-foreground/10"
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary-foreground/20 space-y-2">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10">
                <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Website
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
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
                <h1 className="font-display text-2xl font-semibold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Overview of your platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-primary text-primary-foreground">
                3 Pending Approvals
              </Badge>
            </div>
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
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Approvals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border">
                <h2 className="font-display text-lg font-semibold text-foreground">Pending Approvals</h2>
              </div>
              <div className="divide-y divide-border">
                {pendingApprovals.map((product) => (
                  <div key={product.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.farmer} · ${product.price}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-destructive border-destructive hover:bg-destructive/10">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 glass-card rounded-xl overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
                <Link to="/admin/orders" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Farmer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{order.farmer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">${order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            order.status === "delivered" ? "bg-green-100 text-green-700" :
                            order.status === "processing" ? "bg-blue-100 text-blue-700" :
                            "bg-amber-100 text-amber-700"
                          }>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Revenue Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 glass-card rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Revenue Overview</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Weekly</Button>
                <Button size="sm" className="bg-primary">Monthly</Button>
                <Button variant="outline" size="sm">Yearly</Button>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Revenue chart will appear here</p>
                <p className="text-sm text-muted-foreground">Connect to backend for live data</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
