<template>
  <div id="app">
    <h1>Welcome to the Sensor Dashboard</h1>
<<<<<<< HEAD
    <sensorData />
=======
>>>>>>> b803b7b (malopit na to sir act2)
    <sensorManager />
  </div>
</template>

<script>
<<<<<<< HEAD
import sensorData from './components/sensorData.vue'; // Ensure the casing matches the filename
=======
import { useSensorStore } from './stores/sensorStore';
>>>>>>> b803b7b (malopit na to sir act2)
import sensorManager from './components/sensorManager.vue';
import { onMounted } from 'vue';

export default {
  name: 'App',
  components: {
<<<<<<< HEAD
    sensorData, sensorManager
=======
    sensorManager
  },
  setup() {
    // Initialize the store
    const sensorStore = useSensorStore();

    // Load initial data on app startup
    onMounted(() => {
      sensorStore.loadData();
    });

    return {
      ...sensorStore // Makes sensor data available in the template if needed
    };
>>>>>>> b803b7b (malopit na to sir act2)
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
