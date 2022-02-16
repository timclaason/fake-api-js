const app = require('./getApp')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const addMilemakerRoutes = require('./routes/mileMaker')
const addPCMilerRoutes = require('./routes/pcMiler')
const { jsonp } = require('express/lib/response')
const port = 4242
addMilemakerRoutes(app, jsonParser)
addPCMilerRoutes(app, jsonParser)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
