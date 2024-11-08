<template>
  <div class="container">
    <h2 class="header">Manage Sensor Data</h2>
    
    <form @submit.prevent="addSensor" class="form">
      <div class="form-group">
        <input v-model="newSensor.humidity" placeholder="Humidity" required class="input-field" />
      </div>
      <div class="form-group">
        <input v-model="newSensor.temperature" placeholder="Temperature" required class="input-field" />
      </div>
      <button type="submit" class="submit-btn">Add Sensor</button>
    </form>

    <!-- Feedback message placed right below the form -->
    <p v-if="feedbackMessage" :class="feedbackType" class="feedback-message">{{ feedbackMessage }}</p>

    <ul class="sensor-list">
      <li v-for="sensor in sensorData" :key="sensor.id" class="sensor-item">
        <span class="sensor-info">
          Humidity: {{ sensor.humidity }} - Temperature: {{ sensor.temperature }}
        </span>
        <div class="button-group">
          <button @click="editSensor(sensor.id)" class="edit-btn">Edit</button>
          <button @click="removeSensor(sensor.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>
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
/* General Container */
.container {
  width: 80%;
  margin: 20px auto;
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fb;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #4b8b3b;
}

.submit-btn {
  padding: 10px 20px;
  width: 100%;
  background-color: #4b8b3b;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #397533;
}

/* Feedback Message */
.feedback-message {
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 20px;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
}

/* Sensor List */
.sensor-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sensor-item {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sensor-info {
  font-size: 1.1rem;
  color: #333;
}

.button-group {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 8px 15px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #4b8b3b;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.edit-btn:hover {
  background-color: #397533;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
