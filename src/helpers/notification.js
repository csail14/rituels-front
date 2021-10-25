import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import axios from "axios";
import { config } from "../../config";

export const registerForPushNotificationsAsync = async (
  id,
  account,
  second_uuid
) => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    let data = {};
    if (account == "first") {
      data = {
        uuid: token.data,
        second_uuid: second_uuid,
        id: id,
      };
    } else if (account == "second") {
      data = {
        uuid: second_uuid,
        second_uuid: token.data,
        id: id,
      };
    }

    axios
      .put(config.api_url + "/api/v1/update/uuid", data)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });

    return token.data;
  } else {
    alert("Must use physical device for Push Notifications");
  }
};

export const sendNotification = (msg, token) => {
  let data = {
    token: token,
    msg: msg,
  };
  axios
    .post(config.api_url + "/api/v1/notification", data)
    .then((res) => {})
    .catch((err) => {
      console.log("err", err);
    });
};
