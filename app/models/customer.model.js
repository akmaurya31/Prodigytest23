const sql = require("./db.js");
const Customer = function(customer) {
 
};

Customer.change_bank = (email,bank_id, result) => {
      let sqlquery="SELECT *,user_bank.id as bid FROM users INNER JOIN user_bank ON users.id=user_bank.user_id where users.email='"+`${email}`+"'";
          
      sql.query(sqlquery, (err, res) => {  
      if (Array.isArray(res) && res.length) {

              let my_user_id = res[0].user_id; 
              let my_bank_id= bank_id;
      console.log("Email found");
      let sql_userbank = "update user_bank set isprimary_bank=0 where user_id="+`${my_user_id}`; 
     
      sql.query(sql_userbank, function (err, resvv) {

        console.log("Bank Details updated to 0: ",my_user_id);
       
        sql_userbank = "update user_bank set isprimary_bank=1 where user_id="+`${my_user_id}`+" and id="+`${my_bank_id}`; 
     
      sql.query(sql_userbank, function (err, resvv) {
        console.log("sql: ",sql_userbank);
        if(resvv.affectedRows>0){
         console.log("Bank Details updated: ",resvv);
        result(null,{ status:200, message:"Bank Details updated "});
        }
        else{
          console.log("Bank Details not updated, bankid not found : ",resvv);
        result(null,{ status:400, message:"Bank Details not updated, bankid not found."});
        }
      });
      });
       
          }
            else{   
              console.log("Email not found"); 
             console.log(sqlquery)
             result(null,{ status:400, message:"Email not found " }); 
          }  
        });
        
        };


module.exports = Customer;
