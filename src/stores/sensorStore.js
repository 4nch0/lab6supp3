import { db, ref, set, get, update, remove, push } from '@/firebaseConfig';
import { reactive, toRefs } from 'vue';  // Add this import

export const useSensorStore = () => {
  const state = reactive({
    sensorData: [],
    error: null,
  });

// Load data from localStorage or Firebase
const loadData = async () => {
  const storedData = localStorage.getItem('sensorData');
  if (storedData) {
    state.sensorData = JSON.parse(storedData);
  } else {
    await fetchSensorData();
    localStorage.setItem('sensorData', JSON.stringify(state.sensorData)); // Add this line
  }
};


  // Fetch all sensor data from Firebase
  const fetchSensorData = async () => {
    const sensorRef = ref(db, 'sensorData');
    try {
      const snapshot = await get(sensorRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        state.sensorData = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        localStorage.setItem('sensorData', JSON.stringify(state.sensorData));
        state.error = null;
      } else {
        state.sensorData = [];
        state.error = 'No data available.';
      }
    } catch (err) {
      state.error = 'Error fetching sensor data: ' + err.message;
      console.error(state.error);
    }
  };

  // Create new sensor data
  const createSensorData = async (newSensor) => {
    const sensorRef = ref(db, 'sensorData');
    try {
      const newSensorRef = push(sensorRef);
      await set(newSensorRef, newSensor);
      state.sensorData.push({ id: newSensorRef.key, ...newSensor });
      localStorage.setItem('sensorData', JSON.stringify(state.sensorData));
    } catch (err) {
      state.error = 'Error creating sensor data: ' + err.message;
      console.error(state.error);
    }
  };

  // Update existing sensor data
  const updateSensorData = async (id, updatedData) => {
    const sensorRef = ref(db, `sensorData/${id}`);
    try {
      await update(sensorRef, updatedData);
      const index = state.sensorData.findIndex(sensor => sensor.id === id);
      if (index !== -1) {
        state.sensorData[index] = { ...state.sensorData[index], ...updatedData };
        localStorage.setItem('sensorData', JSON.stringify(state.sensorData));
      }
    } catch (err) {
      state.error = 'Error updating sensor data: ' + err.message;
      console.error(state.error);
    }
  };

  // Delete sensor data
  const deleteSensorData = async (id) => {
    const sensorRef = ref(db, `sensorData/${id}`);
    try {
      await remove(sensorRef);
      state.sensorData = state.sensorData.filter(sensor => sensor.id !== id);
      localStorage.setItem('sensorData', JSON.stringify(state.sensorData));
    } catch (err) {
      state.error = 'Error deleting sensor data: ' + err.message;
      console.error(state.error);
    }
  };

  // Load initial data
  loadData();

  return {
    ...toRefs(state),
    fetchSensorData,
    createSensorData,
    updateSensorData,
    deleteSensorData,
    loadData,  // Add this line
  };  
};
