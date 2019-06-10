const SoundTrack = require('../../schema/soundtrack.js');

module.exports = {
    soundtracks: async () => {
        try {
            const soundtrack = await SoundTrack.find({})
            return soundtrack
        } catch (err) {
            throw new Error(err)
        }
    }
}