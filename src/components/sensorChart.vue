<!-- src/components/SensorChart.vue -->
<template>
  <div>
    <h2>Sensor Chart</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';

export default {
  props: {
    sensorData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref(null);
    let chartInstance = null;

    onMounted(() => {
      Chart.register(...registerables);
      createChart();
    });

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy(); // Cleanup the chart instance
      }
    });

    const createChart = () => {
      const ctx = chartCanvas.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'line', // or any other type
        data: {
          labels: props.sensorData.map((data) => data.timestamp), // Assuming you have a timestamp
          datasets: [
            {
              label: 'Temperature (°C)',
              data: props.sensorData.map((data) => data.temperature),
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false,
            },
            {
              label: 'Humidity (%)',
              data: props.sensorData.map((data) => data.humidity),
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Timestamp',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Value',
              },
            },
          },
        },
      });
    };

    return {
      chartCanvas,
    };
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
