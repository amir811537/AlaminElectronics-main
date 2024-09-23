import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineCharts = () => {
  // Generate fake sales data for 30 days
  const generateSalesData = () => {
    let salesData = [];
    for (let i = 0; i < 30; i++) {
      salesData.push(Math.floor(Math.random() * 100) + 1); // Random sales count between 1 and 100
    }
    return salesData;
  };

  const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1), // Labels for 30 days
    datasets: [
      // {
      //   label: 'Sales Count',
      //   data: generateSalesData(),
      //   fill: false,
      //   backgroundColor: 'blue',
      //   borderColor: 'rgba(0, 0, 255, 0.4 )',
      //   tension: 0.4
      // },
      {
        label: 'Product Sell',
        data: [1000, 7000, 8000, 12000, 10000, 16000, 25000,20000 , 25000, 20000, 39000, 29000 ,0 , 0, 30000 , 42000 , 45000 , 52000],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension : 0.5
      },
      
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        padding : 20
      },
      title: {
        display: true,
        position : 'bottom',
        padding: {
            top: 20, // Add padding above the title (optional)
            bottom: 30, // Add padding below the title to increase the gap
          },
        text: 'Sales Count for the Last 30 Days',
      },
      
    },
  };

  return <Line data={data} options={options} />;
};

export default LineCharts;
