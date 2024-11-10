// firebase-config.js
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBn7nYnu7ZnoaqB0Qin1doAMHs441Yhu8Q",
  authDomain: "themvdetail.firebaseapp.com",
  databaseURL: "https://themvdetail-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "themvdetail",
  storageBucket: "themvdetail.firebasestorage.app",
  messagingSenderId: "800809902995",
  appId: "1:800809902995:web:afe2d353fa50430ea5be66",
  measurementId: "G-L0M1B2CG55"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
export { database };
