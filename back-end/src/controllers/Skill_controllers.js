const dataSourceSkill = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports = {
    /////////////////// create ////////////////////////
    createSkill: async (req, res) => {
        try {
            const createSkill =  await dataSourceSkill.getRepository(Skill).save(req.body)
        res.send(createSkill);
        } catch (error) {
            if (error.code === "SQLITE_CONSTRAINT") {
                return res.status(409).send("Skill already exist")
            }
            return res.send("Error creating Skill");
        }

    },

    ///////////////////// read /////////////////////////
    readSkill: async (req, res) => {
        try {

            const skill =  await dataSourceSkill.getRepository(Skill).find()
            res.send(skill);

        } catch (error) {

            res.send("Error get skill");
        }
    },

    /////////////////// readOne ////////////////////////
    readOneSkill: async (req, res) => {
        try {
            const oneSkill=await dataSourceSkill.getRepository(Skill).findOne({where: { id: req.params.id }})
        res.send(oneSkill);

        } catch (error) {
            res.send("Error get one skill");
        }
    },

    /////////////////// Update ////////////////////////
    updateSkill: async (req, res) => {
        try {
            
            const { id }= req.params
            await dataSourceSkill.getRepository(Skill).update(id, req.body)
            res.send("Update Skill");

        } catch (error) {
            res.send("Error update wilder");
        }
    },

    /////////////////// delete ////////////////////////
    deleteSkill: async (req, res) => {
        try {
            const deleteSkill =  await dataSourceSkill.getRepository(Skill).delete(req.params.id)
            res.send('succes delete');
            
        } catch (error) {
            res.send("Error delete wilder");
        }
    },
}