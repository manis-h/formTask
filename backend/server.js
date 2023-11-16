import cookieParser from "cookie-parser";
import cities from "./cities.js";
import express from "express";
import mongoose from "mongoose";
import { db } from "./database.js";
import cors from "cors";
import states from "./stateModel.js";
import forms from "./Models/forms.js";
const app = express();
// using middleware

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],

    secure: true,
  })
);

app.use(express.json());

db();
app.get("/", (req, res) => {
  res.send("Server is working ");
  console.log("Cookies: ", req.cookies);
}),
  app.get("/states", async (req, res) => {
    const state = cities;

    let newstates = [];
    cities?.map((i) => {
      newstates.push(i.state);
    });
    newstates = [...new Set(newstates)];

    return res.status(200).json({
      state: newstates,
    });
  });

//Cities
app.get("/cities", async (req, res) => {
  const { state } = req.query;

  let newstates = [];
  cities?.map((i) => {
    i?.state == state && newstates.push(i.name);
  });
  newstates = [...new Set(newstates)];
  return res.status(200).json({
    city: newstates,
    state,
  });
});
// Post Form
app.post("/form", async (req, res) => {
  const { form } = req.body;
  const { firstName, lastName, email, age, gender, country, state, city } =
    form;
  const data = new forms({
    firstName,
    lastName,
    email,
    age,
    gender,
    country,
    state,
    city,
  });
  await data.save();
  console.log({ form });
  return res.status(200).json({
    form,
    data,
  });
});

//Get Forms
app.get("/form", async (req, res) => {
  const data = await forms.find();
  return res.status(200).json({
    data,
  });
});
app.listen(4000);
