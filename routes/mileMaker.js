
const isValidMilemakerRequest = (body) => {
    const requiredFields = ['routeId', 'location1']
  
    for(const field of requiredFields) {
      if(body.hasOwnProperty(field) === false) {
        return false
      }
    }
  
    return true
  }

const addMilemakerRoutes = (app, jsonParser) => {

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
}

module.exports =  addMilemakerRoutes