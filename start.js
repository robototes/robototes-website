var server = require("./code/server");
server.http.listen(server.app.get("port"), server.app.get("ip"), function() {
    if(process.send) process.send("online");
});

process.on("message", function(message) {
    if (message === "shutdown")
        process.nextTick(function() {
            process.exit(0);
        });
}).on("uncaughtException", function(err) {
    console.error(err);
    process.exit(0);
});