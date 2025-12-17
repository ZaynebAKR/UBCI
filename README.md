
# UBCI Dashboard Platform - Gestion d'Exploitation Informatique

**UBCI Dashboard Platform** est une application web complète de gestion d'exploitation informatique développée pour l'Union Bancaire pour le Commerce et l'Industrie (UBCI). Cette solution centralise et automatise le suivi des incidents, GAB, interventions et tableaux de bord en temps réel pour optimiser la réactivité et la prise de décision.

**Dépôt GitHub** : [https://github.com/ZaynebAKR/UBCI.git](https://github.com/ZaynebAKR/UBCI.git)

## ✨ Fonctionnalités Principales

### 🔐 Gestion des Utilisateurs
- **Authentification sécurisée** avec système de connexion
- **Fonction "Mot de passe oublié"** avec envoi par email
- **Gestion complète CRUD** des utilisateurs
- **Contrôle d'accès** pour l'équipe informatique

### ⚠️ Gestion des Incidents
- **Suivi en temps réel** des incidents résolus/non résolus
- **Filtrage intelligent** par types d'incidents
- **Recherche avancée** par date de création
- **Visualisation dashboard** avec statistiques de résolution

### 🏦 Gestion des GAB (Guichets Automatiques Bancaires)
- **Monitoring temps réel** de 117 GAB
- **Suivi de disponibilité** avec taux de fonctionnement
- **Gestion des motifs d'indisponibilité**
- **Tableaux de bord** par région et état

### 📅 Gestion des Interventions
- **Planification** des interventions prévues et fictives
- **Agenda opérationnel** avec vue calendrier
- **Suivi des horaires** d'intervention
- **Traçabilité complète** des actions

### 🔄 Gestion des Mises en Production
- **Suivi des déploiements** par métier
- **Filtrage par type** de mise en production
- **Historique complet** des changements

### 📊 Tableaux de Bord Intelligents
- **Vue globale** de l'état du système d'information
- **Alertes critiques** en temps réel
- **KPI automatisés** sur la résolution d'incidents
- **Rapports journaliers** de production informatique

## 🛠️ Stack Technique

### Frontend
- **Framework** : Angular (TypeScript, HTML5, CSS3)
- **Architecture** : MVVM (Model-View-ViewModel)
- **UI/UX** : Interface responsive et ergonomique

### Backend
- **Framework** : Spring Boot (Java 11+)
- **Sécurité** : Spring Security
- **Programmation** : AOP (Aspect Oriented Programming)
- **Architecture** : 4-tier (Présentation, Métier, Persistance, Base de données)

### Base de Données
- **SGBD** : MySQL
- **ORM** : Spring Data JPA
- **Structure** : Modèle relationnel optimisé

### Outils & Méthodologie
- **Méthodologie** : Scrum (cycles itératifs, sprints)
- **Modélisation** : UML (Draw.io)
- **Testing API** : Postman
- **Serveur local** : XAMPP
- **IDE** : IntelliJ IDEA, VS Code

## 📋 Installation Locale

### Prérequis
- Java 11 ou supérieur
- Node.js avec Angular CLI
- MySQL 8+
- Maven 3.6+
- IDE recommandé : IntelliJ IDEA ou VS Code

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/ZaynebAKR/UBCI.git
cd UBCI
```

2. **Configurer la base de données**
```bash
# Créer la base de données MySQL
mysql -u root -p
CREATE DATABASE ubci_dashboard;
# Exécuter le script d'initialisation (si disponible)
```

3. **Configurer l'application Spring Boot**
```bash
cd backend
# Éditer application.properties avec vos credentials
nano src/main/resources/application.properties
```

4. **Lancer le backend Spring Boot**
```bash
mvn clean install
mvn spring-boot:run
```

5. **Configurer et lancer le frontend Angular**
```bash
cd ../frontend
npm install
ng serve
```

6. **Accéder à l'application**
- Frontend : [http://localhost:4200](http://localhost:4200)
- Backend API : [http://localhost:8080](http://localhost:8080)

## 🏗️ Architecture

### Architecture Physique (4-tier)
```
Client (Browser) → Serveur Web (Angular) → Serveur d'Application (Spring Boot) → Base de Données (MySQL)
```

### Architecture Logique
- **Couche Présentation** : Contrôleurs REST, endpoints API
- **Couche Métier** : Services, logique applicative, validation
- **Couche Persistance** : Entités JPA, repositories
- **Couche Base de données** : Tables MySQL, relations

## 📊 Modélisation UML

Le projet inclut une documentation complète avec :
- **Diagrammes de cas d'utilisation** : Fonctionnalités système
- **Diagrammes de classes** : Structure objet
- **Diagrammes de séquence** : Flux d'exécution
- **Maquettes d'interface** : Design UX/UI

*(Disponibles dans le dossier `/docs`)*

## 🧪 Testing

### Tests API avec Postman
```bash
# Importer la collection Postman depuis /docs/postman
# Tester les endpoints REST :
GET    /api/incidents
POST   /api/incidents
GET    /api/gab
PUT    /api/interventions/{id}
```

### Tests Unitaires
```bash
# Exécuter les tests Spring Boot
cd backend
mvn test

# Exécuter les tests Angular
cd frontend
ng test
```

## 🔄 Méthodologie de Développement

- **Approche Agile** : Méthodologie Scrum
- **Sprints** : Cycles de 2 semaines
- **Daily Stand-ups** : Suivi quotidien
- **Revues de sprint** : Validation fonctionnelle
- **Rétrospectives** : Amélioration continue

## 👥 Rôles Utilisateurs

### Équipe Informatique UBCI
- **Administrateurs** : Gestion complète système
- **Techniciens** : Suivi incidents et interventions
- **Managers** : Supervision et reporting

## 📈 Avantages Clés

✅ **Centralisation** : Toutes les données au même endroit  
✅ **Temps réel** : Monitoring instantané des incidents  
✅ **Automatisation** : Réduction des tâches manuelles  
✅ **Prise de décision** : Données analysées pour meilleures décisions  
✅ **Conformité** : Suivi réglementaire bancaire  

## 🤝 Contribution

Les contributions sont les bienvenues selon le processus suivant :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amélioration`)
3. Commiter les changements (`git commit -m 'Ajout fonctionnalité'`)
4. Pousser la branche (`git push origin feature/amélioration`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet a été développé dans le cadre d'un stage ingénieur à l'UBCI.  
Utilisation interne et académique uniquement.

## 👤 Auteur & Contact

**Akermi Zayneb**  
Étudiante en Ingénierie Informatique  
École Supérieure Privée d'Ingénierie et de Technologies - Tunisie

- **GitHub** : [https://github.com/ZaynebAKR](https://github.com/ZaynebAKR)
- **Encadrant** : Mr Jamel Eddine Harbaoui
- **Entreprise** : UBCI (Union Bancaire pour le Commerce et l'Industrie)

## 📚 Documentation Supplémentaire

Pour plus de détails, consulter :
- `Rapport_De_Stage_UBCI.pdf` : Documentation complète du projet
- `/docs` : Diagrammes UML et spécifications techniques
- `/src` : Code source commenté

---

*Projet réalisé avec Angular, Spring Boot et MySQL suivant une méthodologie Scrum rigoureuse.*
