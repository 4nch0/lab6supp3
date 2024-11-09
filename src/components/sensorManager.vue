<template>
  <div class="sensor-manager">
    <h2 class="heading">Manage Sensor Data</h2>
    
    <!-- Form to add a new sensor -->
    <form @submit.prevent="addSensor" class="sensor-form">
      <input 
        v-model="newSensor.humidity" 
        placeholder="Humidity (%)" 
        required 
        class="sensor-input" 
      />
      <input 
        v-model="newSensor.temperature" 
        placeholder="Temperature (°C)" 
        required 
        class="sensor-input" 
      />
      <button type="submit" class="submit-btn">Add Sensor</button>
    </form>

    <!-- Buttons to handle cache operations -->
    <div class="cache-buttons">
      <button @click="loadCache" class="load-btn">Load from Cache</button>
      <button @click="clearCache" class="clear-btn">Clear Cache</button>
    </div>

    <!-- Sensor list -->
    <ul class="sensor-list">
      <li v-for="sensor in sensorData" :key="sensor.id" class="sensor-item">
        <span class="sensor-details">
          Humidity: {{ sensor.humidity }}% - Temperature: {{ sensor.temperature }}°C
        </span>
        <div class="button-group">
          <button @click="editSensor(sensor.id)" class="edit-btn">Edit</button>
          <button @click="removeSensor(sensor.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Feedback messages -->
    <p v-if="feedbackMessage" :class="feedbackType" class="feedback-message">{{ feedbackMessage }}</p>
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
      loadData,  // Importing loadData from your store
    } = useSensorStore();
    
    const newSensor = ref({ humidity: '', temperature: '' });
    const feedbackMessage = ref('');
    const feedbackType = ref('');

    // Add a new sensor
    const addSensor = async () => {
      try {
        await createSensorData({
          humidity: newSensor.value.humidity,
          temperature: newSensor.value.temperature,
        });
        feedbackMessage.value = "Sensor added successfully!";
        feedbackType.value = "success";
        clearInputs();
        await fetchSensorData();  // Reload sensor data after adding
      } catch (err) {
        feedbackMessage.value = `Error adding sensor: ${err.message}`;
        feedbackType.value = "error";
      }
    };

    // Remove a sensor
    const removeSensor = async (id) => {
      try {
        await deleteSensorData(id);
        feedbackMessage.value = "Sensor deleted successfully!";
        feedbackType.value = "info";
        await fetchSensorData();  // Reload sensor data after deleting
      } catch (err) {
        feedbackMessage.value = `Error deleting sensor: ${err.message}`;
        feedbackType.value = "error";
      }
    };

    // Edit a sensor
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
          await fetchSensorData();  // Reload sensor data after editing
        } catch (err) {
          feedbackMessage.value = `Error updating sensor: ${err.message}`;
          feedbackType.value = "error";
        }
      } else {
        feedbackMessage.value = "Update canceled or invalid input.";
        feedbackType.value = "error";
      }
    };

    // Clear the form inputs
    const clearInputs = () => {
      newSensor.value.humidity = '';
      newSensor.value.temperature = '';
    };

    // Handle loading data from cache (localStorage)
    const loadCache = () => {
      loadData(); // Load data from localStorage if available
    };

    // Clear the cache (localStorage)
    const clearCache = () => {
      localStorage.removeItem('sensorData');
      feedbackMessage.value = "Cache cleared!";
      feedbackType.value = "info";
      sensorData.value = [];  // Clear sensor data after cache is cleared
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
      loadCache,
      clearCache,
    };
  },
};
</script>

<style scoped>
/* General Layout */
.sensor-manager {
  font-family: 'Roboto', sans-serif;
  padding: 3rem;
  background: linear-gradient(135deg, #9CCD62, #3C3D42);
  border-radius: 15px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: 50px auto;
  color: white;
}

.heading {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Form Styling */
.sensor-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sensor-input {
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #f1f1f1;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  transition: all 0.3s ease-in-out;
}

.sensor-input:focus {
  border-color: #9CCD62;
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
}

/* Button Styling */
.submit-btn {
  padding: 1rem;
  background-color: #F8C471;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #E67E22;
}

/* Cache Buttons */
.cache-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.load-btn, .clear-btn {
  padding: 1rem;
  background-color: #E67E22;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.load-btn:hover {
  background-color: #D35400;
}

.clear-btn:hover {
  background-color: #F39C12;
}

/* Sensor Item Styling */
.sensor-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sensor-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;
}

.sensor-item:hover {
  transform: translateY(-5px);
}

.sensor-details {
  font-size: 1.1rem;
  font-weight: 500;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .delete-btn {
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
}

.delete-btn:hover {
  background-color: #c0392b;
}

/* Feedback Messages */
.feedback-message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  transition: opacity 0.3s ease;
}

.success {
  background-color: #27ae60;
  color: white;
}

.info {
  background-color: #1abc9c;
  color: white;
}

.error {
  background-color: #e74c3c;
  color: white;
}
</style>
