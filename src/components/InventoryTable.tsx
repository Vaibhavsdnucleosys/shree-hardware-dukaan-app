import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const InventoryTable = () => {
  const inventory = [
    {
      id: 1,
      name: "हॅमर - स्टील",
      category: "साधने",
      stock: 45,
      price: "₹२५०",
      status: "स्टॉकमध्ये"
    },
    {
      id: 2,
      name: "सिमेंट - UltraTech",
      category: "बिल्डिंग मटेरियल",
      stock: 120,
      price: "₹३५०",
      status: "स्टॉकमध्ये"
    },
    {
      id: 3,
      name: "पेंच - M6",
      category: "हार्डवेअर",
      stock: 8,
      price: "₹५",
      status: "कमी स्टॉक"
    },
    {
      id: 4,
      name: "वायर - कॉपर",
      category: "इलेक्ट्रिकल",
      stock: 0,
      price: "₹१२०",
      status: "स्टॉक संपला"
    },
    {
      id: 5,
      name: "पाइप - PVC ४ इंच",
      category: "प्लंबिंग",
      stock: 35,
      price: "₹४५०",
      status: "स्टॉकमध्ये"
    }
  ];

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

  return (
    <Card className="shadow-card-custom">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">साहित्य व्यवस्थापन</CardTitle>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            नवीन साहित्य
          </Button>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="साहित्य शोधा..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            फिल्टर
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">साहित्याचे नाव</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">श्रेणी</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">स्टॉक</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">किंमत</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">स्थिती</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">क्रिया</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{item.category}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${item.stock <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-hardware-orange">{item.price}</td>
                  <td className="py-3 px-4">
                    <Badge variant={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        संपादित करा
                      </Button>
                      <Button variant="outline" size="sm">
                        विक्री
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTable;