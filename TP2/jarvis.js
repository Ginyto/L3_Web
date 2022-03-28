const jarvis = {


    // Initialize the jarvis
    /**
     * Print out hello there
     */
    hello() {
        console.log("Hello there")
    },



    /**
     * Gerer et lance les fonction en standby en fonction de la page
     * @param {*} no_page Numero de la page
     */
    standby(no_page) {

        //console.log("link start")

        if (no_page === 0) {

        }


        else if (no_page === 1) {
        }


        else if (no_page === 2) {

        }

        //console.log("link out")

    },




    /**
     * Charge le JSON file et en permet l'utilisation, permet de lancer les differentes fonction qui en depende
     */
    loadjson(no_page) {
        fetch("database.json")
            .then(reponse => reponse.json())
            .then(data => {
                //zone de lancement des fonction dependente de JSON
                const base = data

            })
    },


    /**
     * Renvoie le l'objet html ciblé
     * @param {*} target nom de la cible
     * @returns objet hmtl
     */
    ciblage(target) {

        const id = document.getElementById(target)

        // console.log("->",test)

        //console.log("id ->", id)

        const classname = document.getElementsByClassName(target).item(0)

        //console.log("classname ->", classname)

        if (id != null) {
            //console.log(id)
            return id
        }

        else if (classname != null) {

            return classname
            
        }

        else {
            console.log("erreur l'élément n'existe pas")
        }
    },


    /**
     * permet l'insertion d'une image selon la cible hmtl
     * @param {*} cible cible html
     * @param {*} src path de la photo a inserer
     */
    picture(cible, src) {
        cible.src = src
    },


    /**
     * Permet de cibler un element html et d'écrire dedans
     * @param {*} cible cible html
     * @param {*} text texte à unjecté
     */
    write(cible, text) {

        //console.log(cible)

        try {
            cible.innerHTML += text
        } catch (error) {
            console("injection du texte à la cible html echoué", error)
        }

        //console.log(cible)
    },

    write_email(cible, text) {

        //console.log(cible)

        try {
            cible.href += 'mailto:'+text
        } catch (error) {
            console("injection du texte à la cible html echoué", error)
        }

        //console.log(cible)
    },



    /**
     * permet l'ecriture de plusieur ligne loading d'un JSON dans une cible hmtl
     * @param {*} cible cible html
     * @param {*} tab tableau
     */
    write_article(cible,tab) {
        for (let index = 0; index < tab.length; index++) {
            const element = tab[index]
            this.write(cible,element)
        }
    },



    /**
     * Permet la navigation dans le site selon le numero du site
     * @param {*} param numero du site
     */
    pathfinder(param) {

        if (param == 0) {
            document.location.pathname = "";
        }

        if (param == 1) {
            document.location.pathname = "";
        }

        if (param == 2) {
                document.location.pathname = "";
        }
        
        if (param == 3) {
            document.location.pathname = "";
        }

        if (param == 4) {
                document.location.pathname = "";
        }

    },

    /**
     * Lance le mode sombre
     */
    dark_mode_on() {
        this.dark_mode()

        if (localStorage.getItem("dark_mode") === "on") {
            localStorage.setItem("dark_mode", "off")
        }
        else {
            localStorage.setItem("dark_mode", "on")
        }
    },


    /**
     * Ajout du dark mode
     */
    dark_mode() {
        const page = document.querySelector('*')
        
        page.classList.toggle("dark_mode")

        
    
    },


    /**
     * Creer l'element img et les inject dans le parent
     * @param {*} parent parent
     * @param {*} className nom de la className
     * @param {*} folder Nom du dossier des photo 
     * @param {*} no Numero des photo
     * @returns la photo créer
     */
    create_photo(parent, className, folder, no) {

        //console.log(parent)
        
        const images = document.getElementById(`${parent}`)
        
        //console.log(images)

        const photo = document.createElement("img")

        photo.className = className

        photo.id = `photo${no}`

        photo.src = `Images/${folder}/${no}.jpg`

        photo.alt = `photo ${no}`

        images.appendChild(photo)

        return photo

    },


    /**
     * Charge et affiche les photos dans la zone cible (parent)
     * @param {*} parent parent
     * @param {*} id id de la photo
     * @param {*} src source de la photo
     * @param {*} size nombre de photo dans le dossier
     */
    loading_photos(parent,id,src, size){

        for (let index = 1; index <= size; index++) {
            this.create_photo(parent,id,src,index)
        }
    }
}