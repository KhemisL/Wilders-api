//appel des fichers et express
const express = require("express");
const dataSource = require("./utils").dataSource;
const wilderController = require("./controllers/Wilder_controllers");
const skillController = require("./controllers/Skill_controllers");
const cors = require("cors")
// création de App
const app = express();
app.use(express.json());
app.use(cors());


//route GET
app.get("/", (req, res)=>{
res.send("hello worlds");
});

// app.use(( req, res, next) => {  
    
//     if(Math.floor(Math.random() * 3) === 0){
//         res.status(418).send("Im a teapot"); 
//         const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//         console.error(`Teapot error for IP ${ip}`);
//     } else{
//         next()
        
//     }
    
    
// });

// crétaiotn routes Wilders
app.post("/api/wilder", wilderController.create);
app.get("/api/wilder/users", wilderController.read);
app.get("/api/wilder/oneUser/:id", wilderController.readOne);
app.delete("/api/wilder/users/delete/:id", wilderController.delete);
app.put("/api/wilder/users/update/:id", wilderController.update);

// création routes Skills
app.post("/api/skill", skillController.createSkill);
app.get("/api/wilder/skills", skillController.readSkill);
app.get("/api/wilder/skill/:id", skillController.readOneSkill);
app.put("/api/wilder/skills/update/:id", skillController.updateSkill);
app.delete("/api/wilder/skills/delete/:id", skillController.deleteSkill);

// création de route pour ajouter un skill à un wilder
app.post("/api/wilder/:wilderId/skill/:skillId/add", wilderController.addSkill);
app.delete("/api/wilder/:wilderId/skill/:skillId/remove", wilderController.removeSkill);
// function asyncrone pour initialiser la base de donnée / écouter le port 
const start = async () => {

await dataSource.initialize();
app.listen(3000, ()=> {console.log("Le serveur est sur le port 3000")});
}


//appel de la fonction 
start();