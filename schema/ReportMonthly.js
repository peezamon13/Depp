import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrderReport = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
        const orders = res.data;

        const total = orders.reduce((sum, order) => sum + order.total, 0);
        setTotalIncome(total);

        const monthlyOrders = orders.reduce((acc, order) => {
          const monthYear = new Date(order.createdAt).toLocaleDateString('th-TH', { month: 'long', year: 'numeric' });

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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const filteredMonthlyReport = selectedMonth
    ? monthlyReport.filter((entry) => entry.monthYear === selectedMonth)
    : monthlyReport;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-start">
      <h1 className="text-[40px]">รายได้ต่อเดือน</h1>

      <div className="mt-5">
        <label htmlFor="monthDropdown" className="mr-2">
          เลือกเดือน:
        </label>
        <select
          id="monthDropdown"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">ทุกเดือน</option>
          {monthlyReport.map((entry) => (
            <option key={entry.monthYear} value={entry.monthYear}>
              {entry.monthYear}
            </option>
          ))}
        </select>

        <h3>รายงานรายได้ต่อเดือน</h3>
        <h3>รายได้รายเดือน</h3>
        <table className="w-full text-sm text-center text-gray-500">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                เดือน-ปี
                เดือน-ปี
              </th>
              <th scope="col" className="py-3 px-6">
                รายได้ทั้งหมด
                รายได้ทั้งหมด
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMonthlyReport.map((entry) => (
              <tr key={entry.monthYear}>
                <td className="py-4 px-6 font-medium whitespace-nowrap">
                  {entry.monthYear}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap">
                  ฿{entry.total}
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
