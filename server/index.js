const port = process.env.PORT || 3000;
const app = require("./app");
const { conn, Product, User, Note } = require("./db"); // Import Note from your db.js

app.listen(port, async () => {
  try {
    console.log(`listening on port ${port}`);
    //seed data
    await conn.sync({ force: true });
    const [moe, lucy] = await Promise.all([
      User.create({ username: "moe", password: "m", luckyNumber: 8 }),
      User.create({ username: "lucy", password: "l" }),
    ]);
    await Promise.all([
      Product.create({ name: "foo" }),
      Product.create({ name: "foop", inStock: false }),
      Product.create({ name: "bar", inStock: false }),
      Product.create({ name: "bazz" }),
      Product.create({ name: "quq" }),
      Product.create({ name: "quq!!", inStock: false }),
    ]);

    // Seed some Notes data for each user
    await Promise.all([
      Note.create({
        content: "Moe's first note",
        title: "Moe's Note 1",
        userId: moe.id,
      }),
      Note.create({
        content: "Moe's second note",
        title: "Moe's Note 2",
        userId: moe.id,
      }),
      Note.create({
        content: "Lucy's first note",
        title: "Lucy's Note 1",
        userId: lucy.id,
      }),
      Note.create({
        content: "Lucy's second note",
        title: "Lucy's Note 2",
        userId: lucy.id,
      }),
    ]);

    console.log("seeded");
  } catch (ex) {
    console.log(ex);
  }
});
