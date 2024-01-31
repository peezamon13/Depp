import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderReport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [dailyReport, setDailyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        const orders = res.data;

        // Calculate total income and create a daily and monthly report
        const total = orders.reduce((sum, order) => sum + order.total, 0);

        setTotalIncome(total);

        const dailyOrders = orders.reduce((acc, order) => {
          const date = new Date(order.createdAt).toLocaleDateString();

          if (!acc[date]) {
            acc[date] = {
              date,
              total: 0,
            };
          }

          acc[date].total += order.total;

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
      <h1 addClass="text-[40px]">Report</h1>

      <div className="mt-5">
        

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

        <h3 className="mt-5">Monthly Report</h3>
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Month-Year
              </th>
              <th scope="col" className="py-3 px-6">
                Total Income
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlyReport.map((entry) => (
              <tr key={entry.monthYear}>
                <td className="py-4 px-6 font-medium whitespace-nowrap">
                  {entry.monthYear}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap">
                  ${entry.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderReport;
