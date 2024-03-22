import express from "express";
import { crateCourse } from "./routes";

const app = express();

app.get("/", crateCourse)

app.listen(3333)
