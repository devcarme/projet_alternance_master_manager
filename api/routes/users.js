var express = require('express');
var router = express.Router();
var connection = require('./bdd');
var session = require('express-session');
var bodyParser = require("body-parser");
var isLoggedIn = false;
var redirection = null;
var userSession = "";

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Session Setup 
router.use(session({  
    secret: 'Your_Secret_Key', 
    resave: true,
    saveUninitialized: true
})) 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

router.get('/getAll', (req,res, next) => {
    connection.query('SELECT * FROM UTILISATEUR', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.post('/',(req,res, next) => {
    var isUser = "SELECT * FROM UTILISATEUR WHERE idUtilisateur = '" + req.body.log + "' and password = '" + req.body.pwd + "'";
    var isAdmin = "SELECT * FROM ADMINISTRATEUR WHERE idAdministrateur = '" + req.body.log + "'";
    var isEnseignant = "SELECT * FROM ENSEIGNANT WHERE idEnseignant = '" + req.body.log + "'";
    var isEtudiant = "SELECT * FROM ETUDIANT WHERE idEtudiant = '" + req.body.log + "'";
    
    connection.query(isUser, function (error, results) {
        if(results.length){
            req.session.login = results[0].idUtilisateur;
            userSession = results[0].idUtilisateur;
            isLoggedIn = true;
            connection.query(isAdmin, function (error, results) {
                if(results.length){
                    redirection = 'Admin'
                    req.session.statut = 'Admin';
                    res.status(200).json({
                        statut: req.session.statut,
                        ok: true,
                    })
                } else{
                    connection.query(isEnseignant, function (error, results) {
                        if(results.length){
                            redirection = 'Enseignant'
                            req.session.statut = 'Enseignant';
                            res.status(200).json({
                                statut: req.session.statut,
                                ok: true
                            })
                        } else{
                           connection.query(isEtudiant, function (error, results) {
                                if(results.length){
                                    redirection = 'Etudiant'
                                    req.session.statut = 'Etudiant';
                                    res.status(200).json({
                                        statut: req.session.statut,
                                        ok: true
                                    })
                                } else{
                                    res.status(201).json({
                                        ok: false,
                                        error: "Utilisateur sans statut"
                                    })
                                }
                            }) 
                        }
                    })
                }
            })
            req.session.authenticated =  true;
         }
         else{
            return res.status(401).json({
                ok: false,
                error: "Identifiant ou mot de passe incorrect"
            });
         }
    })
});

router.get('/getSession', (req,res, next) => {
    res.send(userSession)
});

router.get('/sessionDestroy', (req,res, next) => {
    isLoggedIn = false
    redirection = null;
    req.session.destroy(function(error){ 
        console.log("Session Destroyed")
        res.status(200).json({
            message: "c'est cool",
            ok: true
        })
    }) 
});

router.get('/isLoggedIn', (req,res, next) => {
    res.json({loggedIn: isLoggedIn})

});

router.get('/getRedirection', (req,res, next) => {
    res.json({redirect: redirection})

});

router.get('/getEnseignants', (req,res, next) => {
    connection.query('SELECT * FROM utilisateur INNER JOIN enseignant on utilisateur.idUtilisateur = enseignant.idEnseignant', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getEtudiants', (req,res, next) => {
    connection.query('SELECT * FROM utilisateur INNER JOIN etudiant on utilisateur.idUtilisateur = etudiant.idEtudiant', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getCandidatures', (req,res, next) => {
    var query = "SELECT * FROM candidature INNER JOIN etudiant ON candidature.idEtudiant = etudiant.idEtudiant INNER JOIN entreprise ON candidature.idEntreprise = entreprise.idEntreprise WHERE candidature.idEtudiant = '" + userSession + "'";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

module.exports = router;