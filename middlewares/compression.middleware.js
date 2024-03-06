const compression = require('compression')

module.exports = compression({
    filter: (req, res) => {
        console.log('uno',res.getHeader('Content-Type'));
        return res.getHeader('Content-Type') === 'text/html';
    }
})