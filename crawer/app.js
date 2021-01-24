const axios = require('axios').default;
const fs = require('fs');
const readline = require('readline');

const OFFICIAL = "https://cubism.live2d.com/editor/bin/";

function genFileURL(version, language, suffix, root) {
    if (version.slice(0, 1) == "3") {
        language = (language != "jp" ? "en" : "jp")
    }
    let url = root + "Live2D_Cubism_Setup_" + version + "_" + language + "." + suffix;
    return url;
}

axios.get('https://cubism.live2d.com/editor/js/download.js').then(res => {
    fs.writeFile("./download.js", res.data, (err) => {
        let input = fs.createReadStream('./download.js')
        const rl = readline.createInterface({
            input: input
        });
        rl.on('line', (line) => {
            let index = line.indexOf("LATEST_VERSION_")
            if (index == 4) {
                let sys = line.split(" ")[1].split("_")[2];
                let latestVersion = line.split("\"")[1];
                let suffix = (sys == "WIN" ? "exe" : "pkg");
                console.log(genFileURL(latestVersion, "zh", suffix, OFFICIAL));
                console.log(genFileURL(latestVersion, "jp", suffix, OFFICIAL));
                console.log(genFileURL(latestVersion, "en", suffix, OFFICIAL));
                console.log(`<b-button @click="download('${latestVersion}', 'zh')" variant="success">${latestVersion}</b-button>`);
                console.log(`<b-button @click="download('${latestVersion}', 'jp')" variant="success">${latestVersion}</b-button>`);
                console.log(`<b-button @click="download('${latestVersion}', 'en')" variant="success">${latestVersion}</b-button>`);
            }
        });
    })
})