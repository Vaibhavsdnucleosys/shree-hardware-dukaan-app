import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, Plus, Minus, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface CalcItem {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  rate: number;
  total: number;
}

const Calculator = () => {
  const [items, setItems] = useState<CalcItem[]>([
    { id: 1, name: "", unit: "piece", quantity: 0, rate: 0, total: 0 }
  ]);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18); // GST 18%
  const { toast } = useToast();

  const units = [
    { value: "piece", label: "पीस" },
    { value: "kg", label: "किलो" },
    { value: "meter", label: "मीटर" },
    { value: "feet", label: "फूट" },
    { value: "liter", label: "लिटर" },
    { value: "bag", label: "बॅग" },
    { value: "box", label: "बॉक्स" }
  ];

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id), 0) + 1;
    setItems([...items, { id: newId, name: "", unit: "piece", quantity: 0, rate: 0, total: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: keyof CalcItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updatedItem.total = updatedItem.quantity * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const getSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const getDiscountAmount = () => {
    return (getSubTotal() * discount) / 100;
  };

  const getTaxableAmount = () => {
    return getSubTotal() - getDiscountAmount();
  };

  const getTaxAmount = () => {
    return (getTaxableAmount() * tax) / 100;
  };

  const getFinalTotal = () => {
    return getTaxableAmount() + getTaxAmount();
  };

  const resetCalculator = () => {
    setItems([{ id: 1, name: "", unit: "piece", quantity: 0, rate: 0, total: 0 }]);
    setDiscount(0);
    setTax(18);
    toast({
      title: "रीसेट झाले",
      description: "कॅल्क्युलेटर रीसेट केले गेले",
    });
  };

  const saveCalculation = () => {
    if (items.some(item => item.name.trim() && item.quantity > 0 && item.rate > 0)) {
      toast({
        title: "यशस्वी",
        description: "गणना सेव्ह केली गेली!",
      });
    } else {
      toast({
        title: "त्रुटी",
        description: "कमीत कमी एक valid item जोडा",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">किंमत कॅल्क्युलेटर</h2>
          <p className="text-muted-foreground">साहित्याची एकूण किंमत काढा</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Calculator Items */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalcIcon className="h-5 w-5" />
                    साहित्याची यादी
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={addItem} size="sm" className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      item जोडा
                    </Button>
                    <Button onClick={resetCalculator} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      रीसेट
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 items-end p-4 border rounded-lg">
                      <div className="col-span-12 md:col-span-3">
                        <Label>साहित्याचे नाव</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                          placeholder="साहित्याचे नाव"
                        />
                      </div>
                      <div className="col-span-6 md:col-span-2">
                        <Label>युनिट</Label>
                        <Select value={item.unit} onValueChange={(value) => updateItem(item.id, 'unit', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {units.map((unit) => (
                              <SelectItem key={unit.value} value={unit.value}>
                                {unit.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-6 md:col-span-2">
                        <Label>संख्या</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-6 md:col-span-2">
                        <Label>दर (₹)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-5 md:col-span-2">
                        <Label>एकूण</Label>
                        <div className="text-lg font-semibold text-hardware-orange">
                          ₹{item.total.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-1">
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

            {/* Discount and Tax */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>सूट आणि टॅक्स</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discount">सूट (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={discount}
                      onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tax">GST (%)</Label>
                    <Select value={tax.toString()} onValueChange={(value) => setTax(parseFloat(value))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0% - GST Free</SelectItem>
                        <SelectItem value="5">5% - Essential Items</SelectItem>
                        <SelectItem value="12">12% - Standard Items</SelectItem>
                        <SelectItem value="18">18% - Standard Rate</SelectItem>
                        <SelectItem value="28">28% - Luxury Items</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calculation Summary */}
          <div className="space-y-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>एकूण गणना</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>उप एकूण:</span>
                    <span className="font-medium">₹{getSubTotal().toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>सूट ({discount}%):</span>
                      <span>-₹{getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Taxable Amount:</span>
                    <span className="font-medium">₹{getTaxableAmount().toFixed(2)}</span>
                  </div>
                  
                  {tax > 0 && (
                    <div className="flex justify-between">
                      <span>GST ({tax}%):</span>
                      <span>₹{getTaxAmount().toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>एकूण रक्कम:</span>
                      <span className="text-hardware-orange">₹{getFinalTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={saveCalculation}
                  className="w-full bg-gradient-primary hover:opacity-90 mt-6"
                >
                  गणना सेव्ह करा
                </Button>
              </CardContent>
            </Card>

            {/* Quick Calculations */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>त्वरित गणना</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">पर स्क्वेअर फिट दर:</div>
                  <div className="text-hardware-orange">
                    {getSubTotal() > 0 ? `₹${(getFinalTotal() / items.reduce((sum, item) => sum + item.quantity, 0) || 1).toFixed(2)}` : '₹0'}
                  </div>
                  
                  <div className="font-medium">एकूण वस्तू:</div>
                  <div>{items.length}</div>
                  
                  <div className="font-medium">एकूण संख्या:</div>
                  <div>{items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Calculations */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>अलीकडील गणना</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded text-sm">
                    <div>
                      <div className="font-medium">सिमेंट + रेती</div>
                      <div className="text-muted-foreground">आज, ३:१५ PM</div>
                    </div>
                    <div className="text-hardware-orange font-semibold">₹४,५००</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded text-sm">
                    <div>
                      <div className="font-medium">पाईप फिटिंग</div>
                      <div className="text-muted-foreground">काल, १२:३० PM</div>
                    </div>
                    <div className="text-hardware-orange font-semibold">₹२,८००</div>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded text-sm">
                    <div>
                      <div className="font-medium">इलेक्ट्रिकल वायरिंग</div>
                      <div className="text-muted-foreground">काल, ४:४५ PM</div>
                    </div>
                    <div className="text-hardware-orange font-semibold">₹६,२००</div>
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

export default Calculator;