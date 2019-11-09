const axios = require('axios').default;
const fs = require('fs');
const assert = require('assert')
const readline = require('readline');
const express = require('express')
const CronJob = require('cron').CronJob;

const app = express();
var links = {};

function genFileURL(version, language, suffix) {
    if (version.slice(0, 1) == "3") {
        language = (language != "jp" ? "en" : "jp")
    }
    var url = "https://cubism.live2d.com/editor/bin/Live2D_Cubism_Setup_" + version + "_" + language + "." + suffix;
    return url;
}

axios.get('https://cubism.live2d.com/editor/js/download.js').then(res => {
    fs.writeFile("./download.js", res.data, (err) => {
        assert.equal(err, null);
        let input = fs.createReadStream('./download.js')
        const rl = readline.createInterface({
            input: input
        });
        rl.on('line', (line) => {
            let index = line.indexOf("LATEST_VERSION_")
            if (index == 4) {
                let sys = line.split(" ")[1].split("_")[2];
                let version = line.split("\"")[1];
                let suffix = (sys == "WIN" ? "exe" : "pkg");
                let data = {
                    zh: `中文版|` + genFileURL(version, "zh", suffix),
                    ja: `日文版|` + genFileURL(version, "ja", suffix),
                    en: `英文版|` + genFileURL(version, "en", suffix),
                };
                if (sys == "WIN") {
                    links.WIN = data;
                } else {
                    links.MAC = data;
                }
            }
        });
    })
})

app.get('/url', (req, res) => {
    res.json({
        links: links,
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8100)

new CronJob("11 45 14 * * *", () => {
    axios.get('https://cubism.live2d.com/editor/js/download.js').then(res => {
        fs.writeFile("./download.js", res.data, (err) => {
            assert.equal(err, null);
            let input = fs.createReadStream('./download.js')
            const rl = readline.createInterface({
                input: input
            });
            rl.on('line', (line) => {
                let index = line.indexOf("LATEST_VERSION_")
                if (index == 4) {
                    let sys = line.split(" ")[1].split("_")[2];
                    let version = line.split("\"")[1];
                    let suffix = (sys == "WIN" ? "exe" : "pkg");
                    let data = {
                        zh: `中文版|` + genFileURL(version, "zh", suffix),
                        ja: `日文版|` + genFileURL(version, "ja", suffix),
                        en: `英文版|` + genFileURL(version, "en", suffix),
                    };
                    if (sys == "WIN") {
                        links.WIN = data;
                    } else {
                        links.MAC = data;
                    }
                }
            });
        })
    })
}).start();