import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Example data for pending and completed orders this month
  const data = {
    labels: ['Pending Orders', 'Completed Orders' ],
    datasets: [
      {
        label: 'Orders',
        data: [30, 70], // Example: 30 pending orders, 70 completed orders
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)', // Color for Pending Orders
          'rgba(0, 0, 255, 0.8)', // Color for Completed Orders
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Border color for Pending Orders
          'rgba(75, 192, 192, 1)', // Border color for Completed Orders
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
   
        position: 'bottom',
        labels: {
          paddingTop: 20, // Space around legend items
        },
      },
      title: {
        display: true,
        position : 'bottom',
        text: 'Order Status for This Month',
        padding: {
          top: 20,
          // bottom: 30, // Space below the title
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
