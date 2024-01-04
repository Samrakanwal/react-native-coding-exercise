import Constants from "expo-constants";
import axios from "axios";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});
