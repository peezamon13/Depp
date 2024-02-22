import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
    if (ordersForSelectedDate && ordersForSelectedDate.orders.length > 0) {
      setSelectedOrders([...ordersForSelectedDate.orders]);
    } else {
      // No orders for the selected date, set selectedOrders to an empty array
      setSelectedOrders([])
    }
  };

  // // Function to generate PDF
  // const generatePDF = async () => {
  //   const doc = (
  //     <PDFDocument>
  //       <Page size="A4">
  //         <View>
  //           <Text>รายงานรายได้ตามวัน</Text>
  //           {/* Add your report data here */}
  //           {dailyReport.map((entry, index) => (
  //             <Text key={index}>
  //               วันที่: {entry.date} - รายได้ทั้งหมด: ฿{entry.total} - จำนวนคำสั่งซื้อ: {entry.orders.length}
  //             </Text>
  //           ))}
  //         </View>
  //       </Page>
  //     </PDFDocument>
  //   );

  //   const pdfBlob = await PDFDocument.create(doc).toBlob();
  //   saveAs(pdfBlob, 'daily_report.pdf');
  // };

  const generateExcel = () => {
    const data = [];
    let totalIncome = 0; // เพิ่มตัวแปรสำหรับเก็บราคารวม
  
    // Create an object to store order counts for each customer
    const orderCounts = {};
  
    // Iterate through selectedOrders
    selectedOrders.forEach((order) => {
      // Create a new object to store order data
      const orderData = {
        "ชื่อลูกค้า": order.customer,
        "ที่อยู่": order.address,
        "วันที่สั่ง": new Date(order.createdAt).toLocaleDateString(),
        "รายการอาหาร": order.products.map((product) => `${product.title} (${product.foodQuantity})`).join(', '),
        "ราคาทั้งหมด": order.total,
      };
  
      // Count orders for each customer
      if (order.customerName in orderCounts) {
        orderCounts[order.customerName]++;
      } else {
        orderCounts[order.customerName] = 1;
      }
  
      // เพิ่มราคารวม
      totalIncome += order.total;
  
      // Push the order data to the array
      data.push(orderData);
    });
  
    // เพิ่มข้อมูลราคารวมไปยัง data
    data.push({
      "ชื่อลูกค้า": "ราคารวม",
      "ที่อยู่": "",
      "วันที่สั่ง": "",
      "รายการอาหาร": "",
      "ราคาทั้งหมด": totalIncome, // ราคารวมทั้งหมด
    });
  
    // Find the customer with the most orders
    let maxOrdersCustomer = "";
    let maxOrdersCount = 0;
    for (const customer in orderCounts) {
      if (orderCounts[customer] > maxOrdersCount) {
        maxOrdersCustomer = customer;
        maxOrdersCount = orderCounts[customer];
      }
    }
  
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daily Orders");
  
    // Convert workbook to excel buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Convert excel buffer to Blob
    const excelBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
  
    // Save the Blob as Excel file
    saveAs(excelBlob, "daily_report.xlsx");
  
    console.log(`Customer with the most orders: ${maxOrdersCustomer} (${maxOrdersCount} orders)`);
  };
  
  


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5 lg:max-w-[70%] xl:max-w-none flex flex-col justify-start">
      <h1 className="text-[40px]">รายได้ต่อวัน</h1>

      <div className="mt-5">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          placeholderText="เลือกวันที่"
        />

        {selectedDate && (
          <>
            <h3>รายงาน</h3>
            <table className="w-full text-lg text-center text-white">
              <thead className="text-lg text-white uppercase bg-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    วันที่
                    วันที่
                  </th>
                  <th scope="col" className="py-3 px-6">
                    รายได้ทั้งหมด
                  </th>
                  <th scope="col" className="py-3 px-6">
                    จำนวนคำสั่งซื้อ
                  </th>
                </tr>
              </thead>
              <tbody>
                {dailyReport.map((entry) => (
                  <tr className="text-black" key={entry.date}>
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {entry.date}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      ฿{entry.total}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {entry.orders.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="overflow-x-auto w-full mt-5 max-h-[500px] overflow-auto" >
              {/* New table for individual orders */}
            <h3>รายการสั่งซื้อวันที่ {selectedDate.toLocaleDateString()}</h3>
            {selectedOrders && selectedOrders.length > 0 ? (
              <table className="w-full text-lg text-center text-white xl:min-w-[1000px]">
                <thead className="text-lg text-white uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      รายการที่
                    </th>
                    <th scope="col" className="py-3 px-6">
                      ชื่ออาหาร
                    </th>
                    <th scope="col" className="py-3 px-6">
                      ราคารวม
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrders.map((order, index) => (
                    <tr className="text-black" key={order.id}>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        {order?.products.map((product, index) => (
                          <span key={index}>
                            {product.title} * {product.foodQuantity} <br />
                          </span>
                        ))}
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap">
                        ฿{order?.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
                
              </table>
            ) : (
              <p>ไม่มียอดขายในวันนี้</p>
            )}
            </div>
          </>
        )}
        {/* <div>
          <button onClick={generatePDF}>Export เป็น PDF</button>
          </div> */}
          
        </div>
        <button className="btn-primary justify-start !bg-green-700 w-[150px] !pl-0 !pr-0"  onClick={generateExcel}>Export to Excel</button>
    </div>
  );
};

export default OrderReport;
