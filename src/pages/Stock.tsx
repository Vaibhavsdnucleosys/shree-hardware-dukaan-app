import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, Search, Filter, Edit } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface StockItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  supplier: string;
  status: string;
}

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: 0,
    minStock: 0,
    price: 0,
    supplier: ""
  });
  const { toast } = useToast();

  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: 1,
      name: "हॅमर - स्टील",
      category: "साधने",
      stock: 45,
      minStock: 10,
      price: 250,
      supplier: "टूल्स इंडिया",
      status: "स्टॉकमध्ये"
    },
    {
      id: 2,
      name: "सिमेंट - UltraTech ५० किलो",
      category: "बिल्डिंग मटेरियल",
      stock: 120,
      minStock: 20,
      price: 350,
      supplier: "UltraTech",
      status: "स्टॉकमध्ये"
    },
    {
      id: 3,
      name: "पेंच - M6 x २५mm",
      category: "हार्डवेअर",
      stock: 8,
      minStock: 50,
      price: 5,
      supplier: "फास्टनर्स प्रो",
      status: "कमी स्टॉक"
    },
    {
      id: 4,
      name: "वायर - कॉपर २.५ स्क्वेअर",
      category: "इलेक्ट्रिकल",
      stock: 0,
      minStock: 10,
      price: 120,
      supplier: "इलेक्ट्रो सप्लायर्स",
      status: "स्टॉक संपला"
    }
  ]);

  const categories = ["सर्व", "साधने", "बिल्डिंग मटेरियल", "हार्डवेअर", "इलेक्ट्रिकल", "प्लंबिंग", "पेंट"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "स्टॉकमध्ये":
        return "default";
      case "कमी स्टॉक":
        return "secondary";
      case "स्टॉक संपला":
        return "destructive";
      default:
        return "default";
    }
  };

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || selectedCategory === "सर्व" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addNewItem = () => {
    if (!newItem.name.trim() || !newItem.category.trim()) {
      toast({
        title: "त्रुटी",
        description: "साहित्याचे नाव आणि श्रेणी आवश्यक आहे",
        variant: "destructive",
      });
      return;
    }

    const status = newItem.stock <= newItem.minStock 
      ? (newItem.stock === 0 ? "स्टॉक संपला" : "कमी स्टॉक")
      : "स्टॉकमध्ये";

    const newStockItem: StockItem = {
      id: Math.max(...stockItems.map(item => item.id), 0) + 1,
      ...newItem,
      status
    };

    setStockItems([...stockItems, newStockItem]);
    setNewItem({
      name: "",
      category: "",
      stock: 0,
      minStock: 0,
      price: 0,
      supplier: ""
    });
    setShowAddForm(false);

    toast({
      title: "यशस्वी",
      description: "नवीन साहित्य जोडले गेले!",
    });
  };

  const updateStock = (id: number, newStock: number) => {
    setStockItems(stockItems.map(item => {
      if (item.id === id) {
        const status = newStock <= item.minStock 
          ? (newStock === 0 ? "स्टॉक संपला" : "कमी स्टॉक")
          : "स्टॉकमध्ये";
        return { ...item, stock: newStock, status };
      }
      return item;
    }));

    toast({
      title: "अपडेट झाले",
      description: "स्टॉक अपडेट केले गेले",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">स्टॉक व्यवस्थापन</h2>
              <p className="text-muted-foreground">तुमच्या साहित्याचा स्टॉक व्यवस्थापित करा</p>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              नवीन साहित्य
            </Button>
          </div>
        </div>

        {/* Add New Item Form */}
        {showAddForm && (
          <Card className="shadow-card-custom mb-8">
            <CardHeader>
              <CardTitle>नवीन साहित्य जोडा</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="itemName">साहित्याचे नाव *</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="साहित्याचे नाव"
                  />
                </div>
                <div>
                  <Label htmlFor="category">श्रेणी *</Label>
                  <Select onValueChange={(value) => setNewItem({...newItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="श्रेणी निवडा" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="साधने">साधने</SelectItem>
                      <SelectItem value="बिल्डिंग मटेरियल">बिल्डिंग मटेरियल</SelectItem>
                      <SelectItem value="हार्डवेअर">हार्डवेअर</SelectItem>
                      <SelectItem value="इलेक्ट्रिकल">इलेक्ट्रिकल</SelectItem>
                      <SelectItem value="प्लंबिंग">प्लंबिंग</SelectItem>
                      <SelectItem value="पेंट">पेंट</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">सध्याचा स्टॉक</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({...newItem, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="minStock">किमान स्टॉक</Label>
                  <Input
                    id="minStock"
                    type="number"
                    min="0"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({...newItem, minStock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="price">किंमत (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="supplier">सप्लायर</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    placeholder="सप्लायरचे नाव"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={addNewItem} className="bg-gradient-primary">
                  <Package className="h-4 w-4 mr-2" />
                  साहित्य जोडा
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  रद्द करा
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="shadow-card-custom mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="साहित्य शोधा..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="श्रेणी निवडा" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category === "सर्व" ? "all" : category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stock Table */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle>साहित्याची यादी</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">साहित्य</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">श्रेणी</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">स्टॉक</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">किमान स्टॉक</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">किंमत</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">सप्लायर</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">स्थिती</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">क्रिया</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{item.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            value={item.stock}
                            onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                            className="w-20 h-8"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.minStock}</td>
                      <td className="py-3 px-4 font-semibold text-hardware-orange">₹{item.price}</td>
                      <td className="py-3 px-4 text-muted-foreground">{item.supplier}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Stock;