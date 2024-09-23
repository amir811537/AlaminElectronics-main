import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ value }) => {



    console.log(value)
    const data = {
        labels: value?.map(item => item?.category) || [],
        datasets: [
            {
                label: '',
                data: value?.map(item => item?.totalProducts) || [],
                backgroundColor: 'rgba(100, 12, 192, 0.7)',
                borderColor: 'rgba(100, 192, 192, 1)',
                borderWidth: 1,
            },

        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                position: 'bottom',
                text: 'products count in each Category',
            },
        },
        height: '500px'
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
