var express = require('express');
var router = express.Router();
var Alun = require('../models/aluno')

const Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
}); 

router.get('/alunos', (req, res) => {
    Aluno.listar()
      .then(dados => res.render('alunos', {lista: dados}))
      .catch(e => res.render('error', {error: e}))
})

router.get('/alunos/registar', (req, res, next) => {
  res.render('registar');

})

router.get('/alunos/editar/:id', (req, res, next) => {
  Aluno.consultar(req.params.id)
    .then(dado => res.render('editar', {aln: dado}))
    .catch(e => res.render('error', {error: e}))

})

router.get('/alunos/:id', (req, res) => {
  
  Aluno.consultar(req.params.id)
    .then(dado => res.render('aluno', {aln: dado}))
    .catch(e => res.render('error', {error: e}))
})    



router.post('/alunos', (req, res) => {
  let a = new Alun();
  a.Número = req.body["numero"]
  a.Nome = req.body["nome"]
  a.Git = req.body["git"]
  let tpc = []
  let i = 1
  while(i<10){
    if(req.body[`tp${i}`]){
      tpc.push(1)
    }else{
      tpc.push(0)
    }
    i++
  }
  a.tpc = tpc
  a.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      res.redirect('/alunos')
    }
  })
})   

router.put('/alunos/:id', (req, res) => {
  let tpc = []
  let i = 1
  while(i<10){
    if(req.body[`tpc${i}`]){
      tpc.push(1)
    }else{
      tpc.push(0)
    }
    i++
  }
  req.body["tpc"] = tpc
  Aluno.update(req.body)
   .then(res.redirect('/alunos'))
   .catch(err => res.render('error', {error: err}))
})    

router.delete('/alunos/:id', function(req, res, next) {
  Aluno.delete(req.params.id)
             .then(res.redirect('/alunos'))
             .catch(err => res.render('error', {error: err}))
 })



module.exports = router;
