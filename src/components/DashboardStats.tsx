import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "एकूण साहित्य",
      value: "२,३४५",
      icon: Package,
      trend: "+१२%",
      color: "hardware-blue"
    },
    {
      title: "आजची विक्री",
      value: "₹८,५००",
      icon: ShoppingCart,
      trend: "+८%",
      color: "hardware-orange"
    },
    {
      title: "एकूण ग्राहक",
      value: "४५६",
      icon: Users,
      trend: "+५%",
      color: "hardware-green"
    },
    {
      title: "मासिक नफा",
      value: "₹२,५०,०००",
      icon: TrendingUp,
      trend: "+१५%",
      color: "primary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card-custom border-l-4 border-l-primary hover:shadow-hardware transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-hardware-orange" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-hardware-green">
              <span className="font-medium">{stat.trend}</span> या महिन्यात
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;