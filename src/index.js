const path = require("path");
const route = require("./routes");
const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const app = express();
const globalVars = require("./apps/middlewares/GlobalVar");
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 4001;

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

// Tăng giới hạn cho JSON body
app.use(express.json({ limit: "50mb" }));

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.use(cookieParser());

// Static file
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "utils")));

app.use(globalVars);

// Template engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: require("./helpers/handlebars")
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

app.listen(port, () => console.log(`App is listening at port ${port}`));
