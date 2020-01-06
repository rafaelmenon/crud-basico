const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  const save = async (req, res) => {
    const user = { ...req.body }
    if(req.params.id) user.id = req.params.id
    
    try {
      existsOrError(user.name, 'Nome não informado')
      existsOrError(user.email, 'E-mail não informado')

      const userFromDB = await app.db('usuarios')
        .where({ email: user.email }).first();

      if(!user.id) {
        notExistsOrError(userFromDB, 'Usuário já cadastrado');
      }
    } catch(msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password)
    delete user.confirmPassword

    if(user.id) {
      app.db('usuarios')
        .update(user)
        .where({ id: user.id })
        .then(_ => res.status(204).send())
        .catch(res.status(500).send(err))
    } else {
      app.db('usuarios')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
    }
  }

  const get = (req, res) => {
    app.db('usuarios')
      .select('id', 'name', 'email')
      .then(usuarios => res.json(usuarios))
      .catch(err => res.status(500).send(err))
  }

  const remove = async (req, res) => {
    try {
        const rowsDeleted = await app.db('usuarios')
            .where({ id: req.params.id }).del()
        
        try {
            existsOrError(rowsDeleted, 'Membro não foi encontrado.')
        } catch(msg) {
            return res.status(400).send(msg)    
        }

        res.status(204).send()
    } catch(msg) {
        res.status(500).send(msg)
    }
}

  return { save, get, remove }
}