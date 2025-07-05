import Header from "@/components/Header";
import DashboardStats from "@/components/DashboardStats";
import InventoryTable from "@/components/InventoryTable";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">डॅशबोर्ड</h2>
          <p className="text-muted-foreground">आजची व्यावसायिक माहिती</p>
        </div>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InventoryTable />
          </div>
          
          <div className="space-y-6">
            <QuickActions />
            
            {/* Recent Activity Card */}
            <div className="bg-card rounded-lg shadow-card-custom p-6">
              <h3 className="text-lg font-semibold mb-4">अलीकडील क्रियाकलाप</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-hardware-green rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">नवीन स्टॉक जोडला गेला</p>
                    <p className="text-xs text-muted-foreground">सिमेंट - ५० बॅग</p>
                  </div>
                  <span className="text-xs text-muted-foreground">२ मिनिटे पूर्वी</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-hardware-orange rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">बिल तयार केले</p>
                    <p className="text-xs text-muted-foreground">राहुल पाटिल - ₹२,५००</p>
                  </div>
                  <span className="text-xs text-muted-foreground">१५ मिनिटे पूर्वी</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-hardware-blue rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">नवीन ग्राहक नोंदणी</p>
                    <p className="text-xs text-muted-foreground">सुनिता शर्मा</p>
                  </div>
                  <span className="text-xs text-muted-foreground">१ तास पूर्वी</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;