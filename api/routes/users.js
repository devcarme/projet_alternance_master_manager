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
    var query = "SELECT * FROM candidature INNER JOIN etudiant ON candidature.idEtudiant = etudiant.idEtudiant INNER JOIN entreprise ON candidature.idEntreprise = entreprise.idEntreprise WHERE candidature.idEtudiant = '" + userSession + "' ORDER BY candidature.idCandidature ASC";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getEntretiens', (req,res, next) => {
    var query = "SELECT entretien.idEntretien, entretien.idEtudiant, DATE_FORMAT(dateEntretien, '%d/%m/20%y') as dateEntretien, TIME_FORMAT(heureEntretien, '%H h %i') as heureEntretien, estOrganiseParUBO, estAnnule, \
    candidature.idCandidature, origineOffre, candidature.idEntreprise, idLettreMotivation, idCV, intituleOffre, \
    intervenant.idIntervenant, nomIntervenant, prenomIntervenant, fonctionIntervenant,\
    entreprise.idEntreprise, adresseEntreprise, nomEntreprise\
    FROM entretien \
    INNER JOIN candidature_entretien ON entretien.idEntretien = candidature_entretien.idEntretien\
    INNER JOIN candidature ON candidature.idCandidature = candidature_entretien.idCandidature\
    INNER JOIN entretien_intervenant ON entretien_intervenant.idEntretien = entretien.idEntretien\
    INNER JOIN intervenant ON entretien_intervenant.idIntervenant = intervenant.idIntervenant\
    INNER JOIN entreprise ON intervenant.idEntreprise = entreprise.idEntreprise\
    WHERE entretien.idEtudiant = '" + userSession + "' ORDER BY entretien.idEntretien ASC";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getEntreprises', (req,res, next) => {
    var query = "SELECT * FROM entreprise";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getCVS', (req,res, next) => {
    var query = "SELECT * FROM cv WHERE idEtudiant = '" + userSession + "'";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getLMS', (req,res, next) => {
    var query = "SELECT * FROM lettremotivation WHERE idEtudiant = '" + userSession + "'";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.get('/getIntervenants', (req,res, next) => {
    var query = "SELECT * FROM intervenant INNER JOIN entreprise on intervenant.idEntreprise = entreprise.idEntreprise";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
});

router.post('/insertCandidature', (req,res, next) => {
     
    var query = "INSERT INTO candidature (origineOffre, intituleOffre, idEntreprise, idEtudiant";
    if(req.body.idLettreMotivation != null){ query+=",idLettreMotivation";}
    query+=",idCV)";   
    query+= "VALUES('" + req.body.origineOffre + "','" + req.body.intituleOffre + "','" + req.body.idEntreprise + "','"  + userSession;
    if(req.body.idLettreMotivation != null){ query+="','"  + req.body.idLettreMotivation;}
    query += "','" + req.body.idCV + "')";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send("INSERT OK");
    })
});

router.post('/insertEntreprise', (req,res, next) => {
    var query = "INSERT INTO entreprise (nomEntreprise, adresseEntreprise) VALUES('" + req.body.nomEntreprise + "','" + req.body.adresseEntreprise + "')";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send("INSERT OK");
    })
});

router.post('/insertIntervenant', (req,res, next) => {
    var query = "INSERT INTO intervenant VALUES('" + req.body.mailIntervenant + "','" + req.body.nomIntervenant + "','" + req.body.prenomIntervenant + "','" + req.body.fonctionIntervenant + "','" + req.body.entrepriseIntervenant +"')";
    var getIntervenantsById = "SELECT * from intervenant WHERE idIntervenant = '" + req.body.mailIntervenant + "'";
    connection.query(getIntervenantsById, function (error, results, fields) {
        if (error) throw error;
        if(results.length){
            res.json({
                ok: false,
                message: "Adresse mail déjà utilisée"
            })
        } else{
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                res.json({
                    ok: true
                })
            })
        }
    })
});

router.post('/insertEntretien', (req,res, next) => {
    var query = "INSERT INTO entretien (dateEntretien, heureEntretien, idEtudiant) VALUES('" + req.body.dateEntretien + "','" + req.body.heureEntretien + "','" + userSession + "')";
    var dernierEntretien =  "SELECT MAX(idEntretien) as dernierEntretien FROM entretien";
    var idEntretienDernier = null;

    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        //connection.query(dernierEntretien, function (error, results, fields) {
            //idEntretienDernier = results[0].dernierEntretien;
            var insertEntretienIntervenant = "INSERT INTO entretien_intervenant VALUES('" + results.insertId + "','" + req.body.mailIntervenant + "')";
            var insertCandidatureEntretien = "INSERT INTO candidature_entretien VALUES('" + req.body.idCandidature + "','" + results.insertId + "')";
            
            connection.query(insertCandidatureEntretien, function (error, results, fields) {
                if (error) throw error;
                res.send("INSERT OK");
            })
            connection.query(insertEntretienIntervenant, function (error, results, fields) {
                if (error) throw error;
            })
            
                
        //})
        
    })
});


router.post('/setRedirection', (req,res, next) => {
    redirection = req.body.lien;
    res.status(200).json({
        redirect: redirection,
        ok: true
    })
});

module.exports = router;