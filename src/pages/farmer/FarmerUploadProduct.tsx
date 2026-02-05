//  import { useState } from "react";
//  import { motion } from "framer-motion";
//  import { Upload, X, Image as ImageIcon, Check } from "lucide-react";
//  import { Button } from "@/components/ui/button";
//  import { Input } from "@/components/ui/input";
//  import { Label } from "@/components/ui/label";
//  import { Textarea } from "@/components/ui/textarea";
//  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
//  import { FarmerSidebar, FarmerHeader } from "@/components/farmer/FarmerSidebar";
//  import { useToast } from "@/hooks/use-toast";
//  import { useNavigate } from "react-router-dom";
 
//  const categories = ["Vegetables", "Fruits", "Grains", "Dairy", "Herbs", "Organic"];
 
//  const FarmerUploadProduct = () => {
//    const [sidebarOpen, setSidebarOpen] = useState(false);
//    const { toast } = useToast();
//    const navigate = useNavigate();
 
//    const [images, setImages] = useState<string[]>([]);
//    const [formData, setFormData] = useState({
//      name: "",
//      category: "",
//      price: "",
//      offerPrice: "",
//      stock: "",
//      description: "",
//    });
 
//    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//      const files = e.target.files;
//      if (!files) return;
 
//      Array.from(files).forEach((file) => {
//        const reader = new FileReader();
//        reader.onload = (event) => {
//          if (event.target?.result) {
//            setImages((prev) => [...prev, event.target!.result as string]);
//          }
//        };
//        reader.readAsDataURL(file);
//      });
//    };
 
//    const removeImage = (index: number) => {
//      setImages((prev) => prev.filter((_, i) => i !== index));
//    };
 
//    const handleSubmit = (e: React.FormEvent) => {
//      e.preventDefault();
//      if (images.length === 0) {
//        toast({ title: "Please add at least one image", variant: "destructive" });
//        return;
//      }
//      toast({
//        title: "Product Submitted!",
//        description: "Your product is pending admin approval.",
//      });
//      navigate("/farmer/my-products");
//    };
 
//    return (
//      <div className="min-h-screen bg-muted/30">
//        <FarmerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 
//        <div className="lg:ml-64">
//          <FarmerHeader
//            onMenuClick={() => setSidebarOpen(true)}
//            title="Upload Product"
//            subtitle="Add a new product to your store"
//          />
 
//          <main className="p-6">
//            <motion.form
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              onSubmit={handleSubmit}
//              className="max-w-2xl mx-auto glass-card p-6 sm:p-8 rounded-2xl"
//            >
//              {/* Image Upload */}
//              <div className="mb-8">
//                <Label className="text-base font-semibold mb-4 block">Product Images</Label>
//                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                  {images.map((img, idx) => (
//                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
//                      <img src={img} alt="" className="w-full h-full object-cover" />
//                      <button
//                        type="button"
//                        onClick={() => removeImage(idx)}
//                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                      >
//                        <X className="w-4 h-4" />
//                      </button>
//                    </div>
//                  ))}
//                  {images.length < 5 && (
//                    <label className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
//                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
//                      <span className="text-sm text-muted-foreground">Add Image</span>
//                      <input
//                        type="file"
//                        accept="image/*"
//                        multiple
//                        onChange={handleImageUpload}
//                        className="hidden"
//                      />
//                    </label>
//                  )}
//                </div>
//                <p className="text-sm text-muted-foreground mt-2">Upload up to 5 images. First image will be the cover.</p>
//              </div>
 
//              {/* Form Fields */}
//              <div className="space-y-6">
//                <div>
//                  <Label htmlFor="name">Product Name</Label>
//                  <Input
//                    id="name"
//                    value={formData.name}
//                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                    placeholder="e.g., Fresh Organic Tomatoes"
//                    required
//                  />
//                </div>
 
//                <div>
//                  <Label htmlFor="category">Category</Label>
//                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
//                    <SelectTrigger>
//                      <SelectValue placeholder="Select a category" />
//                    </SelectTrigger>
//                    <SelectContent>
//                      {categories.map((cat) => (
//                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
//                      ))}
//                    </SelectContent>
//                  </Select>
//                </div>
 
//                <div className="grid sm:grid-cols-3 gap-4">
//                  <div>
//                    <Label htmlFor="price">Price ($)</Label>
//                    <Input
//                      id="price"
//                      type="number"
//                      step="0.01"
//                      value={formData.price}
//                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                      placeholder="4.99"
//                      required
//                    />
//                  </div>
//                  <div>
//                    <Label htmlFor="offerPrice">Offer Price ($)</Label>
//                    <Input
//                      id="offerPrice"
//                      type="number"
//                      step="0.01"
//                      value={formData.offerPrice}
//                      onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
//                      placeholder="3.99"
//                    />
//                  </div>
//                  <div>
//                    <Label htmlFor="stock">Stock Quantity</Label>
//                    <Input
//                      id="stock"
//                      type="number"
//                      value={formData.stock}
//                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                      placeholder="100"
//                      required
//                    />
//                  </div>
//                </div>
 
//                <div>
//                  <Label htmlFor="description">Description</Label>
//                  <Textarea
//                    id="description"
//                    value={formData.description}
//                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                    placeholder="Describe your product in detail..."
//                    rows={4}
//                    required
//                  />
//                </div>
 
//                <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90">
//                  <Check className="w-5 h-5 mr-2" />
//                  Submit for Approval
//                </Button>
//              </div>
//            </motion.form>
//          </main>
//        </div>
//      </div>
//    );
//  };
 
//  export default FarmerUploadProduct;

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FarmerSidebar,
  FarmerHeader,
} from "@/components/farmer/FarmerSidebar";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const categories: string[] = [
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Herbs",
  "Organic",
];

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  offerPrice: string;
  stock: string;
  description: string;
}

const FarmerUploadProduct = (): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    stock: "",
    description: "",
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number): void => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (images.length === 0) {
      toast({
        title: "Please add at least one image",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Product Submitted!",
      description: "Your product is pending admin approval.",
    });

    navigate("/farmer/my-products");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <FarmerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <FarmerHeader
          onMenuClick={() => setSidebarOpen(true)}
          title="Upload Product"
          subtitle="Add a new product to your store"
        />

        <main className="p-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto glass-card p-6 sm:p-8 rounded-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT – FORM */}
              <div className="space-y-6 order-2 lg:order-1">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: string) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label>Offer Price ($)</Label>
                    <Input
                      type="number"
                      value={formData.offerPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          offerPrice: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-12">
                  <Check className="w-5 h-5 mr-2" />
                  Submit for Approval
                </Button>
              </div>

              {/* RIGHT – IMAGE UPLOAD */}
              <div className="order-1 lg:order-2">
                <Label className="text-base font-semibold mb-4 block">
                  Product Images
                </Label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-xl overflow-hidden group"
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {images.length < 5 && (
                    <label className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:border-primary transition">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Add Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-2">
                  Upload up to 5 images. First image is the cover.
                </p>
              </div>
            </div>
          </motion.form>
        </main>
      </div>
    </div>
  );
};

export default FarmerUploadProduct;
