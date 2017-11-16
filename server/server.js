/**
 * Created by zhaoyongsheng on 2017/11/16.
 */
var http = require("http");
var path = require("path");
var fs = require("fs");

var mimeTypes = {
  '.js' : 'text/javascript',
  '.html': 'text/html',
  '.css' : 'text/css'
};

http.createServer(function (request, response) {
  var lookup = path.basename(decodeURI(request.url)) || 'index.html',
    dirname = path.dirname(decodeURI(request.url)) || '';
  if (dirname && dirname.length > 1) {
    var f = dirname + '/' + lookup;
  } else {
    var f = dirname + lookup;
  }
  console.log(f);
  //文件是否存在
  fs.exists('.' + f, function (exists) {
    if (exists) {
      fs.readFile('.' + f, function (err, data) {
        if (err) { response.writeHead(500);
          response.end('Server Error!');
          return false;
        }
        //path.extname('about.html') --> .html
        var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
        response.writeHead(200, headers);
        response.end(data);
      });
      return false;
    } else {
      fs.readFile('error.html', function (err, data) {
        if (err) { response.writeHead(500);
          response.end('Server Error!');
          return false;
        }
        var headers = {'Content-type': 'text/html'};
        response.writeHead(200, headers);
        response.end(data);
      });
      return false;
    }
  });
}).listen(8889);
