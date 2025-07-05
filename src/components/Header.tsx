import { Package, ShoppingCart, Users, BarChart3, Settings, LogOut, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({ title: "लॉगआउट यशस्वी" });
    navigate("/login");
  };

  return (
    <header className="bg-gradient-primary text-white shadow-hardware">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Package className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">श्री हार्डवेअर</h1>
              <p className="text-white/80">हार्डवेअर आणि बिल्डिंग मटेरियल</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost-white" asChild>
              <Link to="/"><BarChart3 className="h-4 w-4 mr-2" />डॅशबोर्ड</Link>
            </Button>
            <Button variant="ghost-white" asChild>
              <Link to="/stock"><Package className="h-4 w-4 mr-2" />स्टॉक</Link>
            </Button>
            <Button variant="ghost-white" asChild>
              <Link to="/bills"><ShoppingCart className="h-4 w-4 mr-2" />बिल</Link>
            </Button>
            <Button variant="ghost-white" asChild>
              <Link to="/customers"><Users className="h-4 w-4 mr-2" />ग्राहक</Link>
            </Button>
            <Button variant="ghost-white" asChild>
              <Link to="/calculator"><Calculator className="h-4 w-4 mr-2" />कॅल्क्युलेटर</Link>
            </Button>
            <Button variant="ghost-white" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />बाहेर पडा
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;