# CLASSE BLOC-NOTE

Ce projet consiste en la création d'une classe `Note` en Python, qui permet de sauvegarder des notes dans un dictionnaire et de les consulter en utilisant une clé correspondant à la valeur que l'utilisateur souhaite afficher.

## Instructions

1. **Classe Note :**
   - Créez une classe `Note` avec les attributs et les méthodes nécessaires pour sauvegarder des notes (str) dans un dictionnaire.

2. **Fonction de consultation :**
   - Ajoutez une fonction dans la classe `Note` qui permet à l'utilisateur de consulter une note en fournissant la clé correspondant à la valeur qu'il souhaite afficher.

3. **Script main.py :**
   - Créez un script `main.py` pour utiliser la classe `Note` et démontrer son fonctionnement.

4. **Gestion des erreurs :**
   - Intégrez des clauses TRY / EXCEPT pour gérer les cas où l'utilisateur saisit une clé invalide lors de la consultation des notes.

## Exemple d'utilisation

Voici un exemple d'utilisation de la classe `Note` :

```python
# Création d'une instance de la classe Note
bloc_note = Note()

# Ajout de notes
bloc_note.ajouter_note("Tâche 1", "Faire les courses")
bloc_note.ajouter_note("Tâche 2", "Rédiger le rapport")

# Consultation d'une note
try:
    clef = input("Entrez la clé de la note à consulter : ")
    print("Note correspondante :", bloc_note.consulter_note(clef))
except KeyError:
    print("La clé saisie n'existe pas.")
