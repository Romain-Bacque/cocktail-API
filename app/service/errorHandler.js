const { appendFile } = require("fs");
const ExpressError = require('./ExpressError')
const path = require("path");

const errorHandler = {
    /**
     * Méthode de déclenchement d'une erreur si erreur 404
     */
    notFound() {
        throw new ExpressError("Not Found", 404);
    },
    /**
     * 
     * @param {Error} err erreur remonté par le système
     * @param {*} _ paramètre inutilisé
     * @param {Object} res reponse d'Express
     * @param {*} __ paramètre inutilisé
     */
    manage(err, _, res, __) {
        const now = new Date();
        const fileName = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}.log`;
        const filePath = path.join(__dirname,`../../log/${fileName}`);

        const errorMessage = now.getHours() + "h - " + err + "\r";
        appendFile(filePath,errorMessage,(error)=>{

        });
        
        switch (err.statusCode) {
            case 404:
                res.status(404).json({ error: "Not found" });
                break;
            default:
                res.status(500).json({ error: "Internal error" });
                break;
        }

    }
};

module.exports = errorHandler;