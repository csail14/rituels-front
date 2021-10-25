import axios from "axios";
import { config } from "../../config";

export const createCustomer = (data) => {
  return axios
    .post(config.api_url + "/create-checkout-session", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response;
    });
};
