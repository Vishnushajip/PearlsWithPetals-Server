import { messaging } from "../firebase/firebase.config.js";

export const sendNotification = async (tokens, notification) => {
  const message = {
    notification,
    tokens,
  };

  return await messaging.sendEachForMulticast(message);
};
