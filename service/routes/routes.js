const express = require('express'),
    router = express.Router()
const seeder = require('../seeder/SeederController');

router.get('/seed/movies', seeder.seederMovie);
router.get('/seed/soundtracks', seeder.seederSoundTrack);

module.exports = router;