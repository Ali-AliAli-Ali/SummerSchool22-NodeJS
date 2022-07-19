const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/ping") 
        return res.end("Yours is pretty low");

    res.statusCode = 404;
    return res.end("Not found");
});

const PORT = 3000;
server.listen(PORT, () => { console.log(`server is on port ${PORT}`); })
