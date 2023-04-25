const router = require("express").Router();
const { User, Note } = require("../db");

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

router.post("/", async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.send(note);
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
