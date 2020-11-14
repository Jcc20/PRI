var http = require('http')
const axios = require('axios');

var servidor = http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)

    if(req.method == 'GET'){

        if(req.url == '/'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>');
            res.write('<li><a href=\"http://localhost:3001/alunos\">Lista de alunos</a></li>');
            res.write('<li><a href=\"http://localhost:3001/cursos\">Lista de cursos</a></li>');
            res.write('<li><a href=\"http://localhost:3001/instrumentos\">Lista de instrumentos</a></li>');
            res.write('</ul>');
            res.end()
        }
        else if(req.url == '/alunos'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos?_sort=nome,id&_order=asc')
                .then(resp => {
                    alunos = resp.data;
                    res.write('<ul>');
                    alunos.forEach(a => {
                        res.write(`<li>${a.id}, <a href=\"http://localhost:3001/alunos/${a.id}\">${a.nome}</a></li>`)
                    });
                    res.write('</ul>');
                    res.write('<address>[<a href="/">Voltar</a>]</address>')
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p>Não consegui obter a lista de alunos...</p>')
                    res.end()
                }); 
        }
        else if(req.url == '/cursos'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/cursos?_sort=id,designacao&_order=asc')
                .then(resp => {
                    alunos = resp.data;
                    res.write('<ul>');
                    alunos.forEach(a => {
                        res.write(`<li>${a.id}, <a href=\"http://localhost:3001/cursos/${a.id}\">${a.designacao}</a></li>`)
                    });
                    res.write('</ul>');
                    res.write('<address>[<a href="/">Voltar</a>]</address>')
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p>Não consegui obter a lista de cursos...</p>')
                    res.end()
                }); 
        }else if(req.url == '/instrumentos'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/instrumentos?_sort=id&_order=asc')
                .then(resp => {
                    alunos = resp.data;
                    res.write('<ul>');
                    alunos.forEach(a => {
                        res.write(`<li>${a.id}, <a href=\"http://localhost:3001/instrumentos/${a.id}\">${a['#text']}</a></li>`)
                    });
                    res.write('</ul>');
                    res.write('<address>[<a href="/">Voltar</a>]</address>')
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p>Não consegui obter a lista de instrumentos...</p>')
                    res.end()
                }); 
        }else if(req.url.match(/^\/alunos\/A[^\/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var id = split[2];
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos/'+id)
                .then(resp => {
                    a = resp.data;
                    res.write('<p><b>Aluno</b></p>')
                    res.write(`<p>Id: ${a.id}</p>`)
                    res.write(`<p>Nome: ${a.nome}</p>`)
                    res.write(`<p>Data de nascimento: ${a.dataNasc}</p>`)
                    res.write(`<p>Curso: ${a.curso}</p>`)
                    res.write(`<p>Ano do curso: ${a.anoCurso}</p>`)
                    res.write(`<p>Instrumento: ${a.instrumento}</p>`)

                    res.write('<address>[<a href="/alunos">Voltar</a>]</address>')
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p>Aluno não existe...</p>')
                    res.end()
                }); 

        }else if(req.url.match(/^\/cursos\/CB[^\/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var id = split[2];
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/cursos/'+id)
                .then(resp => {
                    a = resp.data;
                    res.write('<p><b>Curso</b></p>')
                    res.write(`<p>Id: ${a.id}</p>`)
                    res.write(`<p>Designação: ${a.designacao}</p>`)
                    res.write(`<p>Duração: ${a.duracao}</p>`)
                    res.write(`<p>Instrumento:{<p>&nbsp&nbsp id: ${a.instrumento.id}</p><p>&nbsp&nbsp nome: ${a.instrumento['#text']}</p>}</p>`)
              
              

                    res.write('<address>[<a href="/cursos">Voltar</a>]</address>')
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p>Curso não existe...</p>')
                    res.end()
                }); 

        }else if(req.url.match(/^\/instrumentos\/I[^\/ \?\n]*$/)){
            var split = req.url.split("/",3)
            var id = split[2];
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/instrumentos/'+id)
                .then(resp => {
                    a = resp.data;
                    res.write('<p><b>Instrumento</b></p>')
                    res.write(`<p>Id: ${a.id}</p>`)
                    res.write(`<p>Nome: ${a['#text']}</p>`)
      

                    res.write('<address>[<a href="/instrumentos">Voltar</a>]</address>')
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error);
                    res.write('<p>Instrumento não existe...</p>')
                    res.end()
                }); 
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<p>Pedido não suportado</p>')
            res.end()
        }    
    }
    else{
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.write('<p>Pedido não suportado: ' + req.method + '</p>')
        res.end()
    }
})

servidor.listen(3001)
console.log('Servidor à escuta na porta 3001...')