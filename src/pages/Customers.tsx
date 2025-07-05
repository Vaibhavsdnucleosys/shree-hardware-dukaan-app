import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Search, Phone, MapPin, Edit, Eye } from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalPurchases: number;
  lastPurchase: string;
  status: "active" | "inactive";
}

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const { toast } = useToast();

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "राहुल पाटील",
      phone: "9876543210",
      email: "rahul.patil@email.com",
      address: "कृष्णा नगर, पुणे - ४११००७",
      totalPurchases: 45000,
      lastPurchase: "२ दिवस पूर्वी",
      status: "active"
    },
    {
      id: 2,
      name: "सुनिता शर्मा",
      phone: "9876543211",
      email: "sunita.sharma@email.com",
      address: "शिवाजी नगर, पुणे - ४११००५",
      totalPurchases: 28000,
      lastPurchase: "१ आठवडा पूर्वी",
      status: "active"
    },
    {
      id: 3,
      name: "अमित जैन",
      phone: "9876543212",
      email: "amit.jain@email.com",
      address: "कॅंप, पुणे - ४११००१",
      totalPurchases: 67000,
      lastPurchase: "३ दिवस पूर्वी",
      status: "active"
    },
    {
      id: 4,
      name: "प्रिया देशमुख",
      phone: "9876543213",
      email: "priya.deshmukh@email.com",
      address: "नारायणी पेठ, पुणे - ४११०३०",
      totalPurchases: 12000,
      lastPurchase: "२ महिने पूर्वी",
      status: "inactive"
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNewCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.phone.trim()) {
      toast({
        title: "त्रुटी",
        description: "नाव आणि फोन नंबर आवश्यक आहे",
        variant: "destructive",
      });
      return;
    }

    if (newCustomer.phone.length !== 10) {
      toast({
        title: "त्रुटी",
        description: "१०-अंकी फोन नंबर एंटर करा",
        variant: "destructive",
      });
      return;
    }

    const newCustomerData: Customer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...newCustomer,
      totalPurchases: 0,
      lastPurchase: "नवीन ग्राहक",
      status: "active"
    };

    setCustomers([...customers, newCustomerData]);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: ""
    });
    setShowAddForm(false);

    toast({
      title: "यशस्वी",
      description: "नवीन ग्राहक जोडले गेले!",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  const getStatusText = (status: string) => {
    return status === "active" ? "सक्रिय" : "निष्क्रिय";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">ग्राहक व्यवस्थापन</h2>
              <p className="text-muted-foreground">तुमच्या ग्राहकांची माहिती व्यवस्थापित करा</p>
            </div>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Plus className="h-4 w-4 mr-2" />
              नवीन ग्राहक
            </Button>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">एकूण ग्राहक</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
                <Users className="h-8 w-8 text-hardware-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">सक्रिय ग्राहक</p>
                  <p className="text-2xl font-bold">{customers.filter(c => c.status === "active").length}</p>
                </div>
                <div className="h-8 w-8 bg-hardware-green rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">एकूण विक्री</p>
                  <p className="text-2xl font-bold">₹{customers.reduce((sum, c) => sum + c.totalPurchases, 0).toLocaleString()}</p>
                </div>
                <div className="h-8 w-8 bg-hardware-orange rounded-full flex items-center justify-center text-white text-sm font-bold">
                  ₹
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card-custom">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">सरासरी विक्री</p>
                  <p className="text-2xl font-bold">₹{Math.round(customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length).toLocaleString()}</p>
                </div>
                <div className="h-8 w-8 bg-hardware-gray rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Customer Form */}
        {showAddForm && (
          <Card className="shadow-card-custom mb-8">
            <CardHeader>
              <CardTitle>नवीन ग्राहक जोडा</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">ग्राहकाचे नाव *</Label>
                  <Input
                    id="customerName"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                    placeholder="पूर्ण नाव"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">फोन नंबर *</Label>
                  <Input
                    id="customerPhone"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                    placeholder="१० अंकी फोन नंबर"
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">ईमेल</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    placeholder="ईमेल पत्ता"
                  />
                </div>
                <div>
                  <Label htmlFor="customerAddress">पत्ता</Label>
                  <Textarea
                    id="customerAddress"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                    placeholder="पूरा पत्ता"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <Button onClick={addNewCustomer} className="bg-gradient-primary">
                  <Users className="h-4 w-4 mr-2" />
                  ग्राहक जोडा
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  रद्द करा
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="shadow-card-custom mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="ग्राहक शोधा (नाव, फोन, ईमेल)..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="shadow-card-custom hover:shadow-hardware transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <Badge variant={getStatusColor(customer.status)}>
                    {getStatusText(customer.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                
                {customer.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>@</span>
                    <span>{customer.email}</span>
                  </div>
                )}
                
                {customer.address && (
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span className="line-clamp-2">{customer.address}</span>
                  </div>
                )}
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-muted-foreground">एकूण खरेदी:</span>
                    <span className="font-semibold text-hardware-orange">₹{customer.totalPurchases.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">शेवटची खरेदी:</span>
                    <span className="text-sm">{customer.lastPurchase}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    पहा
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    संपादित करा
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card className="shadow-card-custom">
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">कोणतेही ग्राहक आढळले नाहीत</h3>
              <p className="text-muted-foreground mb-4">तुमचा शोध बदला किंवा नवीन ग्राहक जोडा</p>
              <Button onClick={() => setShowAddForm(true)} className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                नवीन ग्राहक जोडा
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Customers;