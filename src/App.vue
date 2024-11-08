<template>
  <div id="app">
    <h1>Welcome to the Sensor Dashboard</h1>
    <sensorData />
    <sensorManager />
  </div>
</template>

<script>
import sensorData from './components/sensorData.vue'; // Ensure the casing matches the filename
import sensorManager from './components/sensorManager.vue';

export default {
  name: 'App',
  components: {
    sensorData, sensorManager
  }
}
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
