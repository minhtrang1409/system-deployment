var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql304.epizy.com",
  user: "epiz_26775714",
  password: "JTBzmEk8txs",
  database: "epiz_26775714_medicalproject"
});

module.exports.VerifyEmail = function (email, callback) { 
    var sql = "UPDATE users SET verified = '1' WHERE email = '" + email +"'"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result.affectedRows + " record(s) updated");
        return callback(result.affectedRows)
    });
};

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
