import Routes from "@/router/Routes"
import { useEffect, useState } from "react";
import { requestFCMToken } from "./firebase/firebase";
import { onMessage } from "firebase/messaging";
function App() {
 
  const [fcmToken, setFcmToken] = useState("");
  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token);
        console.log("FCM Token:", token);
      } catch (err) {
        console.error("Error getting FCM token", err);
      }
    };

    fetchFCMToken();
  }, []);

  return (
    <>

<Routes/>
     
      
    </>
  )
}

export default App
