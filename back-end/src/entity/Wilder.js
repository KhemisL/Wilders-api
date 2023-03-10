const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name:"Wilder",

    columns: {
        id:{
            primary:true,
            generated: true,
            type: "int",
        },
        name:{
            type: "text",
        },
        email:{
            type: "text",
            nullable: true,
            unique: true,
        },
        city:{
            type: "text",
            nullable: true,
        },

    },
    relations: {
        skills: {
            target: "Skill",
            type: "many-to-many",
            joinTable: true,
            eager: true
        }
    }
})