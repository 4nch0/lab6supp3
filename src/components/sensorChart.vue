<template>
    <div>
      <canvas ref="myChart"></canvas>
    </div>
  </template>
  
  <script>
  import { ref, watch, onBeforeUnmount } from 'vue';
  import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
  
  // Register all necessary components (scales, controllers, etc.)
  Chart.register(...registerables);
  
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const myChart = ref(null);
      let chartInstance = null; // Variable to hold the chart instance
  
      const renderChart = () => {
        // Destroy previous chart instance if it exists
        if (chartInstance) {
          chartInstance.destroy();
        }
  
        const labels = props.data.map(item => item.key); // Modify this based on your data structure
        const temperatures = props.data.map(item => item.temperature); // Adjust according to your data keys
        const humidities = props.data.map(item => item.humidity); // Adjust according to your data keys
  
        chartInstance = new Chart(myChart.value, {
          type: 'line', // Change to your desired chart type
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Temperature',
                data: temperatures,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
              },
              {
                label: 'Humidity',
                data: humidities,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                type: 'linear', // Ensure the correct scale type is set
              },
            },
          },
        });
      };
  
      // Watch for changes in props.data and re-render the chart
      watch(
        () => props.data,
        (newData) => {
          if (newData.length) {
            renderChart();
          }
        },
        { immediate: true } // Render chart immediately on mount
      );
  
      // Cleanup chart instance on component unmount
      onBeforeUnmount(() => {
        if (chartInstance) {
          chartInstance.destroy();
        }
      });
  
      return {
        myChart,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  