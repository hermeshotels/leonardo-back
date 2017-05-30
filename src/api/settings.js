'use strict'
import request from 'superagent'

export default{
  getSettings (hotelId, cb) {
    let reqUrl = `https://book.ermeshotels.com:3001/api/bolsettings?filter[where][hotelId]=${hotelId}&filter[limit]=1`
    request.get(reqUrl)
      .end((error, settings) => {
        if (error) return cb(error, null)
        return cb(null, settings.body[0])
      })
  },
  saveGeneral (settings, cb) {
    let reqUrl = `https://book.ermeshotels.com:3001/api/bolsettings/saveGeneral?hotelId=${settings.hotelId}`
    request.post(reqUrl)
      .send(settings)
      .end((error, generalSettings) => {
        if (error) return cb(error, null)
        return cb(null, generalSettings)
      })
  }
}
