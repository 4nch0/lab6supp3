<template>
    <div>
      <h1>Sensor Data</h1>
      <ul>
        <li v-for="(data, index) in sensorData" :key="index">
          Temperature: {{ data.temperature }} °C, Humidity: {{ data.humidity }}%
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onValue } from "firebase/database";
  import { db } from "@/firebaseConfig"; // Adjust path based on your actual Firebase config file
  
  export default {
    name: "SensorData",
    data() {
      return {
        sensorData: [],
      };
    },
    created() {
      // Define reference to 'sensorData' in your Firebase Realtime Database
      const dataRef = ref(db, 'sensorData');
  
      // Listen for changes to 'sensorData' and update component's data
      onValue(dataRef, (snapshot) => {
        const dataArray = [];
        snapshot.forEach((childSnapshot) => {
          dataArray.push(childSnapshot.val());
        });
        this.sensorData = dataArray;
      });
    },
  };
  </script>
  