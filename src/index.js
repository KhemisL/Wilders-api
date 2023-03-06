const express = require("express");
const typeorm = require("typeorm");
const Wilder = require("./entity/Wilder");


const app = express();

const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database:"./wildersdb.sqlite",
    synchronize: true,
    entities: [Wilder],

})

app.get("/", (req, res)=>{
    res.send("hello worlds");
});



const start = async () => {
    await dataSource.initialize();

    await dataSource.getRepository(Wilder).save({
            name: "first wilder",
            description: "test de description",
            
    });

    app.listen(3000, ()=> {
        console.log("Le serveur est démarrer sur le port 3000");
    })
}

start();