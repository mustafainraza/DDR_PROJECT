import { Alert } from "react-native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import URL from "../config/env";
export async function createUser({ email, password, name, CNIC, contactno }) {
  const response = await axios.post(`http://${URL.abc}/Investors/register`, {
    email: email,
    password: password,
    name: name,
    CNIC: CNIC,
    contactno: contactno,
  });
  const token = response.data;
  return token;
}

export async function loginUser(email, password) {
  const response = await axios.post(`http://${URL.abc}/Investors/login`, {
    email: email,
    password: password,
  });
  const token = response.data;
  return token;
}
