const express = require('express')
const jexiaSDK = require("jexia-sdk-js/node");
const app = express()
const port = process.env.PORT;

const dataModule = jexiaSDK.dataOperations();

const credentials = {
    projectID: process.env.PROJECT,
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
  };

jexiaSDK.jexiaClient().init(credentials, dataModule);
dataModule
  .dataset("ds1").select().execute().then(records => {
      
      app.get('/', (req, res) => res.send(records[0].msg));
    }).catch(error => console.error("Something wrong happened:", error));
app.listen(port, () => console.log("Example app listening on port ${port}!"));