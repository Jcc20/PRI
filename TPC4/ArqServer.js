var http = require('http')
var fs = require('fs')

servidor = http.createServer(function(req,res){
    if (req.url.match(/^\/$/)) {
        res.writeHead(301, {location: 'http://localhost:7777/arqs/*'});
        res.end();
    }
    else if(req.url.match("\/[Aa][Rr][Qq][Ss]\/([1-9]|[1-9][0-9]|1[0-1][0-9]|12[0-2]|\\*)$")){
        var num = req.url.split("/")[2]
        if(num=='*'){
            fs.readFile('.\/arqweb\/index.html', function(err,data){
                if(err){
                    res.writeHead(204,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p>Ficheiro inexistente.</p>")
                    res.end()
                }
                else{
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write(data)
                    res.end()
                }
            })
        }else{
            fs.readFile('.\/arqweb\/'+num+'.html', function(err,data){
                if(err){
                    res.writeHead(204,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write("<p>Ficheiro inexistente.</p>")
                    res.end()
                }
                else{
                    res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'})
                    res.write(data)
                    res.end()
                }
            })
        }
            
    }else{
        console.log('ERRO: ficheiro não esperado')
        res.writeHead(404,{'Content-Type': 'text/html; charset=utf-8'})
        res.write("<p>URL inválido.</p>")
        res.end()
    }
        
})

servidor.listen(7777)
console.log('Servidor à escuta na porta 7777...')