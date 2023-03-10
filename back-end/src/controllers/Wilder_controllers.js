const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports = {

/////////////////// create ////////////////////////
    create: async (req, res) => {
        try {
            const create =  await dataSource.getRepository(Wilder).save(req.body)
        res.send(create);
        } catch (error) {
            if (error.code === "SQLITE_CONSTRAINT") {
                return res.status(409).send("Wilder email already exist")
            }
                return res.send("Error creating Wilder");
            
        }

    },

///////////////////// read /////////////////////////
    read: async (req, res) => {
        try {

            const users =  await dataSource.getRepository(Wilder).find()
            res.send(users);

        } catch (error) {

            res.send("Error get wilder");
        }
    },

 /////////////////// readOne ////////////////////////
    readOne: async (req, res) => {
        try {
            const oneUsers=await dataSource.getRepository(Wilder).findOne({where: { id: req.params.id }})
        res.send(oneUsers);
        } catch (error) {
            res.send("Error get one wilder");
        }
    },

 /////////////////// Update ////////////////////////
    update: async (req, res) => {
        try {
            const { id }= req.params
            await dataSource.getRepository(Wilder).update(id, req.body)
            res.send("Wilder update");
        } catch (error) {
            res.send("Error update wilder");
        }
    },

/////////////////// delete ////////////////////////
    delete: async (req, res) => {
        try {
            const deleteUsers =  await dataSource.getRepository(Wilder).delete(req.params.id)
            res.send('succes delete');

        } catch (error) {
            res.send("Error delete wilder");
        }
    },

///////////////// addSkill relation /////////////////
    addSkill: async (req, res) => {
        try {
            const wilderToUpdate = await dataSource.getRepository(Wilder).findOneBy({ id: req.params.wilderId});
            console.log(wilderToUpdate);

            const skillToAdd = await dataSource.getRepository(Skill).findOneBy({ id: req.params.skillId });
            wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];

            await dataSource.getRepository(Wilder).save(wilderToUpdate);
            res.send("skill added to wilder");

        } catch (error) {
            
            res.send("Error while adding skill to wilder");
        }
    },

    ///////////////// removeSkill /////////////////
    removeSkill: async (req, res) => {
        try {
            const wilderToUpdateRemove = await dataSource.getRepository(Wilder).findOneBy({ id: req.params.wilderId});
            console.log(wilderToUpdate);

            const skillToRemove = await dataSource.getRepository(Skill).findOneBy({ id: req.params.skillId });
            
            // wilderToUpdateRemove.skills.splice(skillToRemove)

            // await dataSource.getRepository(Wilder).save(wilderToUpdateRemove);
            // console.log(wilderToUpdateRemove);
            // res.send("skill removed to wilder");

            
            wilderToUpdateRemove.skills = wilderToUpdateRemove.skills.filter((skill) => {
                return skill.id !== skillToRemove.id
            })
            const test = await dataSource.manager.save(wilderToUpdateRemove)
            // res.send("skill removed to wilder");

            console.log("hello test", test);

        } catch (error) {
            res.send("Error while remove skill to wilder");
        }
    },

};




