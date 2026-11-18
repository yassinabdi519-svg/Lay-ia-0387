 # LAY IA — état de livraison

- Projet géré créé dans /home/user/lay-ia, web port 4200.
- Accueil rouge/blanc, logo original, rubriques, exemple de conversation explicitement illustratif, FAQ, tarifs et interface mobile construits.
- Tarifs confirmés : 500 FDJ/semaine, 5 000 FDJ/mois. Bouton d’activation désactivé ; aucun encaissement ni droit Premium. WAAFI personnel non intégré.
- Better Auth Google et email/mot de passe configuré. Schéma généré et appliqué. Inscription email et déconnexion testées avec succès sur mobile ; OAuth Google non testé de bout en bout.
- Interface et endpoint de discussion connectés à la passerelle v3. Test réel : HTTP 402 paid_plan_required. Aucune réponse réelle obtenue. Le propriétaire doit activer un abonnement Runable payant ; erreurs explicites côté utilisateur.
- Consignes de prudence et de refus configurées ; impossible de vérifier leur efficacité tant que le modèle ne répond pas.
- Aucun fournisseur vidéo connecté ; fonctions Premium indisponibles. Pas de recherche d’offres d’emploi temps réel.
- Test Playwright Chrome : pas d’erreur JS au chargement ; aucun débordement horizontal à 390px ; sélection tarif mensuel et bouton d’activation désactivé vérifiés.
- Build passé, lint sans erreurs après corrections des labels et dialogues ; serveur lancé dans tmux lay-web.

## Suite
Activer l’abonnement Runable, retester les conversations et les refus. Demander le compte marchand et la documentation WAAFI. Valider le fournisseur vidéo, les limites et les coûts avant intégration. Ne pas débloquer Premium sans paiement vérifié côté serveur.