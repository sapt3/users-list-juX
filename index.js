var request = require("request")
var http = require('http');

var total;
var url = "https://the-ju-app.firebaseio.com/users.json"
var port = process.env.PORT || 8080;

var key = [];
var count = [];
request({
    url: url,
    json: true
}, function (error, response, jsonArr) {

    if (!error && response.statusCode === 200) {
      for (var i in jsonArr) {
        var json = jsonArr[i];
        key.push(json.department);
      }
      total = key.length;
      var result = foo(key);
      var dept = result[0];
      var count = result[1];
      var data = "";
      for (var i = 1; i < dept.length - 1; i++) {
        console.log(`${dept[i]} : ${count[i]}`);
        data += `<li>${dept[i]} : ${count[i]}</li>`
      }
      http.createServer(function(req, res) {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        console.log(data);
        res.write('<!doctype html>\n<html lang="en">\n' +
          '\n<meta charset="utf-8">\n<title>Users List according to Department</title>\n' +
          '<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
          '\n\n<h1>Users List according to Department for juX</h1>\n' +
          '<p> The total users are ' + total + 
           '<ul>' + data + '</ul>' +
          '\n\n');
        res.end();
      }).listen(port);
      console.log(`Server running`);

      }
    })


function foo(arr) {
    var a = [], b = [], prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }

    return [a, b];
}
