export default {
  APIURL: (() => {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000/api'
    } else if (process.env.NODE_ENV === 'production') {
      return process.env.APIURL
    } else {
      return 'http://localhost:3000/api'
    }
  })(),
  SOCKETURL: (() => {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000'
    } else if (process.env.NODE_ENV === 'production') {
      return process.env.SOCKETURL
    } else {
      return 'http://localhost:3000'
    }
  })()
}
