var Aluno = require('../models/aluno')

// Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Aluno
        .findOne({Número: id})
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}

module.exports.delete = id => {
    return Aluno
        .deleteOne({Número: id})
        .exec()    
}

module.exports.update = aluno => {
    id = aluno["Número"]
    return Aluno
        .replaceOne({Número: id}, aluno)
        .exec()
}

