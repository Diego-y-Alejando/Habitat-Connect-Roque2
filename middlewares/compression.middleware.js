const compression = require('compression')

module.exports = compression({
    filter: (req, res) => {
        return res.getHeader('Content-Type') === 'text/html';
    }
})