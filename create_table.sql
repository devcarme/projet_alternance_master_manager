-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 17 nov. 2020 à 08:20
-- Version du serveur :  5.7.31
-- Version de PHP : 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `alternance_master_manager`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

DROP TABLE IF EXISTS `administrateur`;
CREATE TABLE IF NOT EXISTS `administrateur` (
  `idAdministrateur` varchar(45) NOT NULL,
  KEY `fk_ADMINISTRATEUR_UTILISATEUR1_idx` (`idAdministrateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`idAdministrateur`) VALUES
('admin');

-- --------------------------------------------------------

--
-- Structure de la table `candidature`
--

DROP TABLE IF EXISTS `candidature`;
CREATE TABLE IF NOT EXISTS `candidature` (
  `idCandidature` int(11) NOT NULL AUTO_INCREMENT,
  `origineOffre` varchar(45) NOT NULL,
  `idEntreprise` int(11) NOT NULL,
  `idEtudiant` varchar(30) NOT NULL,
  `idLettreMotivation` int(11) DEFAULT NULL,
  `idCV` int(11) NOT NULL,
  `intituleOffre` varchar(45) NOT NULL,
  PRIMARY KEY (`idCandidature`),
  KEY `fk_CANDIDATURE_LettreMotivation1_idx` (`idLettreMotivation`),
  KEY `fk_CANDIDATURE_ENTREPRISE` (`idEntreprise`),
  KEY `fk_CANDIDATURE_CV` (`idCV`) USING BTREE,
  KEY `fk_CANDIDATURE_ETUDIANT` (`idEtudiant`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `candidature`
--

INSERT INTO `candidature` (`idCandidature`, `origineOffre`, `idEntreprise`, `idEtudiant`, `idLettreMotivation`, `idCV`, `intituleOffre`) VALUES
(1, 'UBO', 1, 'ducarmeloick@gmail.com', NULL, 1, ''),
(2, 'UBO', 2, 'ducarmeloick@gmail.com', NULL, 2, ''),
(3, 'Perso', 4, 'ducarmeloick@gmail.com', NULL, 2, ''),
(4, 'Perso', 1, 'ducarmeloick@gmail.com', NULL, 1, 'Stage php'),
(5, 'Perso', 3, 'ducarmeloick@gmail.com', NULL, 2, 'Stage réseau'),
(6, 'Perso', 5, 'ducarmeloick@gmail.com', NULL, 1, 'Stage web');

-- --------------------------------------------------------

--
-- Structure de la table `candidature_entretien`
--

DROP TABLE IF EXISTS `candidature_entretien`;
CREATE TABLE IF NOT EXISTS `candidature_entretien` (
  `idCandidature` int(11) NOT NULL,
  `idEntretien` int(11) NOT NULL,
  PRIMARY KEY (`idCandidature`,`idEntretien`),
  KEY `FK_ENTRETIEN_HAS_ENTRETIEN` (`idEntretien`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `candidature_entretien`
--

INSERT INTO `candidature_entretien` (`idCandidature`, `idEntretien`) VALUES
(1, 3),
(1, 7),
(2, 4),
(2, 5),
(2, 8),
(5, 6),
(6, 9);

-- --------------------------------------------------------

--
-- Structure de la table `cv`
--

DROP TABLE IF EXISTS `cv`;
CREATE TABLE IF NOT EXISTS `cv` (
  `idCV` int(11) NOT NULL AUTO_INCREMENT,
  `valide` tinyint(1) DEFAULT NULL,
  `lien` varchar(45) DEFAULT NULL,
  `idEtudiant` varchar(45) NOT NULL,
  `observations` varchar(255) NOT NULL,
  PRIMARY KEY (`idCV`),
  KEY `fk_CV_ETUDIANT1` (`idEtudiant`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `cv`
--

INSERT INTO `cv` (`idCV`, `valide`, `lien`, `idEtudiant`, `observations`) VALUES
(1, NULL, 'lienCV1', 'ducarmeloick@gmail.com', ''),
(2, NULL, 'lienCV2', 'ducarmeloick@gmail.com', ''),
(3, NULL, 'lienCV3', 'ducarmeloick@gmail.com', '');

-- --------------------------------------------------------

--
-- Structure de la table `enseignant`
--

DROP TABLE IF EXISTS `enseignant`;
CREATE TABLE IF NOT EXISTS `enseignant` (
  `idEnseignant` varchar(45) NOT NULL,
  KEY `fk_ENSEIGNANT_UTILISATEUR1_idx` (`idEnseignant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `enseignant`
--

INSERT INTO `enseignant` (`idEnseignant`) VALUES
('laurent@enseignant.com');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
CREATE TABLE IF NOT EXISTS `entreprise` (
  `idEntreprise` int(11) NOT NULL AUTO_INCREMENT,
  `nomEntreprise` varchar(45) NOT NULL,
  `adresseEntreprise` varchar(255) NOT NULL,
  PRIMARY KEY (`idEntreprise`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`idEntreprise`, `nomEntreprise`, `adresseEntreprise`) VALUES
(1, 'Orange', '78 RUE OLIVIER DE SERRES - 75015 PARIS'),
(2, 'Nokia', '37 QUAI DU PRESIDENT ROOSEVELT 92130 ISSY-LES-MOULINEAUX'),
(3, 'SFR', 'nfuipf'),
(4, 'Thales', '10 AV 1ERE DFL à BREST'),
(5, 'Bouygues', 'ddqfdsf');

-- --------------------------------------------------------

--
-- Structure de la table `entretien`
--

DROP TABLE IF EXISTS `entretien`;
CREATE TABLE IF NOT EXISTS `entretien` (
  `idEntretien` int(11) NOT NULL AUTO_INCREMENT,
  `dateEntretien` date NOT NULL,
  `estOrganiseParUBO` tinyint(1) NOT NULL DEFAULT '0',
  `estAnnule` tinyint(1) NOT NULL DEFAULT '0',
  `idEtudiant` varchar(30) NOT NULL,
  `heureEntretien` time NOT NULL,
  PRIMARY KEY (`idEntretien`),
  KEY `FK_ENTRETIEN_ETUDIANT` (`idEtudiant`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `entretien`
--

INSERT INTO `entretien` (`idEntretien`, `dateEntretien`, `estOrganiseParUBO`, `estAnnule`, `idEtudiant`, `heureEntretien`) VALUES
(1, '2020-11-20', 0, 0, 'ducarmeloick@gmail.com', '00:00:00'),
(2, '2020-11-14', 0, 0, 'ducarmeloick@gmail.com', '00:00:00'),
(3, '2020-11-14', 0, 0, 'ducarmeloick@gmail.com', '00:00:00'),
(4, '2020-11-14', 0, 0, 'ducarmeloick@gmail.com', '00:00:00'),
(5, '2020-11-14', 0, 0, 'ducarmeloick@gmail.com', '15:12:00'),
(6, '2020-11-15', 0, 0, 'ducarmeloick@gmail.com', '12:20:00'),
(7, '2020-11-15', 0, 0, 'ducarmeloick@gmail.com', '15:47:00'),
(8, '2020-11-15', 0, 0, 'ducarmeloick@gmail.com', '18:18:00'),
(9, '2020-11-15', 0, 0, 'ducarmeloick@gmail.com', '18:20:00');

-- --------------------------------------------------------

--
-- Structure de la table `entretien_intervenant`
--

DROP TABLE IF EXISTS `entretien_intervenant`;
CREATE TABLE IF NOT EXISTS `entretien_intervenant` (
  `idEntretien` int(11) NOT NULL,
  `idIntervenant` varchar(45) NOT NULL,
  PRIMARY KEY (`idEntretien`,`idIntervenant`),
  KEY `FK_INTERVENANT_has_INTERVENANT` (`idIntervenant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `entretien_intervenant`
--

INSERT INTO `entretien_intervenant` (`idEntretien`, `idIntervenant`) VALUES
(8, 'carelkoneelle2@gmail.com'),
(6, 'carelkoneelle@gmail.com'),
(7, 'clementineprune@gmail.com'),
(9, 'didierdeschamps@bouygues.fr'),
(3, 'théorème@thales.fr'),
(4, 'théorème@thales.fr'),
(5, 'théorème@thales.fr');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `idEtudiant` varchar(45) NOT NULL,
  `parcours` varchar(45) DEFAULT NULL,
  `nationaliteFrancaise` tinyint(1) DEFAULT NULL,
  `dateNaissance` date DEFAULT NULL,
  `typeContrat` varchar(45) DEFAULT NULL,
  `dateObtentionStage` varchar(45) DEFAULT NULL,
  `idEntrepriseStage` int(11) DEFAULT NULL,
  PRIMARY KEY (`idEtudiant`),
  KEY `fk_ETUDIANT_ENTREPRISE1_idx` (`idEntrepriseStage`),
  KEY `fk_ETUDIANT_UTILISATEUR1_idx` (`idEtudiant`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`idEtudiant`, `parcours`, `nationaliteFrancaise`, `dateNaissance`, `typeContrat`, `dateObtentionStage`, `idEntrepriseStage`) VALUES
('ducarmeloick@gmail.com', 'II', 1, '2020-11-30', '', NULL, NULL),
('patbru@gmail.com', 'II', 1, '1959-05-14', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `intervenant`
--

DROP TABLE IF EXISTS `intervenant`;
CREATE TABLE IF NOT EXISTS `intervenant` (
  `idIntervenant` varchar(45) NOT NULL,
  `nomIntervenant` varchar(45) NOT NULL,
  `prenomIntervenant` varchar(45) NOT NULL,
  `fonctionIntervenant` varchar(45) NOT NULL,
  `idEntreprise` int(11) NOT NULL,
  PRIMARY KEY (`idIntervenant`),
  KEY `fk_INTERVENANT_ENTREPRISE1_idx` (`idEntreprise`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `intervenant`
--

INSERT INTO `intervenant` (`idIntervenant`, `nomIntervenant`, `prenomIntervenant`, `fonctionIntervenant`, `idEntreprise`) VALUES
('carelkoneelle2@gmail.com', 'Konéelle', 'Carel', 'Gérante', 3),
('carelkoneelle@gmail.com', 'Konéelle', 'Carel', 'Gérante', 3),
('clementineprune@gmail.com', 'Prune', 'Clémentine', 'Manager', 1),
('didierdeschamps@bouygues.fr', 'Deschamps', 'Didier', 'DRH', 5),
('théorème@thales.fr', 'Rème', 'Théo', 'DRH', 4);

-- --------------------------------------------------------

--
-- Structure de la table `lettremotivation`
--

DROP TABLE IF EXISTS `lettremotivation`;
CREATE TABLE IF NOT EXISTS `lettremotivation` (
  `idLettreMotivation` int(11) NOT NULL,
  `valide` tinyint(1) DEFAULT NULL,
  `lien` varchar(45) DEFAULT NULL,
  `idEtudiant` varchar(45) NOT NULL,
  `observations` varchar(255) NOT NULL,
  PRIMARY KEY (`idLettreMotivation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `idUtilisateur` varchar(45) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`idUtilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`idUtilisateur`, `nom`, `prenom`, `password`) VALUES
('admin', 'admin', 'admin', 'admin'),
('ducarmeloick@gmail.com', 'DUCARME', 'Loick', 'mdp'),
('laurent@enseignant.com', 'LEMARCHAND', 'Laurent', 'laurent'),
('patbru@gmail.com', 'Patrick', 'Bruel', 'mdp'),
('test', 'test', 'test', 'test'),
('test@test.com', 'TEST', 'test', 'mdp');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD CONSTRAINT `fk_ADMINISTRATEUR_UTILISATEUR1` FOREIGN KEY (`idAdministrateur`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `candidature`
--
ALTER TABLE `candidature`
  ADD CONSTRAINT `fk_CANDIDATURE_CV1` FOREIGN KEY (`idCV`) REFERENCES `cv` (`idCV`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CANDIDATURE_ENTREPRISE` FOREIGN KEY (`idEntreprise`) REFERENCES `entreprise` (`idEntreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CANDIDATURE_LettreMotivation1` FOREIGN KEY (`idLettreMotivation`) REFERENCES `lettremotivation` (`idLettreMotivation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `cv`
--
ALTER TABLE `cv`
  ADD CONSTRAINT `fk_CV_ETUDIANT1` FOREIGN KEY (`idEtudiant`) REFERENCES `etudiant` (`idEtudiant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `enseignant`
--
ALTER TABLE `enseignant`
  ADD CONSTRAINT `fk_ENSEIGNANT_UTILISATEUR1` FOREIGN KEY (`idEnseignant`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `entretien`
--
ALTER TABLE `entretien`
  ADD CONSTRAINT `FK_ENTRETIEN_ETUDIANT` FOREIGN KEY (`idEtudiant`) REFERENCES `etudiant` (`idEtudiant`);

--
-- Contraintes pour la table `entretien_intervenant`
--
ALTER TABLE `entretien_intervenant`
  ADD CONSTRAINT `FK_INTERVENANT_has_INTERVENANT` FOREIGN KEY (`idIntervenant`) REFERENCES `intervenant` (`idIntervenant`),
  ADD CONSTRAINT `fk_ENTRETIEN_has_INTERVENANT_ENTRETIEN1` FOREIGN KEY (`idEntretien`) REFERENCES `entretien` (`idEntretien`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ENTRETIEN_has_INTERVENANT_INTERVENANT1` FOREIGN KEY (`idIntervenant`) REFERENCES `intervenant` (`idIntervenant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD CONSTRAINT `fk_ETUDIANT_ENTREPRISE1` FOREIGN KEY (`idEntrepriseStage`) REFERENCES `entreprise` (`idEntreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ETUDIANT_UTILISATEUR1` FOREIGN KEY (`idEtudiant`) REFERENCES `utilisateur` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `intervenant`
--
ALTER TABLE `intervenant`
  ADD CONSTRAINT `fk_INTERVENANT_ENTREPRISE1` FOREIGN KEY (`idEntreprise`) REFERENCES `entreprise` (`idEntreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
