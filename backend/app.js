
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  const express = require("express");
  const app = express();
  const cors = require("cors");
  const router = require('./routers');
  const port = process.env.PORT || 4000;
  const path = require('path');
  
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use('/uploads',express.static('uploads'))
  app.use("/", router);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
  