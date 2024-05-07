import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import KategoriRoute from "./routes/KategoriRoute.js";
import TransaksiRoute from "./routes/TransaksiRoute.js";
import SubKategori from "./routes/SubKategoriRoute.js";
import AnggaranRoute from "./routes/AnggaranRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(KategoriRoute);
app.use(TransaksiRoute);
app.use(SubKategori);
app.use(AnggaranRoute);

app.listen(5000, () => console.log("Server up and running..."));
