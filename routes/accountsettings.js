var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('accountsettings', {user: req.user});
});

module.exports = router;