const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 4242
var jsonParser = bodyParser.json()

const sendPCMilerFailure = (res) => {
  res.send(`[
    {
      "Type": 1,
      "Code": 88,
      "LegacyErrorCode": 400,
      "Description": Stop at index 0: Input latlong coordinates are not near any known roads."
    }
  ]`)
}

const isValidPCMilerRequest = (body) => {
  if(body.hasOwnProperty('ReportRoutes') === false) return false
  if(body.ReportRoutes.length === 0) return false
  if(body.ReportRoutes[0].hasOwnProperty('Stops') === false) return false
  if(body.ReportRoutes[0].Stops.length === 0) return false

  return true
}

const isValidMilemakerRequest = (body) => {
  const requiredFields = ['routeId', 'location1']

  for(const field of requiredFields) {
    if(body.hasOwnProperty(field) === false) {
      return false
    }
  }

  return true
}

const sendPCMilerMessage = async (routeID) => {
  res.send([
    {
      "__type": "CalculateMilesReport:http://pcmiler.alk.com/APIs/v1.0",
      "TMiles": 2345.6,
      "RouteID": "" + routeID + "",
      "Units": "Kilometers"
    }])
}

app.get('/PCM', async (req, res) => {
  if(!req.query.routeId) {
    console.log('req.query', req.query)
    sendPCMilerFailure(res)
    return
  }
  await sendPCMilerMessage(req.query.routeId)
})

app.post('/PCM', jsonParser, async (req, res) => {
  if(isValidPCMilerRequest(req.body) === false) {
    sendPCMilerFailure(res)
    return
  }

  await sendPCMilerMessage(req.body.ReportRoutes[0].RouteId)
})



app.post('/MM', jsonParser, (req, res) => {
  if(isValidMilemakerRequest(req.body) === false) {
    res.send(`{
      "MM_MileageResult": {
        "Response": {
          "Status": "FAILURE"
        }
      }
    }`)
    return
  }

  const mileageRecord = []

  mileageRecord.push({
    "f1_Location": "Total",
    "f2_Miles": "12345",
    "f3_TollCostUSA": "19.84",
    "f4_TollCostCN": "0.00",
    "f5_Time": "25:57",
    "f6_County": ""
  })

  for(let i = 2; i <= 25; i++) {
    if(req.body.hasOwnProperty(`location${i}`)) {
      const miles = 20 * i
      const latLong = req.body[`location${i}`]

      const newRecord =

      mileageRecord.push({
        "f1_Location": "" + latLong + "",
        "f2_Miles": "" + miles + "",
        "f3_TollCostUSA": "9.84",
        "f4_TollCostCN": "0.00",
        "f5_Time": "20:57",
        "f6_County": ""
      })
    }
  }

  res.send(`{
    "MM_MileageResult": {
      "Response": {
        "Status": "SUCCESS",
        "Units": "Miles",
        "MileageRecord": ${JSON.stringify(mileageRecord)}
      }
    }
  }`)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
