<template>
    <div>
      <h2>Manage Sensor Data</h2>
      <form @submit.prevent="addSensor">
        <input v-model="newSensor.humidity" placeholder="Humidity" required />
        <input v-model="newSensor.temperature" placeholder="Temperature" required />
        <button type="submit">Add Sensor</button>
      </form>
  
      <ul>
        <li v-for="sensor in sensorData" :key="sensor.id">
          Humidity: {{ sensor.humidity }} - Temperature: {{ sensor.temperature }}
          <button @click="editSensor(sensor.id)">Edit</button>
          <button @click="removeSensor(sensor.id)">Delete</button>
        </li>
      </ul>
  
      <p v-if="feedbackMessage" :class="feedbackType">{{ feedbackMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useSensorStore } from '@/stores/sensorStore';
  
  export default {
    setup() {
      const {
        sensorData,
        fetchSensorData,
        createSensorData,
        updateSensorData,
        deleteSensorData,
      } = useSensorStore();
      const newSensor = ref({ humidity: '', temperature: '' });
      const feedbackMessage = ref('');
      const feedbackType = ref('');
  
      const addSensor = async () => {
        try {
          await createSensorData({
            humidity: newSensor.value.humidity,
            temperature: newSensor.value.temperature,
          });
          feedbackMessage.value = "Sensor added successfully!";
          feedbackType.value = "success";
          clearInputs();
        } catch (err) {
          feedbackMessage.value = `Error adding sensor: ${err.message}`;
          feedbackType.value = "error";
        }
      };
  
      const removeSensor = async (id) => {
        try {
          await deleteSensorData(id);
          feedbackMessage.value = "Sensor deleted successfully!";
          feedbackType.value = "info";
        } catch (err) {
          feedbackMessage.value = `Error deleting sensor: ${err.message}`;
          feedbackType.value = "error";
        }
      };
  
      const editSensor = async (id) => {
        const updatedData = {
          humidity: prompt('Enter new humidity:', ''),
          temperature: prompt('Enter new temperature:', ''),
        };
        if (updatedData.humidity && updatedData.temperature) {
          try {
            await updateSensorData(id, updatedData);
            feedbackMessage.value = "Sensor updated successfully!";
            feedbackType.value = "success";
          } catch (err) {
            feedbackMessage.value = `Error updating sensor: ${err.message}`;
            feedbackType.value = "error";
          }
        } else {
          feedbackMessage.value = "Update canceled or invalid input.";
          feedbackType.value = "error";
        }
      };
  
      const clearInputs = () => {
        newSensor.value.humidity = '';
        newSensor.value.temperature = '';
      };
  
      onMounted(() => {
        fetchSensorData();
      });
  
      return {
        sensorData,
        newSensor,
        addSensor,
        removeSensor,
        editSensor,
        feedbackMessage,
        feedbackType,
      };
    },
  };
  </script>
  
  <style scoped>
  .success {
    color: green;
  }
  
  .info {
    color: blue;
  }
  
  .error {
    color: red;
  }
  </style>
  