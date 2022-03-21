const jarvis = {

    delete_all() {
        const tab = document.getElementsByClassName("tab")

        while (tab.item(0).children.length > 1) {
            this.delete()
        }
    },

    delete() {
        const tab = document.getElementsByClassName("tab")

        // console.log(tab.item(0).children.item(1))

        tab.item(0).children.item(1).remove()

    },

    create_cell() {

        const tab = document.getElementsByClassName("tab")

        console.log(tab)

        const ligne = document.createElement('tr')

        ligne.className = 'lignes'

        for (let index = 0; index < 4; index++) {
            const element = document.createElement('td')

            element.className = 'col'

            element.innerHTML = index

            ligne.appendChild(element)
        }

        tab.item(0).appendChild(ligne)

    },
    
    add() {
        console.log("J'ajoute une personne")
        this.create_cell()
    },

    erased() {
        console.log("Je supprime tout")
        this.delete_all()
    }

}