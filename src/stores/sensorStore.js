import { reactive, toRefs } from 'vue';
import { get, ref as dbRef } from 'firebase/database';
import { database } from '@/firebaseConfig.js'; // Adjust the import based on your setup

export const useSensorStore = () => {
  const state = reactive({
    sensorData: [],
    error: null,
  });

  const fetchSensorData = async () => {
    const sensorRef = dbRef(database, 'sensorData');
    try {
      const snapshot = await get(sensorRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('Raw sensor data:', data);
        
        // Normalize the data
        state.sensorData = Object.entries(data).map(([key, value]) => ({
          id: key,
          humidity: value.humidity !== undefined ? value.humidity : null,
          temperature: value.temperature !== undefined ? value.temperature : null,
        }));

        console.log('Normalized sensor data:', state.sensorData);
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

  return { ...toRefs(state), fetchSensorData };
};
