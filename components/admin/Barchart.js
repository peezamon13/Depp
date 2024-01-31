import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import axios from "axios";



export default function BarChart() {
    const chartRef = useRef(null)
    const [chartData, setChartData] = useState([])

    const getProducts = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
            setChartData(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getProducts();
    }, []);
    useEffect(() => {
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy();
            }

            const context = chartRef.current.getContext("2d");
            
            const label = chartData.map((items) => items.customer)
            const data = chartData.map((items) => items.total)
            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: label,
                    datasets: [
                        {
                            // barPercentage: 1,
                            barThickness: 30,
                            label: "รายการอาหาร",
                            data: data,
                            BackgroundColor: [
                                "rgb(255, 99, 132, 0.2)",
                                "rgb(255, 159, 64, 0.2)",
                                "rgb(255, 205, 86, 0.2)",
                                "rgb(75, 192, 192, 0.2)",
                                "rgb(54, 152, 235, 0.2)",
                                "rgb(153, 102, 255, 0.2)",
                                "rgb(201, 203, 207, 0.2)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 152, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ],
                            borderWidth: 5,
                            borderRadius: 10,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: "ร้านอาหาร",
                        },
                    },
                    layout: {
                        padding: 40,
                    },
                    // responsive: true,
                    scales: {
                        x: {
                            type: "category"
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            chartRef.current.chart = newChart
        }
    }, [chartData]);
    return <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <canvas ref={chartRef}/>
    </div>;
}