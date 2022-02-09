const express = require('express')
const app = express()
const port = 4242

app.get('/PCM', (req, res) => {
  res.send(`[
    {
      "__type": "CalculateMilesReport:http://pcmiler.alk.com/APIs/v1.0",
      "TMiles": 2315.2,
      "RouteID": "c9e537b4-ade2-4c91-95de-9db8ff545539",
      "Units": "Kilometers"
    }
  ]`)
})

app.get('/MM', (req, res) => {
  res.send(`{
    "MM_MileageResult": {
      "Response": {
        "Status": "SUCCESS",
        "Units": "Miles",
        "MileageRecord": [
          {
            "f1_Location": "Total",
            "f2_Miles": "1397",
            "f3_TollCostUSA": "0.00",
            "f4_TollCostCN": "0.00",
            "f5_Time": "23:19",
            "f6_County": ""
          },
          {
            "f1_Location": "41.91731 82.99879",
            "f2_Miles": "",
            "f3_TollCostUSA": "",
            "f4_TollCostCN": "",
            "f5_Time": "",
            "f6_County": ""
          },
          {
            "f1_Location": "35.0511 89.9258",
            "f2_Miles": "734",
            "f3_TollCostUSA": "0.00",
            "f4_TollCostCN": "0.00",
            "f5_Time": "12:33",
            "f6_County": ""
          },
          {
            "f1_Location": "30.26500 97.71710",
            "f2_Miles": "663",
            "f3_TollCostUSA": "0.00",
            "f4_TollCostCN": "0.00",
            "f5_Time": "10:46",
            "f6_County": ""
          }
        ]
      }
    }
  }`)
})

app.get('/MMFail', (req, res) => {
  res.send(`{
    "MM_MileageResult": {
      "Response": {
        "Status": "FAILURE"
      }
    }
  }`)
})

app.get('/PCMFail', (req, res) => {
  res.send(`[
    {
      "Type": 1,
      "Code": 88,
      "LegacyErrorCode": 400,
      "Description": Stop at index 0: Input latlong coordinates are not near any known roads."
    }
  ]`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
