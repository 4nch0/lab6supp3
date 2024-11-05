<template>
  <div>
    <h1>Sensor Data</h1>
    <div v-if="feedbackMessage" :class="`feedback-${feedbackType}`">{{ feedbackMessage }}</div>

    <form @submit.prevent="addSensor">
      <input v-model="newSensor.humidity" placeholder="Humidity" />
      <input v-model="newSensor.temperature" placeholder="Temperature" />
      <button type="submit">Add Sensor</button>
    </form>

    <div v-if="sensorData.length">
      <ul>
        <li v-for="sensor in sensorData" :key="sensor.id">
          {{ sensor.humidity }} - {{ sensor.temperature }}
          <button @click="editSensor(sensor.id)">Edit</button>
          <button @click="removeSensor(sensor.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useSensorStore } from '@/stores/sensorStore';

export default {
  setup() {
    const { sensorData, fetchSensorData, createSensorData, updateSensorData, deleteSensorData } = useSensorStore();
    const newSensor = ref({ humidity: '', temperature: '' });
    const feedbackMessage = ref('');
    const feedbackType = ref('');

    const addSensor = async () => {
      await createSensorData({ humidity: newSensor.value.humidity, temperature: newSensor.value.temperature });
      feedbackMessage.value = "Sensor added successfully!";
      feedbackType.value = "success";
      clearInputs();
    };

    const removeSensor = async (id) => {
      await deleteSensorData(id);
      feedbackMessage.value = "Sensor deleted successfully!";
      feedbackType.value = "info";
    };

    const editSensor = async (id) => {
      const updatedData = { 
        humidity: prompt('Enter new humidity:', ''), 
        temperature: prompt('Enter new temperature:', '') 
      };
      if (updatedData.humidity && updatedData.temperature) {
        await updateSensorData(id, updatedData);
        feedbackMessage.value = "Sensor updated successfully!";
        feedbackType.value = "success";
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
.feedback-success {
  color: green;
}

.feedback-info {
  color: blue;
}

.feedback-error {
  color: red;
}
</style>
