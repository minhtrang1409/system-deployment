var http = require("http");
var fs = require("fs");
var port = normalizePort(process.env.PORT || 8080);
var db = require("./Data/verifyEmail");

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof Port === 'string'
        ? 'Pipe ' + Port
        : 'Port ' + Port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = Dich_vu.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var Dich_vu = http.createServer((req, res) => {
    let kq = `Welcome Server Nodejs - Method:${req.method} - url:${req.url}`
    if (req.method == "GET") {
        if (req.url == "/symptoms") {
            kq = fs.readFileSync('./Data/symptoms.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else if (req.url == "/illnesses") {
            kq = fs.readFileSync('./Data/illnesses.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else if (req.url == "/version") {
            kq = fs.readFileSync('./Data/version.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else {
            res.end(kq);
        }
    } else if (req.method == "POST") {
        var Noi_dung_Nhan = '';
        req.on('data', function (data) {
            Noi_dung_Nhan += data;
        });
        if(req.url == "/VerifyEmail"){
            req.on('end', function(){
                let Doi_tuong = JSON.parse(Noi_dung_Nhan);
                db.VerifyEmail(Doi_tuong.email, function(result) {
                    let Ket_qua = {"verified": 'fail'}; 
                    if (result == 1) {
                        res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                        Ket_qua.Verified = 'success';
                        res.end(JSON.stringify(Ket_qua));
                    }
                    else {
                        res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                        res.end(JSON.stringify(Ket_qua));
                    }
                })
            }); 
        }
    }
})

Dich_vu.listen(port,
    console.log(`Service running port ${port} `)
);

Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);