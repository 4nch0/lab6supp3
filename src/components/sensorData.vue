<template>
    <div>
      <h2>Sensor Data</h2>
      <sensor-chart :data="sensorData" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { database } from '../firebaseConfig.js'; // Adjust the path based on your structure
  import { ref as firebaseRef, onValue } from 'firebase/database';
  import SensorChart from './sensorChart.vue';
  
  export default {
    components: {
      SensorChart
    },
    setup() {
      const sensorData = ref([]);
  
      const fetchSensorData = () => {
        const dataRef = firebaseRef(database, 'sensorData'); // Adjust this path as needed
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            sensorData.value = Object.entries(data).map(([key, value]) => ({
              key,
              ...value,
            }));
          }
        });
      };
  
      onMounted(() => {
        fetchSensorData();
      });
  
      return {
        sensorData,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  