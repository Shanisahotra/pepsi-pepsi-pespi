import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyAlsnfkGuH08yAE5MHUqvrPPBqWYwoYD1I",
  authDomain: "authenticaion-2288f.firebaseapp.com",
  projectId: "authenticaion-2288f",
  storageBucket: "authenticaion-2288f.firebasestorage.app",
  messagingSenderId: "670020774492",
  appId: "1:670020774492:web:232d1011ed53254d4a5499",
  measurementId: "G-EMJ8GXW20N"
};


const vapiKey = "BKQ_6D42T0SslXshrVft2dR-TJrIfBW6aVH4wOmhLXqla-Mh9SyW9rZROybDW4qnmKM2VGJ_gTBQbYtuZYn22qI"
const app = initializeApp(firebaseConfig)

export const messaging = getMessaging(app);


export const requestFCMToken = async () =>{
    return Notification.requestPermission()
    .then((permission)=>{
        if(permission === "granted"){
            return getToken(messaging, {vapiKey})
        }else{
            throw new Error("Notification not granted");
        }
    })
    .catch((err) =>{
        console.error("Error getting FCM token: ", err);
        throw err
    })
}