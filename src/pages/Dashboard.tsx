import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';

interface OrderData {
  id: string;
  total: number;
  timestamp: Timestamp;
  [key: string]: any; // This allows for any other properties
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{ name: string; total: number }[]>([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: string; } | null>(null);
  const [revenueChange, setRevenueChange] = useState<number | null>(null);
  const [ordersChange, setOrdersChange] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);


  // Function to request sorting
  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Function to get sorted orders
  const getSortedOrders = () => {
    if (!sortConfig) {
      return orders;
    }

    return [...orders].sort((a, b) => {
      // Null or undefined checks for nested properties
      const aValue = sortConfig.key === 'name' ? (a.shippingDetails?.name || '') : (sortConfig.key === 'total' ? a.total : a[sortConfig.key!]);
      const bValue = sortConfig.key === 'name' ? (b.shippingDetails?.name || '') : (sortConfig.key === 'total' ? b.total : b[sortConfig.key!]);

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

    const auth = getAuth(app);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const db = getFirestore(app);
        const ordersRef = collection(db, "orders");
        const querySnapshot = await getDocs(ordersRef);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as OrderData[];
        setOrders(ordersData);

        // Prepare data for the chart
        const data: { [key: string]: { name: string; total: number } } = {};
        ordersData.forEach(order => {
          const date = (order.timestamp as Timestamp).toDate().toLocaleDateString(); // Convert Timestamp to Date
          if (!data[date]) {
            data[date] = { name: date, total: 0 };
          }
          data[date].total += order.total;
        });

        const formattedData = Object.values(data);

        setChartData(formattedData);

        // Calculate changes in revenue and orders (assuming simple halving for demonstration)
        const currentRevenue = ordersData.reduce((acc, order) => acc + order.total, 0);
        const currentOrders = ordersData.length;
        const previousRevenue = currentRevenue / 2; // Simplified for demonstration
        const previousOrders = currentOrders / 2; // Simplified for demonstration

        const revenueChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
        const ordersChange = ((currentOrders - previousOrders) / previousOrders) * 100;

        setRevenueChange(revenueChange);
        setOrdersChange(ordersChange);

      } catch (error: any) {
        setError(error.message || "An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Calculate statistics
  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar  className={true ? '' : 'hidden'}/>
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-serif font-bold mb-8">Dashboard</h1>
          {loading && <p>Loading orders...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Revenue Card */}
              <Card className="shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</p>
                  {revenueChange !== null && (
                    <p className={`text-sm ${revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {revenueChange >= 0 ? <ArrowUp className="inline-block mr-1" /> : <ArrowDown className="inline-block mr-1" />}
                      {revenueChange.toFixed(2)}%
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Total Orders Card */}
              <Card className="shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  {ordersChange !== null && (
                    <p className={`text-sm ${ordersChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {ordersChange >= 0 ? <ArrowUp  className="inline-block mr-1"/> : <ArrowDown  className="inline-block mr-1"/>}
                      {ordersChange.toFixed(2)}%
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Average Order Value Card */}
              <Card className="shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle>Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">€{averageOrderValue.toFixed(2)}</p>
                </CardContent>
              </Card>

              {/* Sales Over Time Chart */}
              <Card className="col-span-2 shadow-lg rounded-lg">
                <CardHeader>
                  <CardTitle>Sales Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    width={800}
                    height={300}
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </CardContent>
              </Card>
        <Card className="col-span-1 shadow-lg rounded-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Orders
                    </CardTitle>
                    <Button variant="outline" size="icon" onClick={() => setIsTableVisible(!isTableVisible)}>
                        {isTableVisible ? "Hide" : "Show"}
                    </Button>
                </CardHeader>
                <CardContent>
                    {isTableVisible && (
                        <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('id')}>
                                            Order ID
                                            {sortConfig?.key === 'id' ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : null}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('name')}>
                                            Customer Name
                                            {sortConfig?.key === 'name' ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : null}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('total')}>
                                            Total
                                            {sortConfig?.key === 'total' ? (sortConfig.direction === 'ascending' ? ' ▲' : ' ▼') : null}
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Items
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {getSortedOrders().map((order: OrderData) => (
                                        <tr key={order.id}  className="hover:bg-gray-100">
                                            <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.shippingDetails?.name} {order.shippingDetails?.surname}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{order.shippingDetails?.address}, {order.shippingDetails?.city} {order.shippingDetails?.postalCode}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">€{order.total.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <ul>
                                                    {order.items.map((item: any) => (
                                                        <li key={item.id}>{item.name} x{item.quantity}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;