const express = require("express");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const DB =
  "postgresql://neondb_owner:npg_K6rbxGjQBY4u@ep-solitary-waterfall-a8zavf7j-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require";

const pool = new Pool({
  connectionString: DB,
  ssl: {
    rejectUnauthorized: false,
  },
});

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
  res.send({ message: "Backend is running!" });
});

// ✅ Registration route
app.post("/registration", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query =
      "INSERT INTO log (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, password];
    const result = await pool.query(query, values);

    res
      .status(200)
      .send({ message: "User registered successfully", user: result.rows[0] });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Registration failed. Try again later." });
  }
});

// ✅ Login route (no DB update)
app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const query = "SELECT * FROM log WHERE name = $1 AND password = $2";
    const values = [name, password];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res
        .status(200)
        .json({ message: "Login successful", user: result.rows[0] });
    } else {
      res.status(401).json({ error: "Invalid name or password" });
    }
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Login failed. Try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
