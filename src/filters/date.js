import moment from 'moment'
var vueDate = {}
vueDate.install = (Vue) => {
  Vue.filter('date', (value, format) => {
    return moment(value).format(format)
  })
}

export default vueDate
