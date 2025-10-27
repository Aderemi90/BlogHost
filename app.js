require("dotenv").config(); 

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


console.log("Mongo URI:", process.env.dbURI);

// --- Connect to MongoDB --- //
mongoose
  .connect(process.env.dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- View Engine --- //
app.set("view engine", "ejs");
app.set("views", "views");

// --- Middleware --- //
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// --- Routes --- //
app.get("/", (req, res) => res.redirect("/blogs"));
app.use("/blogs", blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => res.redirect("/about"));

// --- 404 Page --- //
app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});


if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;