'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingCart, Clock } from 'lucide-react';

const monthlyEarnings = [
  { month: 'Jan', earnings: 4500, orders: 32 },
  { month: 'Feb', earnings: 5200, orders: 38 },
  { month: 'Mar', earnings: 6100, orders: 45 },
  { month: 'Apr', earnings: 5800, orders: 42 },
  { month: 'May', earnings: 7200, orders: 54 },
  { month: 'Jun', earnings: 8100, orders: 62 },
];

const productSales = [
  { name: 'Pork Chops', value: 35, color: '#8B3A3A' },
  { name: 'Ground Pork', value: 28, color: '#A0515A' },
  { name: 'Corn', value: 18, color: '#C17070' },
  { name: 'Vegetables', value: 19, color: '#D98080' },
];

export default function EarningsPage() {
  const totalEarnings = monthlyEarnings.reduce((sum, month) => sum + month.earnings, 0);
  const totalOrders = monthlyEarnings.reduce((sum, month) => sum + month.orders, 0);
  const averageOrder = Math.round(totalEarnings / totalOrders);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Earnings & Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your sales and revenue</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ZWL {totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Orders received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ZWL {averageOrder}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ZWL 1,850</div>
            <p className="text-xs text-muted-foreground">Next payout: 5 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Your earnings over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="earnings"
                      stroke="#8B3A3A"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Orders</CardTitle>
              <CardDescription>Number of orders received each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyEarnings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#A0515A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Product</CardTitle>
              <CardDescription>Distribution of sales across products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <div className="h-80 w-full lg:w-1/2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {productSales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 lg:w-1/2">
                  {productSales.map((product) => (
                    <div key={product.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: product.color }}
                        />
                        <span className="text-sm font-medium">{product.name}</span>
                      </div>
                      <span className="text-sm font-semibold">{product.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
