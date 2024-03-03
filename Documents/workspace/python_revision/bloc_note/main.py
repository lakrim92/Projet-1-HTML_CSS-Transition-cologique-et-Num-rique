class Note:
    def __init__(self):
        self.notes = {}

    def ajouter_note(self, clef, valeur):
        self.notes[clef] = valeur

    def consulter_note(self, clef):
        return self.notes[clef]

if __name__ == "__main__":
    bloc_note = Note()

    bloc_note.ajouter_note("Tache 1", "Faire les courses")
    bloc_note.ajouter_note("Tache 2", "Rédiger le rapport")

    try:
        clef = input("Entrez la clé de la note à consulter : ")
        print("Note correspondante : ", bloc_note.consulter_note(clef))
    except KeyError:
        print("La clé n'existe pas.")
