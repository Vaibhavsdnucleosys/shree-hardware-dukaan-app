import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, FileText, Users, Package, Calculator } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      title: "नवीन बिल",
      description: "ग्राहकाचे नवीन बिल तयार करा",
      icon: FileText,
      color: "bg-gradient-primary"
    },
    {
      title: "स्टॉक अपडेट",
      description: "साहित्याचा स्टॉक अपडेट करा",
      icon: Package,
      color: "bg-gradient-secondary"
    },
    {
      title: "नवीन ग्राहक",
      description: "नवीन ग्राहक नोंदणी करा",
      icon: Users,
      color: "bg-hardware-green"
    },
    {
      title: "किंमत कॅल्क्युलेटर",
      description: "साहित्याची किंमत काढा",
      icon: Calculator,
      color: "bg-hardware-orange"
    }
  ];

  return (
    <Card className="shadow-card-custom">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">त्वरित क्रिया</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-6 flex flex-col items-start text-left hover:shadow-hardware transition-all duration-300"
            >
              <div className={`p-3 rounded-lg ${action.color} text-white mb-3`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;