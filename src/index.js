const app = require("./config/server")

require("./app/routes/news.js")(app)

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'))
})