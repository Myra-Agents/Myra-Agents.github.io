---
title: "Myra Agents vs Claude : où va le futur des agents de code"
slug: myra-vs-claude
date: 2026-06-10
status: draft
tags: [comparatif, agents, automatisation, mobile, kanban]
description: >
  Claude est un excellent assistant conversationnel. Myra Agents est un
  orchestrateur d'agents. Comparatif honnête — et le grand angle mort que
  personne ne comble encore : piloter ses automatisations depuis le mobile.
---

# Myra Agents vs Claude : où va le futur des agents de code

> **Statut : brouillon.** Notes de travail pour un futur article. Chiffres et
> captures à compléter avant publication.

Claude (l'app et l'API d'Anthropic) et Myra Agents ne jouent pas le même match.
Claude est un **assistant** : tu lui parles, il répond, tu repars avec le
résultat. Myra Agents est un **orchestrateur** : tu décris une tâche sur une
carte, et un agent CLI (opencode / copilot / claude / custom) l'exécute en
headless, en streamant sa sortie sur un board Kanban. Le but de cet article
n'est pas de dire « lequel est meilleur » — c'est de montrer **ce que chacun
fait bien, et où est le vide que le futur va remplir.**

## En une ligne

- **Claude** = le meilleur cerveau, mais une session à la fois, tu dois rester
  dans la boucle.
- **Myra Agents** = plusieurs agents qui tournent en parallèle, planifiés,
  visibles sur un board, et tu n'as pas à les surveiller.

## Tableau comparatif

| Axe | Claude (app/desktop/mobile) | Myra Agents |
|-----|------------------------------|-------------|
| Modèle de travail | Conversation 1:1 | Board Kanban, N agents en parallèle |
| Exécution | Synchrone — tu attends la réponse | Asynchrone — l'agent tourne, tu fais autre chose |
| Cycle de vie d'une tâche | Implicite (le fil de chat) | Explicite : Draft → Todo → In Progress → Waiting Feedback → Awaiting Review → Done |
| Choix de l'agent | Claude uniquement | opencode / copilot / claude / binaire custom |
| **Planification (scheduling)** | ❌ Aucune | ✅ cron / daily / weekly / interval / once |
| Automatisations récurrentes | ❌ | ✅ cartes auto-matérialisées et lancées |
| Local / vie privée | Cloud | Sidecar local (`myra-server`), données sur ta machine |
| **Pilotage mobile des automatisations** | ❌ (voir plus bas) | 🔜 opportunité — pas encore d'app mobile |

## Le grand angle mort : l'automatisation sur mobile

Voici le constat qui a déclenché cet article. **L'app mobile de Claude ne
permet pas de gérer ses automatisations / le scheduling de tâches.** Tu peux
discuter, mais tu ne peux pas dire « lance cet agent tous les matins à 8h » ni
voir/éditer/mettre en pause tes tâches planifiées depuis ton téléphone.

C'est logique côté Claude : c'est un assistant conversationnel, pas un
ordonnanceur. Mais ça laisse un **espace produit grand ouvert** :

> Le téléphone est le bon endroit pour **surveiller et piloter** des agents qui
> tournent ailleurs — pas forcément pour les faire tourner. « Mon agent de
> nettoyage de PR a tourné cette nuit, voici le diff, j'approuve depuis le
> métro. »

### Ce qu'une app mobile Myra devrait faire (et pas faire)

**À faire :**
- Voir l'état du board en temps réel (push-based, comme le desktop).
- Gérer les **schedules** : créer / éditer / pause / déclencher maintenant.
- Recevoir une notif quand une carte passe en `Waiting Feedback` ou
  `Awaiting Review`.
- Approuver / donner du feedback / déplacer une carte de lane.

**À ne pas faire (au début) :**
- Faire tourner l'agent CLI sur le téléphone — l'exécution reste sur la machine
  qui héberge le sidecar / le worker. Le mobile est une **télécommande**, pas un
  runtime.

L'archi actuelle aide : les mises à jour sont déjà des événements push
(`agent-log-appended`, `agent-result-changed`, `schedules-updated`) et le
backend passe par une couche de transport (sidecar HTTP local + connexions
distantes/cloud). Une app mobile devient surtout un **client de plus** sur cette
même couche, pas un nouveau cerveau.

## Quand utiliser quoi

- **Une question, une réflexion, un bout de code maintenant** → Claude.
- **Du travail récurrent, parallèle, planifié, que tu veux suivre sans
  babysitter** → Myra Agents.
- Les deux se combinent : Claude *est* l'un des agents que Myra peut lancer.

## À compléter avant publication

- [ ] Capture du board Kanban + d'un schedule.
- [ ] Vérifier l'état exact de l'app mobile Claude au moment de publier (ça bouge
      vite — re-tester avant d'affirmer « ne gère pas le scheduling »).
- [ ] Mockup de l'app mobile Myra (vue schedules + notif d'approbation).
- [ ] Décider : article comparatif neutre, ou teaser de la roadmap mobile ?
- [ ] Relire le ton — éviter le « concurrent-bashing », rester factuel.
