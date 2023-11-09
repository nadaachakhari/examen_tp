const http = require("http")
const app = require("./app")
const port = process.env.PORT || 7000 

app.set("port", port)
const server =  http.createServer(app)
server.listen(port, () => {
    console.log("Listening on " + port)
})
