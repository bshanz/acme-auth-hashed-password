const router = require("express").Router();
const { User, Note } = require("../db");
const restricted = require("../middleware");

router.get("/user/:userId", async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.send(notes);
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    if (req.user) {
      const note = await Note.create(req.body);
      res.send(note);
    } else {
      next(new Error("Not authorized"));
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:noteId", async (req, res, next) => {
  try {
    await Note.destroy({
      where: {
        id: req.params.noteId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
