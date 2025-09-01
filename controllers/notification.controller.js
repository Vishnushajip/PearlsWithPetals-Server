import { db } from "../firebase/firebase.config.js";
import { sendNotification } from "../services/fcm.service.js";

export const notifyCEOs = async (req, res) => {
  try {
    const ceoSnapshot = await db.collection("CEO").get();

    const tokens = [];
    ceoSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.fcmToken) {
        tokens.push(data.fcmToken);
      }
    });

    if (tokens.length === 0) {
      return res
        .status(404)
        .json({ message: "No FCM tokens found in CEO collection." });
    }

    const result = await sendNotification(tokens, {
      title: "🛍️ New Order Received",
      body: "A customer just placed a new order. Time to pack and ship!",
    });

    res.json({ message: "Notifications sent successfully", result });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
