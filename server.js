
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let session = require("express-session");

//template
app.set("view engine", "ejs");

// mes middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/assets", express.static("public"));
app.use(session({
    secret: 'keyboard cat', //clé secrete pour chiffrer
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //car pas en http
}))
app.use(require("./middlewares/flash"));


//mes routes
app.get("/", (request, response) => {
    console.log(request.session)
    //création du middleware flash pour remplacer ceci :
    /*if (request.session.error) {
        response.locals.error = request.session.error
        request.session.error = undefined
    }*/
    response.render("pages/index")
});
app.post("/", (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {

        request.flash("error", "Vous n'avez pas posté de message")

        //response.render("pages/index", { error: "vous n'avez pas rentré de message :(" });
        response.redirect("/")

    }

});


app.listen(7072)
console.log("server running");