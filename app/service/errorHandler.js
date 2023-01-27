const { appendFile } = require("fs");
const ExpressError = require('./ExpressError')
const path = require("path");

const errorHandler = {
    /**
     * Method that throw an error 404, Express error middleware will deal with it
     */
    notFound() {
        throw new ExpressError("Not Found", 404);
    },
    /**
     * 
     * @param {Error} err error reported by the system
     * @param {*} _ unused parameter
     * @param {Express.Response} res Express Response
     * @param {*} __ unused parameter
     * @returns {} 404 - not found
     * @returns {} 500 - internal server error
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
                res.sendStatus(404);
                break;
            default:
                res.sendStatus(500);
                break;
        }

    }
};

module.exports = errorHandler;