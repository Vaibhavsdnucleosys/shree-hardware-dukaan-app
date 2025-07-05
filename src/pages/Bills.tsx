import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus, FileText, Printer } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface BillItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const Bills = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<BillItem[]>([
    { id: 1, name: "", quantity: 1, price: 0, total: 0 }
  ]);
  const { toast } = useToast();

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([...items, { id: newId, name: "", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof BillItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const generateBill = () => {
    if (!customerName.trim()) {
      toast({
        title: "त्रुटी",
        description: "ग्राहकाचे नाव आवश्यक आहे",
        variant: "destructive",
      });
      return;
    }

    const hasValidItems = items.some(item => item.name.trim() && item.quantity > 0 && item.price > 0);
    if (!hasValidItems) {
      toast({
        title: "त्रुटी", 
        description: "कमीत कमी एक साहित्य जोडा",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "यशस्वी",
      description: `${customerName} साठी बिल तयार झाले!`,
    });

    // Reset form
    setCustomerName("");
    setCustomerPhone("");
    setItems([{ id: 1, name: "", quantity: 1, price: 0, total: 0 }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">नवीन बिल तयार करा</h2>
          <p className="text-muted-foreground">ग्राहकाचे बिल तयार करण्यासाठी माहिती भरा</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>ग्राहकाची माहिती</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">ग्राहकाचे नाव *</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ग्राहकाचे पूर्ण नाव"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">फोन नंबर</Label>
                    <Input
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="१०-अंकी फोन नंबर"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bill Items */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>साहित्याची यादी</CardTitle>
                  <Button onClick={addItem} size="sm" className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    साहित्य जोडा
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                      <div className="col-span-12 md:col-span-4">
                        <Label>साहित्याचे नाव</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          placeholder="साहित्याचे नाव"
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <Label>संख्या</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="col-span-4 md:col-span-2">
                        <Label>दर (₹)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-3 md:col-span-2">
                        <Label>एकूण</Label>
                        <div className="text-lg font-semibold text-hardware-orange">
                          ₹{item.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bill Summary */}
          <div className="space-y-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  बिल सारांश
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>एकूण वस्तू:</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>उप एकूण:</span>
                    <span className="font-medium">₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>एकूण रक्कम:</span>
                      <span className="text-hardware-orange">₹{getTotalAmount().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <Button 
                    onClick={generateBill}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    बिल तयार करा
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Printer className="h-4 w-4 mr-2" />
                    प्रिंट करा
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Bills */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>अलीकडील बिले</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">राहुल पाटील</div>
                      <div className="text-sm text-muted-foreground">आज, २:३० PM</div>
                    </div>
                    <div className="text-hardware-orange font-semibold">₹२,५००</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">सुनिता शर्मा</div>
                      <div className="text-sm text-muted-foreground">काल, ११:१५ AM</div>
                    </div>
                    <div className="text-hardware-orange font-semibold">₹१,२००</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">अमित जैन</div>
                      <div className="text-sm text-muted-foreground">काल, ४:४५ PM</div>
                    </div>
                    <div className="text-hardware-orange font-semibold">₹३,८००</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bills;