module.exports = app => {
  const customers = require("../controllers/customer.controller.js");
 
    // By Ashish Ji 
    app.post("/changePbank",customers.changePbank);
    app.post("/deletebank",customers.deletebank);
};
