'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, Users, TrendingUp } from 'lucide-react';

const viewsData = [
  { date: 'Mon', views: 320, clicks: 140 },
  { date: 'Tue', views: 450, clicks: 220 },
  { date: 'Wed', views: 380, clicks: 180 },
  { date: 'Thu', views: 520, clicks: 290 },
  { date: 'Fri', views: 610, clicks: 350 },
  { date: 'Sat', views: 720, clicks: 420 },
  { date: 'Sun', views: 890, clicks: 500 },
];

const trafficSourcesData = [
  { source: 'Direct', users: 450 },
  { source: 'Search', users: 380 },
  { source: 'Referral', users: 290 },
  { source: 'Social', users: 200 },
  { source: 'Email', users: 150 },
];

const productViewsData = [
  { product: 'Pork Chops', views: 450, conversions: 58 },
  { product: 'Ground Pork', views: 380, conversions: 52 },
  { product: 'Corn', views: 290, conversions: 38 },
  { product: 'Vegetables', views: 210, conversions: 28 },
  { product: 'Grains', views: 180, conversions: 22 },
];

export default function AnalyticsPage() {
  const totalViews = viewsData.reduce((sum, day) => sum + day.views, 0);
  const totalClicks = viewsData.reduce((sum, day) => sum + day.clicks, 0);
  const conversionRate = ((totalClicks / totalViews) * 100).toFixed(1);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">Track your store performance and customer engagement</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground">Link clicks</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">Click to view ratio</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>

        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Trends</CardTitle>
              <CardDescription>Views and clicks over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="views"
                      fill="#8B3A3A"
                      stroke="#8B3A3A"
                      fillOpacity={0.2}
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      fill="#A0515A"
                      stroke="#A0515A"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trafficSourcesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#8B3A3A" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>Views and conversions by product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8B3A3A" />
                    <Bar dataKey="conversions" fill="#C17070" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
