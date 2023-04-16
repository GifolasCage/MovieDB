var express = require('express');
var router = express.Router();
var connectToDB = require('../scripts/database');
const { ObjectId } = require('mongodb');

let db;

(async () => {
  try {
    db = await connectToDB();
  } catch (error) {
    console.log('Error while connecting to the database:', error);
  }
})();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    if (!db) {
      throw new Error('Database connection is not established');
    }

    const movies = await db.collection('movies').find({}).toArray();

    res.render('index', {});
  } catch (error) {
    console.log('Error while fetching movies:', error);
    res.render('index', { title: 'Error fetching movie title' });
  }
});

router.post('/addfavourite', async function (req, res) {
  try {
    if (!db) {
      throw new Error('Database connection is not established');
    }

    // Extract data from the request body (e.g., movieTitle, movieYear)
    const { title, year, plot, rating, type, poster, imdbId } = req.body;

    // Prepare the filter and update objects
    const filter = { title: title, year: year };
    const update = {
      $setOnInsert: {
        title: title,
        year: year,
        plot: plot,
        rating: rating,
        poster: poster,
        imdbId: imdbId
      },
    };

    const options = { upsert: true };

    // Insert the data into the 'favourites' collection without duplicates
    if (type === "movie") {
      await db.collection('movies').findOneAndUpdate(filter, update, options);
    }

    if (type === "series") {
      await db.collection('series').findOneAndUpdate(filter, update, options);
    }

    // Send a success response
    res.status(200).json({ message: 'Favourite added successfully' });
  } catch (error) {
    console.log('Error while adding favourite:', error);
    res.status(500).json({ message: 'Error while adding favourite' });
  }
});

router.delete('/deletefavourite/:type/:id', async function (req, res) {
  try {
    if (!db) {
      throw new Error('Database connection is not established');
    }

    // Extract the item ID and type from the request params
    const itemId = req.params.id;
    const itemType = req.params.type;
    const collection = itemType === 'movie' ? 'movies' : 'series';

    // Delete the item from the corresponding collection
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(itemId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      throw new Error('Item not found');
    }
  } catch (error) {
    console.log('Error while deleting item:', error);
    res.status(500).json({ message: 'Error while deleting item' });
  }
});

module.exports = router;