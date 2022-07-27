const fs = require('fs')
const https = require('https')

function genFileURL (version, suffix) {
  const url = 'https://cubism.live2d.com/editor/bin/Live2D_Cubism_Setup_' + version + '.' + suffix
  return url
}

function generate (resource) {
  const result = {
    latestVersion: '',
    versions: []
  }

  if (fs.existsSync('latestVersion.txt')) fs.unlinkSync('latestVersion.txt')
  result.latestVersion = resource.match(/LATEST_VERSION_WIN = "(.*?)"/)[1]
  fs.writeFileSync('latestVersion.txt', result.latestVersion)
  if (fs.existsSync('latestURL.txt')) fs.unlinkSync('latestURL.txt')
  fs.appendFileSync('latestURL.txt', genFileURL(result.latestVersion, 'exe') + '\n')
  fs.appendFileSync('latestURL.txt', genFileURL(result.latestVersion, 'pkg'))

  const olderVersion = [...resource.match(/OLDER_VERSIONS_WIN = \{([\S\s]+?)\}/)[1].matchAll(/v4_[0-9]{2}_[0-9]{2} : "(.{6})"/g)]
  olderVersion.forEach(e => result.versions.push(e[1]))
  fs.writeFileSync('versions.json', JSON.stringify(result))
}

https.get('https://cubism.live2d.com/editor/js/download.js', res => {
  let resource = ''
  res.on('data', data => {
    resource += data
  })
  res.on('error', err => {
    console.log(err.message)
    process.exit(-1)
  })
  res.on('end', () => {
    // fs.writeFileSync('download.js', resource);
    generate(resource)
  })
})
