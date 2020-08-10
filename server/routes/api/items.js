const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Item = require("../../models/Item");

// Get all items
router.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Create Item
router.post(
  "/",
  [
    check("partNumber", "Part Number is required").not().isEmpty(),
    check("name", "Part Name is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      partNumber,
      name,
      amount,
      orderLimit,
      category,
      instrument,
    } = req.body;

    try {
      // see if item exists
      let item = await Item.findOne({ partNumber });

      if (item) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Part already exists" }] });
      }

      item = new Item({
        partNumber,
        name,
        amount,
        orderLimit,
        category,
        instrument,
      });

      await item.save();
      await res.json({ item });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete Item
router.delete("/:id", (req, res) => {
  const _id = "";
  Item.findOneAndRemove({ _id: req.params.id }, req.body, function (err, data) {
    if (!err) {
      console.log("Deleted");
    } else {
      console.log(err);
    }
  });

  res.send(_id);
});

// Get by id
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

// update by id
router.post("/update/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.partNumber = req.body.partNumber;
      item.name = req.body.name;
      item.amount = req.body.amount;
      item.orderLimit = req.body.orderLimit;
      item.lessThanLimit = req.body.lessThanLimit;
      item.category = req.body.category;
      item.instrument = req.body.instrument;
      item.date = req.body.date;

      item
        .save()
        .then(() => res.json("Item updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// Search for items
router.get("/search/:query", function (req, res, next) {
  const query = req.params.query;
  if (query == "brass" || query == "woodwind" || query == "percussion") {
    Item.find({ category: query })
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    Item.find({ instrument: query })
      .then((items) => res.json(items))
      .catch((err) => res.status(400).json("Error: " + err));
  }
});

module.exports = router;
