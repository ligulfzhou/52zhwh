if (process.env.NODE_ENV === 'production') {
    module.exports = require('./const.prod')
}else{
    module.exports = require('./const.dev')
}
