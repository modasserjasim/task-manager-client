// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCTZpw1W7eqqJnZa6qwkUdXKv7r2KyQMd8",
    authDomain: "task-manager-bd.firebaseapp.com",
    projectId: "task-manager-bd",
    storageBucket: "task-manager-bd.appspot.com",
    messagingSenderId: "835521311549",
    appId: "1:835521311549:web:a825899c19b257c6e94b54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;