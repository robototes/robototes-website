var server = require("./code/server");
server.http.listen(server.app.get("port"), server.app.get("ip"), function() {
    if(process.send) process.send("online");
});

process.on("message", function(message) {
    if (message === "shutdown")
        process.nextTick(function() {
            process.emit("shutdown");
            process.exit(0);
        });
});