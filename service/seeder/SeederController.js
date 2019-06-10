const Movie = require('../schema/movie');
const SoundTrack = require('../schema/soundtrack');
const request = require('request');
const fs = require('fs');
const {
    promisify
} = require("util");
const path = require('path');

const writefiledir = promisify(fs.writeFile);

const dirName = path.dirname(require.main.filename) + "/public/images/"

module.exports = {
    seederSoundTrack: (req, res) => {
        const soundtrackDummy = ['TH', 'EN', 'CN']
        soundtrackDummy.forEach(value => {
            const soundtrack = new SoundTrack({
                title: value
            })
            soundtrack.save()
        })
        res.send('Seeder Successful.')
    },
    seederMovie: async (req, res) => {
        const soundtrack = await SoundTrack.find({});
        request(`https://api.themoviedb.org/3/discover/movie?api_key=e13394375a09fbd46812b9a5d6e44045&query=a&primary_release_date.gte=2019-05-01&primary_release_date.lte=2019-06-10`, (err, response, body) => {
            if (err) {
                return res.send('Something has wrong.')
            }
            const data = JSON.parse(response.body)
            const price = [120, 240, 360, 480, 600]
            data.results.forEach((value) => {
                const poster_path = (value.poster_path !== null ? value.poster_path.split('/')[1] : "noimg.png")
                if (poster_path !== "noimg.png") {
                    const path = `${dirName}${poster_path}`
                    if (!fs.existsSync(path)) {
                        request.get({
                            url: `https://image.tmdb.org/t/p/w185/${poster_path}`,
                            encoding: null
                        }, async (err, res, body) => {
                            if (err)
                                throw new Error(err)
                            writefiledir(path, body)
                        })
                    }
                }
                const movie = new Movie({
                    name: value.original_title,
                    logo: poster_path,
                    description: value.overview,
                    price: price[Math.floor(Math.random() * 5)],
                    soundtrack: soundtrack[Math.floor(Math.random() * 3)]._id
                })
                movie.save()
            })
            res.send('Seeder Successful.')
        })
    }
}