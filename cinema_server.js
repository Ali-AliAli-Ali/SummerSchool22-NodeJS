const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);

    if (req.url === "/ping") {
        res.setHeader("Content-type", "text/html")
        res.write("<h1>Going to make a joke: \n\n</h1>")
        return res.end("Yours is pretty low");
    }

    res.statusCode = 404;
    return res.end("Not found");
});

server.listen(PORT, () => { console.log(`server is on port ${PORT}`); })
