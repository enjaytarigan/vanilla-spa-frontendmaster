const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
    console.log(req.url);
    // Extract the requested URL path
    const urlPath = req.url === "/" ? "/index.html" : req.url;

    // Build the file path
    const filePath = path.join(publicDir, urlPath);

    // Check if the file exists
    fs.exists(filePath, (exists) => {
        if (exists) {
            // Serve the file if it exists
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Serve r Error");
                } else {
                    res.writeHead(200, {
                        "Content-Type": getContentType(filePath),
                    });
                    res.end(data);
                }
            });
        } else {
            // Serve index.html for SPA routing
            fs.readFile(path.join(publicDir, "index.html"), (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        }
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Function to get the content type based on file extension
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case ".html":
            return "text/html";
        case ".js":
            return "application/javascript";
        case ".css":
            return "text/css";
        case ".json":
            return "application/json";
        case ".png":
            return "image/png";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        default:
            return "application/octet-stream";
    }
}
