const { ModuleResolutionKind } = require("typescript")

const addPCMilerRoutes = (app, jsonParser) => {
    const isValidPCMilerRequest = (body) => {
        if(body.hasOwnProperty('ReportRoutes') === false) return false
        if(body.ReportRoutes.length === 0) return false
        if(body.ReportRoutes[0].hasOwnProperty('Stops') === false) return false
        if(body.ReportRoutes[0].Stops.length === 0) return false
      
        return true
      }
      
      const sendPCMilerMessage = async (routeID, res) => {
        res.send([
          {
            "__type": "CalculateMilesReport:http://pcmiler.alk.com/APIs/v1.0",
            "TMiles": 2345.6,
            "RouteID": "" + routeID + "",
            "Units": "Kilometers"
          }])
      }

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
      
      app.get('/PCM', async (req, res) => {
        if(!req.query.routeId) {
          console.log('req.query', req.query)
          sendPCMilerFailure(res)
          return
        }
        await sendPCMilerMessage(req.query.routeId, res)
      })
      
      app.post('/PCM', jsonParser, async (req, res) => {
        if(isValidPCMilerRequest(req.body) === false) {
          sendPCMilerFailure(res)
          return
        }
      
        await sendPCMilerMessage(req.body.ReportRoutes[0].RouteId, res)
      })
}

module.exports = addPCMilerRoutes