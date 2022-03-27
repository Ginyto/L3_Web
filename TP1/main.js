const jarvis = {

    click: 0,

    standby() {
        this.chronos_add()
        this.enter()
        this.spam()

    },

    spamclick() { 
        this.click++
        //console.log("nbr de clic", this.click)

    },

    spam() {
        var harbourg = 2;

        const tic_tac = setInterval(() => {
            

            //console.log(harbourg)

            harbourg--

            if (this.click > 4) {
                //console.log("arrete ça tout de suite")

                const form = document.querySelector(".formulaire")

                form.classList.toggle("piou")

                const punition = setTimeout(() => {
                    form.classList.toggle("piou")
                }, 5000)

            }


            if (harbourg == -1) {

                harbourg = 2;

                //console.log("reset")

                this.click = 0;

            }


        }, 1000);
    },

    enter() { 
        window.addEventListener('keydown', (e) => { 
            if (e.key == 'Enter') {
                this.add()
            }
        }, false);
    },


    aim() {

        window.addEventListener('click', (clic) => {

            if (clic.target) {

                const cible = clic.target;

                //console.log(cible);

                cible.classList.toggle('piou');
            }
        });
    },


    pioupiou() {
        document.body.style.cursor = "crosshair";

        this.godmode = true;

        this.aim()

    },

    backflip() {
        const cible = document.querySelector('.formulaire');

        cible.classList.toggle('rotaup');

        //console.log(cible);
    },

    chronos_add() { 
        
        var harbourg = 10
        const cible = document.querySelector('.ton')
        cible.classList.toggle('desactive')
            
        const tic_tac = setInterval(() => {
            //console.log(`${harbourg} secondes`)
            cible.innerHTML = `${harbourg} secondes`
            
            cible.onclick = function () { 
                console.log('fonction désactivée')
            }

            harbourg--

            if (harbourg == -1) {

                
                try {
                    clearInterval(tic_tac)

                    //console.log('Temps écoulé !')
                    cible.innerHTML = 'Ajouter'
                    cible.classList.toggle('desactive')
                    
                    cible.onclick = function () { 
                        jarvis.add()
                    }
                    

                } catch (error) {
                    console.log(error)
                    console.log('clearInterval() failed')
                }

            }

        }, 1000);
    },

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

    empty() {
        const tab = document.getElementsByClassName("tab")

        const champs = document.getElementsByClassName("champs")

        const nom = champs.item(0).children.item(1).value

        const prenom = champs.item(1).children.item(1).value

        const mail = champs.item(2).children.item(1).value

        const role = champs.item(3).children.item(1).value

        if ((nom && champs && prenom && mail && role) != "") {
            //console.log("ya du text")
            return true
        }
        else {
           // console.log("form incomplete")
            return false
        }
    },

    erased_form() {
        const champs = document.getElementsByClassName("champs")

        for (let index = 0; index < 3; index++) {

            if (champs.item(index).children.item(1).value == "GTA") {
                this.pioupiou()
            }
            champs.item(index).children.item(1).value = ""
        }

        

    },

    create_cell() {

        const tab = document.getElementsByClassName("tab")

        const champs = document.getElementsByClassName("champs")

        const nom = champs.item(0).children.item(1).value

        const prenom = champs.item(1).children.item(1).value

        const mail = champs.item(2).children.item(1).value

        const role = champs.item(3).children.item(1).value


        //console.log(champs.item(0).children.item(1).value)

        const ligne = document.createElement('tr')

        ligne.className = 'lignes'

        for (let index = 0; index < 4; index++) {
            const element = document.createElement('td')

            element.className = 'col'

            if (index === 0) {
                element.innerHTML = nom
            }
            else if (index === 1) {
                element.innerHTML = prenom
            }
            else if (index === 2) {
                element.innerHTML = mail
            }
            else if (index === 3) {
                element.innerHTML = role
            }

            ligne.appendChild(element)
        }

        tab.item(0).appendChild(ligne)

    },
    
    add() {
        //console.log("J'ajoute une personne")
        if (this.empty()) {
            this.chronos_add()
            this.create_cell()
            this.erased_form()
        }
        else {
            alert("Vous devez remplir tout le formulaire")
        }
    },

    erased() {
        //console.log("Je supprime tout")
        this.delete_all()
    }

}

jarvis.standby()
