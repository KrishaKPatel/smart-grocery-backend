const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000; // Backend will run on this port

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection to MongoDB Atlas (Ensure your database name is Receipe)
const mongoURI = 'mongodb+srv://KrishaPatel:Kishu1104@cluster0.zgong.mongodb.net/Receipe?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected to Receipe database"))
  .catch(err => console.log(err));

// Recipe Schema and Model (Ensure the collection name is 'recipes')
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  instructions: String,
  prepTime: String,
  cookingTime: String,
  serves: Number,
  category: String,
  tags: [String]
});

// Make sure the collection name is 'recipes' (MongoDB will use the plural form of the model name by default)
const Recipe = mongoose.model('Recipe', recipeSchema, 'recipes');

// Routes
app.get('/api/recipes', async (req, res) => {
  try {
    // Fetch all recipes from the 'recipes' collection in the 'Receipe' database
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).send("Error fetching recipes");
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
