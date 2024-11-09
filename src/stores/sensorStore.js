import { db, ref, set, get, update, remove, push } from '@/firebaseConfig';
import { reactive, toRefs } from 'vue';

export const useSensorStore = () => {
  const state = reactive({
    sensorData: [],
    error: null,
  });

  // Function to load data from cache or Firebase
  const loadData = async () => {
    const cachedData = await getFromCache();
    if (cachedData) {
      state.sensorData = cachedData;
    } else {
      await fetchSensorData();
      await saveToCache(state.sensorData);
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

  // Function to retrieve data from the cache
  const getFromCache = async () => {
    const cachedData = localStorage.getItem('sensorData');
    return cachedData ? JSON.parse(cachedData) : null;
  };

  // Function to save data to the cache
  const saveToCache = async (data) => {
    localStorage.setItem('sensorData', JSON.stringify(data));
  };

  // Create new sensor data
  const createSensorData = async (newSensor) => {
    const sensorRef = ref(db, 'sensorData');
    try {
      const newSensorRef = push(sensorRef);
      await set(newSensorRef, newSensor);
      state.sensorData.push({ id: newSensorRef.key, ...newSensor });
      await saveToCache(state.sensorData);
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
        await saveToCache(state.sensorData);
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
      await saveToCache(state.sensorData);
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
    loadData,
    getFromCache,  // Added for potential external calls if needed
    saveToCache,   // Added for potential external calls if needed
  };
};
