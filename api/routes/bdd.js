const mysql      = require('mysql'); 
const express = require('express');
const bdd = express();

const connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '',
          database : 'alternance_master_manager'
        });

module.exports = connection;