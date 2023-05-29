# Movie and Series database

## Description

This is a project for teaching myself express and mongodb. You can search for movies and series using the OMDBapi. You can create a user to add movies and series to your favourites. The movies are then added to a new mongodb collection for your username. The application uses mongodb for storing the session.

### Built With

- [![MongoDB][MongoDB.com]][MongoDB-url]
- [![Bootstrap][Bootstrap.com]][Bootstrap-url]
- [![ExpressJs][Expressjs.com]][Expressjs-url]
- [![EJS][Ejs.com]][Ejs-url]

### Installation and running

1. Clone the repository
2. Install NPM packages
   ```sh
   npm install
   ```
3. ```
   have mongodb installed and running
   ```
4. Run the app
   ```js
   npm start
   ```
5. Open the page
   ```
   http://localhost:3000/
   ```

### Environment variables

```sh
API_KEY=YOUR_OMDB_API_KEY
DB_URL=YOUR_MONGODB_URL
DB_NAME=YOUR_MONGODB_DATABASENAME
PORT=3000
DEV=TRUE
SECRET_KEY=YOUR_VERY_SECRET_SESSION_KEY
```

### Acknowledgements

- dotenv
- connect-mongodb-session
- bcrypt
- axios
- body-parser
- express-session
- express-session-JSON
- passport
- passport-local
- morgan
- https://www.omdbapi.com/

[MongoDB.com]: https://img.shields.io/badge/mongodb-0d5e4f?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://mongodb.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Expressjs.com]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Expressjs-url]: https://expressjs.com/
[Ejs.com]: https://img.shields.io/badge/EJS-499D7C?style=for-the-badge&logo=ejs&logoColor=white
[Ejs-url]: https://ejs.co/
