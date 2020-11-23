var http = require('http')
var axios = require('axios')
var fs = require('fs')

var {parse} = require('querystring')

// Aux. Functions
// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}


// Student List HTML Page Template  -----------------------------------------
function geraPagAlunos( tarefas, d){
  let pagHTML = `
    <html>
        <head>
            <title>Lista de tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Registo de tarefa</h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">
                <label class="w3-text-teal"><b>Responsável</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">
          
                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">

                <label class="w3-text-teal"><b>Data limite</b></label>
                <input class="w3-input w3-border w3-light-grey" type="datetime-local" name="dataL">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <div class="w3-container w3-teal">
                <h2>Lista de tarefas</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Id</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                    <th>Data limite</th>
                    <th></th> 
                </tr>
  `
  var lista=``
  var listaR=``
  tarefas.forEach( a => {
    if(a.resolvido == "false"){
        lista += 
        `
        <tr>
            <td>${a.id}</td>
            <td>${a.responsavel}</td>
            <td>${a.descricao}</td>
            <td>${a.dataL}</a></td>
            <td>
            <form action="/update" method="post">
              <button name="update" value="T-${a.id}" class="w3-button w3-right">&#9989</button>
            </form>
            </td>

        </tr>
        `
    }
    else{
        listaR += `
        <tr>
            <td>${a.id}</td>
            <td>${a.responsavel}</td>
            <td>${a.descricao}</td>
            <td>${a.dataL}</a></td>
            <td>
            <form action="/update" method="post">
              <button name="update" value="F-${a.id}" class="w3-button w3-right">&#10062</button>
            </form>
            </td>
        </tr>
        `   
    }
    
    })

    pagHTML += lista

    pagHTML +=`
    </table>
    <div class="w3-container w3-teal">
        <h2>Lista de tarefas feitas
    </h2>
    </div>
    <table class="w3-table w3-bordered">
    <tr>
        <th>Id</th>
        <th>Responsável</th>
        <th>Descrição</th>
        <th>Data limite</th>
        <th></th>
    </tr>
    `
    pagHTML +=listaR

    pagHTML += `
        </table>
        <div class="w3-container w3-teal">
            <address>Gerado por A84775::PRI2020 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
  return pagHTML
}



// Server setup

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)


    // Normal request
    function load() {
        axios.get("http://localhost:3000/tarefas?_sort=id")
                    .then(response => {
                        var alunos = response.data

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagAlunos(alunos, d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter página...")
                        res.end()
                    })
    }
    

    switch(req.method){
        case "GET": 
            // GET /alunos --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                load()
            }
            // GET /w3.css ------------------------------------------------------------------------
            else if(req.url == "/w3.css"){
                fs.readFile("w3.css", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                        res.write(dados)
                        res.end()
                    }
                })
            }
            break
        case "POST":
            if(req.url == '/tarefas'){
                var id
                recuperaInfo(req, resultado => {
                    axios.get("http://localhost:3000/tarefas?_sort=id&_order=desc")
                    .then(response => {
                        let tarefa = response.data
                        id = tarefa[0]["id"]
                        console.log(id)
                        id=parseInt(id)
                        id+=1
                        
                        resultado["resolvido"]="false"
                        resultado["id"]=id
                        console.log('POST de tarefa:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tarefas', resultado)
                            load()
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter página...")
                        res.end()
                    })
                })
            }
            else if(req.url=="/update"){
                recuperaInfo(req, resultado => {
                    
                    var str = JSON.stringify(resultado).split(":")[1];
                        
                    var id =  str.substring(3,str.length-2)
                    var tipo = str[1]

                        
                    var body = {}
                    if(tipo=="T"){
                        body["resolvido"]="true"
                    }else{
                        body["resolvido"]="false"
                    }

                    axios.patch(`http://localhost:3000/tarefas/${id}`, body)
                        .then(resp => {
                            load()
                        })
                        .catch(erro => {
                            console.log("ERRO:"+erro)                           
                        })
                        
                })   
            } 
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
}
)

galunoServer.listen(7779)
console.log('Servidor à  escuta na porta 7779...')