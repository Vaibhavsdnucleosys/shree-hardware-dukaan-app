import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";
import { signIn, signUp } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Static login - no validation needed
    toast({
      title: "यशस्वी",
      description: "लॉगिन यशस्वी झाले",
    });
    
    // Redirect to dashboard
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-hardware">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-primary p-4 rounded-full">
              <Package className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">श्री हार्डवेअर</CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? "आपल्या खात्यात लॉगिन करा" : "नवीन खाते तयार करा"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ईमेल</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="तुमचा ईमेल एंटर करा"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">पासवर्ड</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="तुमचा पासवर्ड एंटर करा"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90"
              disabled={loading}
            >
              {loading ? "प्रतीक्षा करा..." : (isLogin ? "लॉगिन" : "नोंदणी करा")}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin 
                ? "नवीन खाते तयार करायचे आहे?" 
                : "आधीच खाते आहे? लॉगिन करा"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;