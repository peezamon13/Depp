import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderReport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        const orders = res.data;

        const total = orders.reduce((sum, order) => sum + order.total, 0);
        setTotalIncome(total);

        const filteredDailyOrders = orders.filter(
          (order) =>
            !selectedDate ||
            new Date(order.createdAt).toLocaleDateString() ===
              selectedDate.toLocaleDateString()
        );

        const dailyOrders = filteredDailyOrders.reduce((acc, order) => {
          const date = new Date(order.createdAt).toLocaleDateString();

          if (!acc[date]) {
            acc[date] = {
              date,
              total: 0,
              orders: [],
            };
          }

          acc[date].total += order.total;
          acc[date].orders.push(order);

          return acc;
        }, {});

        setDailyReport(Object.values(dailyOrders));

        const monthlyOrders = orders.reduce((acc, order) => {
          const monthYear = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

          if (!acc[monthYear]) {
            acc[monthYear] = {
              monthYear,
              total: 0,
            };
          }

          acc[monthYear].total += order.total;

          return acc;
        }, {});

        setMonthlyReport(Object.values(monthlyOrders));

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    // Find orders for the selected date
    const ordersForSelectedDate = dailyReport.find(
      (entry) => entry.date === date.toLocaleDateString()
    );
  
    // Check if ordersForSelectedDate is defined and has orders
    if (ordersForSelectedDate && ordersForSelectedDate.orders.length >= 0) {
      setSelectedOrders([...ordersForSelectedDate.orders]);
    } else {
      setSelectedOrders([]);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5 lg:max-w-[70%] xl:max-w-none flex flex-col justify-start">
      <h1 className="text-[40px]">Report</h1>

      <div className="mt-5">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="Select a date"
        />

        {selectedDate && (
          <>
            <h3>Daily Report</h3>
            <table className="w-full text-sm text-center text-gray-500">
              <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Total Income
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyReport.map((entry) => (
                  <tr key={entry.date}>
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      ${entry.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* New table for individual orders */}
            <h3>Orders on {selectedDate.toLocaleDateString()}</h3>
            {selectedOrders && selectedOrders.length > 0 ? (
              <table className="w-full text-sm text-center text-gray-500">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Order ID
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Product
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.id}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.product}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        ${order?.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders for the selected date.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderReport;
