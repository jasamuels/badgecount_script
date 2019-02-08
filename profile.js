const https = require('https')
const http = require('http')

function printError(error) { console.error(error.message) }

function printMessage (username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript;`
    console.log(message)
}

function get (username) {

try {

const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

if (response.statusCode === 200) {
let body = ''

response.on('data', data => { body += data })
response.on('end', () => {

    const profile = JSON.parse(body)
    printMessage(username, profile.badges.length, profile.points.JavaScript)

})

} else {
    const statusCodeError = new Error(`There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`)
    printError(statusCodeError)
}})

} catch (err) {

    console.error(`Problem with the script: ${err.message}`)

}

}

module.exports.get = get
