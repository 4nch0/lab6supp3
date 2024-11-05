<template>
  <div>
    <h2>Sensor Data</h2>
    <div v-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="data in sensorData" :key="data.id">
        Humidity: {{ data.humidity !== null ? data.humidity : 'N/A' }},
        Temperature: {{ data.temperature !== null ? data.temperature : 'N/A' }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSensorStore } from '@/stores/sensorStore';

const sensorStore = useSensorStore();
const { sensorData, error, fetchSensorData } = sensorStore;

onMounted(() => {
  fetchSensorData();
});
</script>

<style scoped>
.sensor-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f6f8e2; /* Lightest Color */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  font-size: 2rem;
  color: #3c3d42; /* Dark Color */
}

.data-title {
  font-size: 1.5rem;
  color: #9ccd62; /* Accent Color */
}

.error-message {
  color: red;
  font-weight: bold;
}

.data-display {
  width: 100%;
  max-width: 600px; /* Limit width for better readability */
  background-color: #e0ddca; /* Semi-lightest Color */
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto; /* Allow horizontal scrolling if needed */
}

.no-data {
  color: #3c3d42; /* Dark Color */
  font-style: italic;
}
</style>
