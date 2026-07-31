# CAHIER DES CHARGES FONCTIONNEL ET TECHNIQUE
## Conception et Développement du Site Web Officiel et de la Plateforme Numérique
### ONG « BRIGHT AFRICA » (BA)

---

## 1. CONTEXTE ET PRÉSENTATION DE L'ORGANISATION

### 1.1 Contexte Général
L'ONG **« BRIGHT AFRICA » (BA en sigle)** est une Organisation Non Gouvernementale et Association Sans But Lucratif (ASBL), fondée conformément à la loi n° 004/2001 du 20 juillet 2001 relative aux ASBL en République Démocratique du Congo (RDC).

- **Dénomination officielle** : ONG BRIGHT AFRICA (« BA »)
- **Siège Social** : Avenue de la Paix, Quartier Himbi, Commune de Goma, Ville de Goma, Province du Nord-Kivu, République Démocratique du Congo.
- **Rayon d'action** : Province du Nord-Kivu, avec possibilité d'extension sur toute l'étendue de la RDC et à l'international.
- **Exercice social** : 1er Janvier – 31 Décembre (Langue officielle de travail : Français).

### 1.2 Vision, Mission et Objet Social
- **Objet Principal (Art. 5)** : Protection et promotion des droits de l'enfant, en vue de contribuer à son épanouissement intégral et à son développement dans un cadre sécurisé, sain et durable.
- **Vision (Art. 6)** : Créer un environnement protecteur, sain et éducatif, garantissant le bien-être, la sécurité et le développement harmonieux de l’enfant en Afrique.
- **Mission (Art. 7)** : Promouvoir, protéger et défendre les droits des enfants en leur assurant un accès à l'éducation, à la santé, à la protection et à un environnement sûr, afin qu'ils puissent s'épanouir et contribuer au développement de l’Afrique.

### 1.3 Les 4 Piliers d'Intervention Majeurs (Art. 9)
1. **Protection de l’Enfant** : Lutte contre les violences, l'exploitation, le travail des enfants, le mariage forcé/précoce et le recrutement dans les groupes armés. Accompagnement psychosocial, juridique et mécanisme d'alerte aux autorités.
2. **Santé Maternelle et Infantile** : Sensibilisation à l'hygiène, prévention sanitaire, assainissement et santé de la mère et de l'enfant.
3. **Éducation et Formation** : Alphabétisation, formation professionnelle des jeunes, soutien à la scolarisation (notamment la jeune fille).
4. **Protection de l’Environnement** : Reboisement, préservation des écosystèmes, lutte contre la déforestation, gestion durable des déchets et sensibilisation au changement climatique.

---

## 2. OBJECTIFS DU PROJET NUMÉRIQUE

Le projet vise à concevoir, développer et déployer le site web officiel et la plateforme numérique de l'ONG Bright Africa.

### 2.1 Objectifs Stratégiques
1. **Visibilité & Notoriété Internationale et Locale** : Présenter l'ONG, sa vision, ses actions au Nord-Kivu et ses partenariats auprès du grand public, des bailleurs de fonds et des institutions.
2. **Mobilisation des Ressources (Fundraising)** : Permettre la collecte sécurisée de dons (Mobile Money congolais et cartes bancaires/internationales) et le recrutement de membres bienfaiteurs.
3. **Transparence et Redevabilité (Gouvernance)** : Publier les rapports d'activités, les états financiers, la composition des organes dirigeants et les statuts/règlements de l'ONG.
4. **Mise en œuvre du Devoir d'Alerte et de Sauvegarde (Art. 22 - Safeguarding)** : Mettre à disposition un canal de signalement sécurisé et confidentiel pour les cas de violation des droits de l'enfant.
5. **Gestion de la Communauté (Membres & Bénévoles)** : Faciliter les demandes d'adhésion en ligne, la gestion des bénévoles et les recrutements (avec soumission des documents obligatoires de Safeguarding).

---

## 3. PÉRIMÈTRE FONCTIONNEL & ARBORESCENCE DU SITE WEB

### 3.1 Arborescence Globale du Site
```
┌── Accueil (Home Page)
├── À Propos (Qui sommes-nous ?)
│   ├── Histoire & Contexte légal
│   ├── Vision, Mission & Valeurs
│   ├── Organes de Gouvernance (AG, CA, Bureau, Direction)
│   └── Transparence & Documents Officiels (Statuts, ROI)
├── Nos Piliers d'Intervention
│   ├── 1. Protection de l'Enfant
│   ├── 2. Santé Maternelle & Infantile
│   ├── 3. Éducation & Formation Pro
│   └── 4. Protection de l'Environnement
├── Nos Projets & Impact
│   ├── Projets en Cours & Cartographie Nord-Kivu
│   ├── Témoignages & Rapports de Terrain
│   └── Rapports Annuels & Financiers
├── Espace Safeguarding & Signalement (Protection Enfants - Art. 22)
│   ├── Charte de Protection de l'Enfant (Code de Conduite)
│   ├── Présentation du Référent Protection
│   └── Formulaire de Signalement Confidentiel
├── Agir avec Nous
│   ├── Faire un Don (Fundraising)
│   ├── Devenir Membre (Adhérent / Bienfaiteur)
│   └── Bénévolat & Recrutement (Postuler)
├── Actualités & Médiathèque
│   ├── Blog / Articles & Communiqués
│   └── Galeries Photos & Vidéos
└── Contact & Siège Social
```

---

## 4. DESCRIPTION DÉTAILLÉE DES MODULES ET FONCTIONNALITÉS

### 4.1 Page d'Accueil (Home Page)
- **Hero Section Dynamique** : Visuels percutants, slogan de Bright Africa, boutons d'action rapides (« *Faire un don* », « *Rejoindre l'ONG* », « *Signalement Urgent* »).
- **Compteur d'Impact en Temps Réel** : Chiffres clés (Enfants accompagnés, Écoles soutenues, Arbres plantés, Sensibilisations effectuées).
- **Présentation des 4 Piliers** : Cartes interactives détaillant chaque domaine d'intervention.
- **Section Actualités Récentes & Alertes** : Derniers communiqués de presse et articles de terrain.
- **Partenaires & Bailleurs** : Carrousel des logos des partenaires institutionnels et techniques.

### 4.2 Module Safeguarding & Signalement d'Alerte (Conforme Art. 22)
*Fonctionnalité critique obligatoire liée à la Politique de Sauvegarde des Enfants.*
- **Formulaire de Signalement Securisé** :
  - Envoi sécurisé et chiffré vers le **Référent Protection** nommé par le CA.
  - Option d'anonymat garantie pour l'émetteur du signalement.
  - Horodatage et numéro de suivi unique généré pour le traitement du dossier.
  - Routage direct automatique vers le Référent Protection et le Président de l'ONG.
- **Ressources Téléchargeables** : Charte de Protection de l'Enfant, Code de Conduite, Guide de Sauvegarde.

### 4.3 Module Adhésion & Recrutement RH (Conforme Art. 17, 18 & 22.2)
- **Formulaire de Demande d'Adhésion** :
  - Formulaire pour Membres Adhérents et Membres Bienfaiteurs.
  - Signature numérique / engagement à respecter les statuts, le ROI et la Charte de Protection des Enfants.
- **Espace Candidatures & Recrutement (Salariés / Bénévoles / Stagiaires)** :
  - Dépôt de CV et lettre de motivation.
  - **Champs obligatoires de vérification des antécédents (Art. 22.2)** : Upload de l'Extrait de Casier Judiciaire (Bulletin n°3 < 3 mois) et Déclaration sur l'honneur signée.

### 4.4 Module de Don en Ligne & Autofinancement (Conforme Art. 20)
- **Interface de Don Multi-Devises (USD / CDF / EUR)** :
  - Dons ponctuels ou réguliers (mensuels).
  - Intégration des moyens de paiement adaptés au Nord-Kivu / RDC :
    - **Mobile Money local** : M-Pesa (Vodacom), Airtel Money, Orange Money.
    - **Paiements Internationaux** : Cartes Visa / Mastercard, PayPal, Virement Bancaire officiel de l'ONG (gestion avec double signature conjointe conforme Art. 16.2.4).
- Reçu de don automatique généré au format PDF pour le donateur.

### 4.5 Espace Transparence & Documents Téléchargeables
- Téléchargement libre des documents légaux : Statuts signés de l'ONG, Règlement d'Ordre Intérieur, Rapports Annuels d'Activités, Rapports Financiers certifiés.

### 4.6 Médiathèque Éthique
- Galerie d'images et vidéos des projets.
- **Règle Éthique & Floutage / Masquage (Art. 22.3)** : Conformité stricte au droit à l'image des mineurs et à la charte de sauvegarde (aucun visage d'enfant vulnérable affiché sans consentement formel écrit des tuteurs).

---

## 5. SPÉCIFICATIONS TECHNIQUES, ERGONOMIE ET SÉCURITÉ

### 5.1 Architecture Technique et CMS
- **Technologies Web** : HTML5, CSS3 Moderne (Design System personnalisé), JavaScript ES6+ / React / Next.js ou CMS headless léger et réactif.
- **Design System & Aesthetics** :
  - Palette de couleurs professionnelles et chaleureuses (Vert Nature/Espoir, Bleu Protection/Trust, Or/Jaune Soleil d'Afrique).
  - Typographie moderne et très lisible (Google Fonts : Outfit / Inter).
  - Mode Sombre / Mode Clair adaptatif.
  - Micro-animations fluides pour une expérience utilisateur premium.
- **Responsive & Mobile-First** : Optimisation poussée pour smartphones et tablettes (plus de 80% des utilisateurs en RDC naviguent sur mobile).
- **Optimisation Bande Passante** : Poids des pages ultra-léger (compression WebP/AVIF pour les images, mise en cache progressive) pour un chargement instantané même en connexion 3G/Edge au Nord-Kivu.

### 5.2 Multilinguisme
- **Langue Principale** : Français (Langue officielle de travail - Art. 23).
- **Langue Secondaire** : Anglais (Indispensable pour la visibilité auprès des bailleurs de fonds et ONG internationales).

### 5.3 Sécurité et Protection des Données (RGPD & Droits Congolais)
- **Protocole SSL/HTTPS** obligatoire avec certificat valide.
- **Chiffrement des Données Sensibles** : Chiffrement bout-en-bout des formulaires de signalement d'abus d'enfants (Safeguarding).
- **Protection Anti-Spam & Anti-DDOS** : CAPTCHA invisible (reCAPTCHA v3 / Cloudflare TURNSTILE) sur tous les formulaires.
- **Sauvegardes Automatiques** : Sauvegarde quotidienne de la base de données et hebdomadaire du site complet.

---

## 6. PLANNING DE RÉALISATION ET PHASES DU PROJET

| Phase | Description des Livrables | Durée Estimée |
| :--- | :--- | :--- |
| **Phase 1 : Conception UX/UI** | Maquettes fonctionnelles (Wireframes), Charte graphique, Arborescence validée | 1 semaine |
| **Phase 2 : Développement Front-End & Back-End** | Intégration du Design System, Développement des modules (Safeguarding, Dons, Adhésion) | 2 semaines |
| **Phase 3 : Intégration du Contenu & Textes Légaux** | Intégration des statuts, photos, fiches projets et paramétrage du Mobile Money | 1 semaine |
| **Phase 4 : Tests & Securité** | Audit de sécurité, tests responsive 3G/4G, validation du canal de signalement | 3 jours |
| **Phase 5 : Déploiement & Formation** | Mise en ligne sur le nom de domaine officiel (`.org`), formation de l'équipe d'administration à Goma | 2 jours |

---

## 7. CRITÈRES DE VALIDATION ET RECETTE

Le projet sera considéré comme validé après vérification des critères suivants :
1. ✅ Conformité à 100% avec les **Statuts de l'ONG Bright Africa** (Gouvernance, Vision, 4 Piliers).
2. ✅ Bon fonctionnement du **Module de Signalement Safeguarding** (Art. 22) et routage vers le Référent Protection.
3. ✅ Intégration fonctionnelle du **Module de Don** (Mobile Money + Carte).
4. ✅ Chargement rapide et parfait affichage sur mobile en zone à faible débit internet.
5. ✅ Formation de l'équipe administrative de Bright Africa à la mise à jour des contenus.

---
*Document établi pour l'ONG Bright Africa — Ville de Goma, Nord-Kivu, RDC.*
