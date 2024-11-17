const path = require("node:path");

const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];


app.get("/", (req, res) => {
    res.render("index", { messages: messages });
  });
app.get("/new",(req,res) => res.render("form"));


app.post("/new", (req, res) => {
    const { text, user } = req.body;
    if (text && user) {
      messages.push({ text, user, added: new Date() }); // Add the new message
    }
    res.redirect("/"); // Redirect back to the homepage
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
