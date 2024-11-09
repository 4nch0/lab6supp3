<template>
  <div class="sensor-manager">
    <h2 class="heading">Manage Sensor Data</h2>
    
    <form @submit.prevent="addSensor" class="sensor-form">
      <input 
        v-model="newSensor.humidity" 
        placeholder="Humidity" 
        required 
        class="sensor-input" 
      />
      <input 
        v-model="newSensor.temperature" 
        placeholder="Temperature" 
        required 
        class="sensor-input" 
      />
      <button type="submit" class="submit-btn">Add Sensor</button>
    </form>

    <ul class="sensor-list">
      <li v-for="sensor in sensorData" :key="sensor.id" class="sensor-item">
        <span class="sensor-details">
          Humidity: {{ sensor.humidity }} - Temperature: {{ sensor.temperature }}
        </span>
        <div class="button-group">
          <button @click="editSensor(sensor.id)" class="edit-btn">Edit</button>
          <button @click="removeSensor(sensor.id)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>

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
/* General Layout */
.sensor-manager {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  background: #f4f4f9;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.heading {
  font-size: 2rem;
  color: #3C3D42;
  text-align: center;
  margin-bottom: 1.5rem;
}

/* Form Styling */
.sensor-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.sensor-input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.sensor-input:focus {
  border-color: #9CCD62;
  outline: none;
}

/* Button Styling */
.submit-btn {
  padding: 1rem;
  background-color: #9CCD62;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #82b75e;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  padding: 0.6rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #f1a7a7;
}

.edit-btn:hover {
  background-color: #e87d7d;
}

.delete-btn {
  background-color: #f4a261;
}

.delete-btn:hover {
  background-color: #e77b3d;
}

/* List Styling */
.sensor-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sensor-item {
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sensor-details {
  font-size: 1rem;
  color: #3C3D42;
}

.feedback-message {
  margin-top: 1rem;
  padding: 0.8rem;
  text-align: center;
  border-radius: 8px;
  font-weight: bold;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}

@media (max-width: 600px) {
  .sensor-manager {
    padding: 1rem;
  }

  .submit-btn {
    font-size: 1rem;
  }
}
</style>
