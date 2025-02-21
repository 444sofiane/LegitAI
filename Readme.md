# Documentation Utilisateur - LegitAI

## Présentation du Projet
LegitAI est un projet d'intelligence artificielle conçu pour reconnaître les logos de la plupart des marques. L'objectif initial était de créer une application permettant d'identifier la contrefaçon en analysant les logos via une caméra.

Le projet est divisé en deux parties :
- **OnlyFeature** : Un module permettant de tester la reconnaissance de logo sans interface utilisateur.
- **LegitAIApp** : Un prototype d'application mobile développé avec Expo.

---

## 1. OnlyFeature - Tester la Reconnaissance de Logo
Ce dossier contient un script permettant d'exécuter la reconnaissance de logo via une webcam.

### Prérequis
- **Python** doit être installé sur votre machine. Si ce n'est pas encore fait, téléchargez et installez Python depuis le site officiel : [https://www.python.org/downloads/](https://www.python.org/downloads/).

### Installation et Exécution
1. **Téléchargez et installez Python** si ce n'est pas encore fait.
2. **Accédez au dossier OnlyFeature** :
   ```sh
   cd OnlyFeature
   ```
3. **Exécutez le script** :
   ```sh
   python recLogo.py
   ```

### Fonctionnement
- Assurez-vous que votre webcam est allumée.
- Un rectangle vert apparaîtra autour du logo détecté.
- Un chiffre décimal (entre 0 et 1) indiquera le niveau de confiance de la reconnaissance.

---

## 2. LegitAIApp - Prototype d'Application Mobile
Ce dossier contient un projet **Expo** permettant d'exécuter une application mobile pour la reconnaissance de logos.

### Prérequis
- **Node.js** doit être installé sur votre machine. Installez-le en le téléchargeant depuis : [https://nodejs.org/](https://nodejs.org/)
- **Expo CLI** doit être installé sur votre machine et sur votre smartphone.

### Installation et Exécution
1. **Installez Node.js** si ce n'est pas encore fait.
2. **Accédez au dossier LegitAIApp** :
   ```sh
   cd LegitAIApp
   ```
3. **Installez les dépendances du projet** :
   ```sh
   npm install
   ```
4. **Installez l'application Expo Go sur votre smartphone** :
   - [Android (Google Play)](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS (App Store)](https://apps.apple.com/app/expo-go/id982107779)
5. **Démarrez l'application avec Expo** :
   ```sh
   npx expo start
   ```
6. **Scannez le QR Code** affiché dans la console avec Expo Go pour lancer l'application sur votre smartphone.

---

## Support
En cas de problème, veuillez vérifier :
- Que vous avez bien installé toutes les dépendances requises.
- Que votre webcam fonctionne correctement pour OnlyFeature.
- Que votre smartphone et votre ordinateur sont connectés au même réseau pour Expo.

Bon test ! 🚀
