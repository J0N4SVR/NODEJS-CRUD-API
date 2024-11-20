const db = require("../config/db");

const getAll = async () => {
  return await db.Relation.findAll();
};

const findRelationById = async (Id) => {
  return await db.Relation.findByPk(Id);
};

const findRelationByPhoneNumber = async(PhoneNumber) => {
    const { Op } = require("sequelize");

    return await db.Relation.findAll(
        {
            where: {
                PhoneNumber: {
                    [Op.like]: '%' + PhoneNumber.substr(0,1) + '%' + PhoneNumber.substr(1,1) + '%' + PhoneNumber.substr(2,1) + '%' + PhoneNumber.substr(3,1) + '%' + PhoneNumber.substr(4,1) + '%' + PhoneNumber.substr(5,1) + '%' + PhoneNumber.substr(6,1) + '%' + PhoneNumber.substr(7,1) + '%' + PhoneNumber.substr(8,1) + '%'
                }
            }
        }
    ); 
};

const createRelation = async ({ PhoneNumber, RelationId, RelationName }) => {
  const newRelation = await db.Relation.create({ PhoneNumber, RelationId, RelationName });
  return newRelation;
};

const updateRelation = async ({ Id, PhoneNumber, RelationId, RelationName }) => {
  await db.Relation.update(
    { PhoneNumber, RelationId, RelationName },
    {
      where: {
        Id: Id,
      },
    }
  );
  return { Id, PhoneNumber, RelationId, RelationName };
};

const deleteRelation = async (Id) => {
  await db.Relation.destroy({
    where: { Id: Id },
  });
};

module.exports = {
  getAll,
  findRelationById,
  findRelationByPhoneNumber,
  createRelation,
  updateRelation,
  deleteRelation,
};