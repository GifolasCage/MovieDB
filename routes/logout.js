var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("An error occurred during logout.");
        } else {
            req.user = null;
            res.clearCookie('connect.sid');
            res.redirect('/');
        }
    });
});

module.exports = router;