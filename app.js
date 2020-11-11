const express = require('express');
const app = express();
const router = express.Router();
const connection = require('./bdd');
const react = require('react');
//const cors = require('cors');

router.get('/user', (req,res) => {
	connection.connect();
    
	getUser(req,res);
	
	connection.end();
});

router.get('/', (req, res) => res.send('Hello World!'));

function getUser(req,res){
            connection.query('SELECT * FROM UTILISATEUR', function (error, results, fields) {
              if (error) throw error;
              res.send(results);
            })
            
    }

function insertUser(){
        return new Promise((resolve,reject)=>{
            connection.query('INSERT INTO UTILISATEUR (idUtilisateur,nom,prenom) VALUES (3,"Patrick","Bruel")', function (error, results, fields) {
              if (error){
                resolve();   
              } else{
                reject("Erreur d'insertion");    
              }
            })
        });
    }

async function testAsync(req, res){
      await insertUser(req,res);
      getUser(req,res);
   }


app.use('/', router);



module.exports = app;

