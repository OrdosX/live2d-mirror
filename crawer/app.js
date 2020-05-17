const axios = require('axios').default;
const fs = require('fs');
const assert = require('assert');
const readline = require('readline');
const express = require('express');
const { DownloaderHelper } = require('node-downloader-helper');
const CronJob = require('cron').CronJob;

const app = express();
var links = {};
var version = "";

const OFFICIAL = "https://cubism.live2d.com/editor/bin/";
const BACKUP = "https://getl2d.ordosx.tech/files/"
const downloadDir = __dirname + '/files';

function genFileURL(version, language, suffix, root) {
    if (version.slice(0, 1) == "3") {
        language = (language != "jp" ? "en" : "jp")
    }
    let url = root + "Live2D_Cubism_Setup_" + version + "_" + language + "." + suffix;
    return url;
}

function refresh() {
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
                    let latestVersion = line.split("\"")[1];
                    if (version != latestVersion) {
                        let suffix = (sys == "WIN" ? "exe" : "pkg");
                        let data = {
                            zh: `中文版|` + genFileURL(latestVersion, "zh", suffix, OFFICIAL) + `|` + genFileURL(latestVersion, "zh", suffix, BACKUP),
                            jp: `日文版|` + genFileURL(latestVersion, "jp", suffix, OFFICIAL) + `|` + genFileURL(latestVersion, "jp", suffix, BACKUP),
                            en: `英文版|` + genFileURL(latestVersion, "en", suffix, OFFICIAL) + `|` + genFileURL(latestVersion, "en", suffix, BACKUP),
                        };
                        if (sys == "WIN") {
                            links.WIN = data;
                        } else {
                            links.MAC = data;
                            version = latestVersion;
                        }
                        let dlzh = new DownloaderHelper(genFileURL(latestVersion, "zh", suffix, OFFICIAL), downloadDir);
                        dlzh.start().catch(() => { });
                        let dljp = new DownloaderHelper(genFileURL(latestVersion, "jp", suffix, OFFICIAL), downloadDir);
                        dljp.start().catch(() => { });
                        let dlen = new DownloaderHelper(genFileURL(latestVersion, "en", suffix, OFFICIAL), downloadDir);
                        dlen.start().catch(() => { });
                    }
                }
            });
        })
    })
}

//Begin setup

if(!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}
refresh();

app.get('/links', (req, res) => {
    res.json(links);
});

app.listen(8100)

new CronJob("11 45 14 * * *", () => {
    refresh();
}).start();