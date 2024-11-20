const express = require("express");
const router = express.Router();
const relationService = require("../services/relation.service");

router.get("/", async (req, res) => {
  try {
    var relations = await relationService.getAll();
    res.json(relations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Create a new Relation

router.post("/", async (req, res) => {
  try {
    var createdRelation = await relationService.createRelation(req.body);
    res.status(201).json(createdRelation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong!" });
  }
});

// Get a Relation by ID

router.get("/id/:id", async (req, res) => {
  try {
    var relation = await relationService.findRelationById(req.params.id);
    if (!relation) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Relation does not exist" });
    }
    return res.json(relation);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Get a Relation by PhoneNumber

router.get("/phone/:number", async (req, res) => {
    try {
        var relation = await relationService.findRelationByPhoneNumber(req.params.number);
        if(!relation){
            return res
            .status(404)
            .json({ statusCode: 404, error: "Relation does not exist" }); 
        }
        return res.json(relation);
    } catch (error) {
        return res
            .statusCode(500)
            .json({ statusCode: 500, error: "Something went wrong" });
    }
});

// Update a Relation with a specific ID

router.put("/:id", async (req, res) => {
  try {
    var exisitingRelation = await relationService.findRelationById(req.params.id);
    console.log(exisitingRelation);
    if (!exisitingRelation) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Relation does not exist" });
    }
    var updatedRelation = await releationService.updateRelation(req.body);
    return res.json(updatedRelation);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

// Delete a Relation with a specific ID

router.delete("/:id", async (req, res) => {
  try {
    var exisitingRelation = await relationService.findRelationById(req.params.id);
    if (!exisitingRelation) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Relation does not exist" });
    }

    await relationService.deleteRelation(req.params.id);
    return res.json({
      statusCode: 200,
      message: `Relation with id: ${req.params.id} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;

// route functions