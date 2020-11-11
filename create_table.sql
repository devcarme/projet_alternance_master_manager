-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  Dim 25 oct. 2020 à 15:50
-- Version du serveur :  10.3.9-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `zil3-zducarmlo`
--

-- --------------------------------------------------------

--
-- Structure de la table `ADMINISTRATEUR`
--

CREATE TABLE `ADMINISTRATEUR` (
  `idAdministrateur` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `CANDIDATURE`
--

CREATE TABLE `CANDIDATURE` (
  `idCandidature` int(11) NOT NULL,
  `origineOffre` varchar(45) DEFAULT NULL,
  `idEntreprise` int(11) NOT NULL,
  `idEtudiant` int(11) DEFAULT NULL,
  `idLettreMotivation` int(11) DEFAULT NULL,
  `idEntretien` int(11) DEFAULT NULL,
  `idCV` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `CV`
--

CREATE TABLE `CV` (
  `idCV` int(11) NOT NULL,
  `valide` tinyint(1) DEFAULT NULL,
  `lien` varchar(45) DEFAULT NULL,
  `idEtudiant` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ENSEIGNANT`
--

CREATE TABLE `ENSEIGNANT` (
  `idEnseignant` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ENTREPRISE`
--

CREATE TABLE `ENTREPRISE` (
  `idEntreprise` int(11) NOT NULL,
  `nomEntreprise` varchar(45) DEFAULT NULL,
  `adresseEntreprise` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ENTRETIEN`
--

CREATE TABLE `ENTRETIEN` (
  `idEntretien` int(11) NOT NULL,
  `dateEntretien` date DEFAULT NULL,
  `estOrganiseParUBO` tinyint(1) DEFAULT NULL,
  `estPersonnel` tinyint(1) DEFAULT NULL,
  `estAnnule` tinyint(1) DEFAULT NULL,
  `idEtudiant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ENTRETIEN_INTERVENANT`
--

CREATE TABLE `ENTRETIEN_INTERVENANT` (
  `idEntretien` int(11) NOT NULL,
  `idIntervenant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ETUDIANT`
--

CREATE TABLE `ETUDIANT` (
  `idEtudiant` varchar(45) NOT NULL,
  `parcours` varchar(45) DEFAULT NULL,
  `nationaliteFrancaise` varchar(45) DEFAULT NULL,
  `dateNaissance` date DEFAULT NULL,
  `typeContrat` varchar(45) DEFAULT NULL,
  `dateObtentionStage` varchar(45) DEFAULT NULL,
  `idENTREPRISE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `INTERVENANT`
--

CREATE TABLE `INTERVENANT` (
  `idIntervenant` int(11) NOT NULL,
  `nomIntervenant` varchar(45) DEFAULT NULL,
  `prenomIntervenant` varchar(45) DEFAULT NULL,
  `fonctionIntervenant` varchar(45) DEFAULT NULL,
  `idEntreprise` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `LettreMotivation`
--

CREATE TABLE `LettreMotivation` (
  `idLettreMotivation` int(11) NOT NULL,
  `valide` tinyint(1) DEFAULT NULL,
  `lien` varchar(45) DEFAULT NULL,
  `idEtudiant` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `UTILISATEUR`
--

CREATE TABLE `UTILISATEUR` (
  `idUtilisateur` varchar(45) NOT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `UTILISATEUR`
--

INSERT INTO `UTILISATEUR` (`idUtilisateur`, `nom`, `prenom`) VALUES
('1', 'DUCARME', 'Loick'),
('2', 'TEST', 'test'),
('3', 'Patrick', 'Bruel');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ADMINISTRATEUR`
--
ALTER TABLE `ADMINISTRATEUR`
  ADD KEY `fk_ADMINISTRATEUR_UTILISATEUR1_idx` (`idAdministrateur`);

--
-- Index pour la table `CANDIDATURE`
--
ALTER TABLE `CANDIDATURE`
  ADD PRIMARY KEY (`idCandidature`),
  ADD KEY `fk_CANDIDATURE_ENTREPRISE1_idx` (`idEntreprise`),
  ADD KEY `fk_CANDIDATURE_LettreMotivation1_idx` (`idLettreMotivation`),
  ADD KEY `fk_CANDIDATURE_ENTRETIEN1_idx` (`idEntretien`),
  ADD KEY `fk_CANDIDATURE_CV1_idx` (`idCV`);

--
-- Index pour la table `CV`
--
ALTER TABLE `CV`
  ADD PRIMARY KEY (`idCV`),
  ADD KEY `fk_CV_ETUDIANT1_idx` (`idEtudiant`);

--
-- Index pour la table `ENSEIGNANT`
--
ALTER TABLE `ENSEIGNANT`
  ADD KEY `fk_ENSEIGNANT_UTILISATEUR1_idx` (`idEnseignant`);

--
-- Index pour la table `ENTREPRISE`
--
ALTER TABLE `ENTREPRISE`
  ADD PRIMARY KEY (`idEntreprise`);

--
-- Index pour la table `ENTRETIEN`
--
ALTER TABLE `ENTRETIEN`
  ADD PRIMARY KEY (`idEntretien`);

--
-- Index pour la table `ENTRETIEN_INTERVENANT`
--
ALTER TABLE `ENTRETIEN_INTERVENANT`
  ADD PRIMARY KEY (`idEntretien`,`idIntervenant`),
  ADD KEY `fk_ENTRETIEN_has_INTERVENANT_INTERVENANT1_idx` (`idIntervenant`),
  ADD KEY `fk_ENTRETIEN_has_INTERVENANT_ENTRETIEN1_idx` (`idEntretien`);

--
-- Index pour la table `ETUDIANT`
--
ALTER TABLE `ETUDIANT`
  ADD PRIMARY KEY (`idEtudiant`),
  ADD KEY `fk_ETUDIANT_ENTREPRISE1_idx` (`idENTREPRISE`),
  ADD KEY `fk_ETUDIANT_UTILISATEUR1_idx` (`idEtudiant`);

--
-- Index pour la table `INTERVENANT`
--
ALTER TABLE `INTERVENANT`
  ADD PRIMARY KEY (`idIntervenant`),
  ADD KEY `fk_INTERVENANT_ENTREPRISE1_idx` (`idEntreprise`);

--
-- Index pour la table `LettreMotivation`
--
ALTER TABLE `LettreMotivation`
  ADD PRIMARY KEY (`idLettreMotivation`);

--
-- Index pour la table `UTILISATEUR`
--
ALTER TABLE `UTILISATEUR`
  ADD PRIMARY KEY (`idUtilisateur`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ADMINISTRATEUR`
--
ALTER TABLE `ADMINISTRATEUR`
  ADD CONSTRAINT `fk_ADMINISTRATEUR_UTILISATEUR1` FOREIGN KEY (`idAdministrateur`) REFERENCES `UTILISATEUR` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `CANDIDATURE`
--
ALTER TABLE `CANDIDATURE`
  ADD CONSTRAINT `fk_CANDIDATURE_CV1` FOREIGN KEY (`idCV`) REFERENCES `CV` (`idCV`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CANDIDATURE_ENTREPRISE1` FOREIGN KEY (`idEntreprise`) REFERENCES `ENTREPRISE` (`idEntreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CANDIDATURE_ENTRETIEN1` FOREIGN KEY (`idEntretien`) REFERENCES `ENTRETIEN` (`idEntretien`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_CANDIDATURE_LettreMotivation1` FOREIGN KEY (`idLettreMotivation`) REFERENCES `LettreMotivation` (`idLettreMotivation`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `CV`
--
ALTER TABLE `CV`
  ADD CONSTRAINT `fk_CV_ETUDIANT1` FOREIGN KEY (`idEtudiant`) REFERENCES `ETUDIANT` (`idEtudiant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `ENSEIGNANT`
--
ALTER TABLE `ENSEIGNANT`
  ADD CONSTRAINT `fk_ENSEIGNANT_UTILISATEUR1` FOREIGN KEY (`idEnseignant`) REFERENCES `UTILISATEUR` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `ENTRETIEN_INTERVENANT`
--
ALTER TABLE `ENTRETIEN_INTERVENANT`
  ADD CONSTRAINT `fk_ENTRETIEN_has_INTERVENANT_ENTRETIEN1` FOREIGN KEY (`idEntretien`) REFERENCES `ENTRETIEN` (`idEntretien`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ENTRETIEN_has_INTERVENANT_INTERVENANT1` FOREIGN KEY (`idIntervenant`) REFERENCES `INTERVENANT` (`idIntervenant`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `ETUDIANT`
--
ALTER TABLE `ETUDIANT`
  ADD CONSTRAINT `fk_ETUDIANT_ENTREPRISE1` FOREIGN KEY (`idENTREPRISE`) REFERENCES `ENTREPRISE` (`idEntreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ETUDIANT_UTILISATEUR1` FOREIGN KEY (`idEtudiant`) REFERENCES `UTILISATEUR` (`idUtilisateur`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `INTERVENANT`
--
ALTER TABLE `INTERVENANT`
  ADD CONSTRAINT `fk_INTERVENANT_ENTREPRISE1` FOREIGN KEY (`idEntreprise`) REFERENCES `ENTREPRISE` (`idEntreprise`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
