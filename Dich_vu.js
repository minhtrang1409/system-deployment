var http = require("http");
var fs = require("fs");
var port = normalizePort(process.env.PORT || 8080);

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
    let kq = `Wellcome Server Nodejs - Method:${req.method} - url:${req.url}`
    if (req.method == "GET") {
        if (req.url == "/Danh_sach_Tivi") {
            kq = fs.readFileSync('./Du_lieu/Danh_sach_Tivi.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else if (req.url.match("\.png$")) {
            var imagePath = `images/${req.url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `images/KHAC.png`
            }
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            fileStream.pipe(res);

        } else if (req.url == "/Danh_sach_Nguoi_dung") {
            kq = fs.readFileSync('./Du_lieu/Danh_sach_Nguoi_dung.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else {
            res.end(kq);
        }
    }else if (req.method == "POST") {
        var Noi_dung_Nhan = '';
        req.on('data', function (data) {
            Noi_dung_Nhan += data;
        });
        if(req.url == "/Dang_nhap"){
            req.on('end', function(){
                let Doi_tuong =JSON.parse(Noi_dung_Nhan);                    
                let Chuoi_Nguoi_dung = fs.readFileSync('./Du_lieu/Nguoi_dung.json', 'utf8');
                let Nguoi_dung= JSON.parse(Chuoi_Nguoi_dung);
                let Ket_qua={"Noi_dung":false}; 
                if(Doi_tuong.Ten_Dang_nhap==Nguoi_dung.Ten_Dang_nhap && Doi_tuong.Mat_khau==Nguoi_dung.Ten_Dang_nhap){
                    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                    Ket_qua.Noi_dung=Nguoi_dung;
                    res.end(JSON.stringify(Ket_qua));
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                    res.end(JSON.stringify(Ket_qua));
                }
            }); 
        }else if (req.url == "/Cap_nhat_Tivi") {
            req.on('end', function () {
                let Doi_tuong = JSON.parse(Noi_dung_Nhan);
                let Ket_qua = { "Noi_dung": false };
                let Chuoi_Danh_sach_Tivi = fs.readFileSync("./Du_lieu/Danh_sach_Tivi.json", "utf8");
                let Danh_sach_Tivi = JSON.parse(Chuoi_Danh_sach_Tivi);
                let Tivi = Danh_sach_Tivi.find(item => item.Ma_so == Doi_tuong.Ma_so);
                Tivi.Don_gia = Doi_tuong.Don_gia;
                fs.writeFileSync("./Du_lieu/Danh_sach_Tivi.json", JSON.stringify(Danh_sach_Tivi), "utf8");
                Ket_qua.Noi_dung = true;
                res.end(JSON.stringify(Ket_qua));
            });
        }else if (req.url == "/Cap_nhat_Nguoi_dung") {
            req.on('end', function () {
                let Doi_tuong = JSON.parse(Noi_dung_Nhan);
                let Ket_qua = { "Noi_dung": false };
                let Chuoi_Danh_sach_Nguoi_dung = fs.readFileSync("./Du_lieu/Danh_sach_Nguoi_dung.json", "utf8");
                let Danh_sach_Nguoi_dung = JSON.parse(Chuoi_Danh_sach_Nguoi_dung);
                let Nguoi_dung = Danh_sach_Nguoi_dung.find(item => item.Ma_so == Doi_tuong.Ma_so);
                Nguoi_dung.Ho_ten = Doi_tuong.Ho_ten;
                fs.writeFileSync("./Du_lieu/Danh_sach_Nguoi_dung.json", JSON.stringify(Danh_sach_Nguoi_dung), "utf8");
                Ket_qua.Noi_dung = true;
                res.end(JSON.stringify(Ket_qua));
            });
        }

    }
})

Dich_vu.listen(port,
    console.log(`Service running port ${port} `)
);

Dich_vu.on('error', onError);

var http = require("http");
var fs = require("fs");
var port = normalizePort(process.env.PORT || 8080);

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
    let kq = `Wellcome Server Nodejs - Method:${req.method} - url:${req.url}`
    if (req.method == "GET") {
        if (req.url == "/Danh_sach_Tivi") {
            kq = fs.readFileSync('./Du_lieu/Danh_sach_Tivi.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else if (req.url.match("\.png$")) {
            var imagePath = `images/${req.url}`;
            if (!fs.existsSync(imagePath)) {
                imagePath = `images/KHAC.png`
            }
            var fileStream = fs.createReadStream(imagePath);
            res.writeHead(200, { "Content-Type": "image/png" });
            fileStream.pipe(res);

        } else if (req.url == "/Danh_sach_Nguoi_dung") {
            kq = fs.readFileSync('./Du_lieu/Danh_sach_Nguoi_dung.json', 'utf-8');
            res.writeHead(200, { "Content-Type": "text/json; charset=utf-8" })
            res.end(kq)
        } else {
            res.end(kq);
        }
    }else if (req.method == "POST") {
        var Noi_dung_Nhan = '';
        req.on('data', function (data) {
            Noi_dung_Nhan += data;
        });
        if(req.url == "/Dang_nhap"){
            req.on('end', function(){
                let Doi_tuong =JSON.parse(Noi_dung_Nhan);                    
                let Chuoi_Nguoi_dung = fs.readFileSync('./Du_lieu/Nguoi_dung.json', 'utf8');
                let Nguoi_dung= JSON.parse(Chuoi_Nguoi_dung);
                let Ket_qua={"Noi_dung":false}; 
                if(Doi_tuong.Ten_Dang_nhap==Nguoi_dung.Ten_Dang_nhap && Doi_tuong.Mat_khau==Nguoi_dung.Ten_Dang_nhap){
                    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                    Ket_qua.Noi_dung=Nguoi_dung;
                    res.end(JSON.stringify(Ket_qua));
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/json; charset=utf-8"});
                    res.end(JSON.stringify(Ket_qua));
                }
            }); 
        }else if (req.url == "/Cap_nhat_Tivi") {
            req.on('end', function () {
                let Doi_tuong = JSON.parse(Noi_dung_Nhan);
                let Ket_qua = { "Noi_dung": false };
                let Chuoi_Danh_sach_Tivi = fs.readFileSync("./Du_lieu/Danh_sach_Tivi.json", "utf8");
                let Danh_sach_Tivi = JSON.parse(Chuoi_Danh_sach_Tivi);
                let Tivi = Danh_sach_Tivi.find(item => item.Ma_so == Doi_tuong.Ma_so);
                Tivi.Don_gia = Doi_tuong.Don_gia;
                fs.writeFileSync("./Du_lieu/Danh_sach_Tivi.json", JSON.stringify(Danh_sach_Tivi), "utf8");
                Ket_qua.Noi_dung = true;
                res.end(JSON.stringify(Ket_qua));
            });
        }else if (req.url == "/Cap_nhat_Nguoi_dung") {
            req.on('end', function () {
                let Doi_tuong = JSON.parse(Noi_dung_Nhan);
                let Ket_qua = { "Noi_dung": false };
                let Chuoi_Danh_sach_Nguoi_dung = fs.readFileSync("./Du_lieu/Danh_sach_Nguoi_dung.json", "utf8");
                let Danh_sach_Nguoi_dung = JSON.parse(Chuoi_Danh_sach_Nguoi_dung);
                let Nguoi_dung = Danh_sach_Nguoi_dung.find(item => item.Ma_so == Doi_tuong.Ma_so);
                Nguoi_dung.Ho_ten = Doi_tuong.Ho_ten;
                fs.writeFileSync("./Du_lieu/Danh_sach_Nguoi_dung.json", JSON.stringify(Danh_sach_Nguoi_dung), "utf8");
                Ket_qua.Noi_dung = true;
                res.end(JSON.stringify(Ket_qua));
            });
        }

    }
})

Dich_vu.listen(port,
    console.log(`Service running port ${port} `)
);

Dich_vu.on('error', onError);
Dich_vu.on('listening', onListening);
