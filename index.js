let { Cupom, Loja, Usuario, Vantagem, UsuarioLoja } = require('./models.js')

let mongoose = require('mongoose')
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
require('dotenv').config()

mongoose.connect(
	'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/vilarejo?retryWrites=true&w=majority',
	{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
)

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.listen(process.env.PORT || 4000, () => { console.log('listening at 4000') })

/*************
	ENDPOINTS
*************/

///////////////////////////////////////////////// CUPONS

app.get('/getCupons', async (req, res) => {
	try {
		let result = await Cupom.find().exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getCupom/:id', async (req, res) => {
	try {
		let result = await Cupom.findById(req.params.id).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/addCupom', async (req, res) => {
	try {
		let newCupom = new Cupom(req.body)
		let result = await newCupom.save({ validateBeforeSave: false })
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteCupom/:id', async (req, res) => {
	try {
		let result = await Cupom.deleteOne({ _id: req.params.id }).exec()
		await Usuario.findByIdAndUpdate(
			req.body.usuario,
			{ $push: { cuponsUsados: req.body.cupom } }
		)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.put('/updateCupom/:id', async (req, res) => {
	try {
		let result = await Cupom.updateOne({ _id: req.params.id }, req.body)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.patch('/deleteCupomFromUsuarios/:id', async (req, res) => {
	try {
		let result = await Usuario.updateMany(
			{},
			{ $pull: { cuponsUsados: req.params.id } }
		)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.patch('/addCupomToUsuario', async (req, res) => {
	try {
		let result = await Usuario.findByIdAndUpdate(
			req.body.usuario,
			{ $push: { cuponsUsados: req.body.cupom } }
		)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getCuponsFromUsuarioAsObject/:id', async (req, res) => {
	try {
		let usuario = await Usuario.findById(req.params.id).exec()
		let cupons = await Cupom.find({ _id: { $in: usuario.cuponsUsados } })
		res.send(cupons)
	} catch (error) {
		res.status(500).send(error)
	}
})

/////////////////////////////////////////////////// LOJA

app.get('/getLojas', async (req, res) => {
	try {
		let result = await Loja.find().exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getLoja/:id', async (req, res) => {
	try {
		let result = await Loja.findById(req.params.id).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/addLoja', async (req, res) => {
	try {
		let newLoja = new Loja(req.body)
		let result = await newLoja.save({ validateBeforeSave: false })
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteLoja/:id', async (req, res) => {
	try {
		let result = await Loja.deleteOne({ _id: req.params.id }).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.put('/updateLoja/:id', async (req, res) => {
	try {
		let result = await Loja.updateOne({ _id: req.params.id }, req.body)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/checkLoja', async (req, res) => {
	try {
		let result = await Loja.exists({ nome: req.body.nome, senha: req.body.senha })
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getUsuariosLoja', async (req, res) => {
	try {
		let result = await UsuarioLoja.find().exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/addUsuarioLoja', async (req, res) => {
	try {
		const Nome = await UsuarioLoja.findOne({ nome: req.body.nome })
		if (Nome) {
			res.status(401).send('Loja já cadastrado')
		} else {
			const salt = bcrypt.genSaltSync()
			req.body.senha = bcrypt.hashSync(req.body.senha, salt)
			let newUsuarioLoja = new UsuarioLoja(req.body)
			let result = await newUsuarioLoja.save({ validateBeforeSave: false })
			let token = jwt.encode(result._id, process.env.SECRET)
			res.send(token)
		}
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
})

app.get('/LojistaLogin/:loja/:senha', async (req, res) => {
	try {
		const Loja = req.params.loja
		const lojista = await UsuarioLoja.findOne({ loja: Loja })
		if (!lojista) {
			res.status(401).send('Lojista não cadastrado')
		} else {
			const ComparandoSenha = bcrypt.compareSync(req.params.senha, lojista.senha)

			if (!ComparandoSenha) {
				res.status(401).send('Senha incorreta')
			}
			let token = jwt.encode(lojista._id, process.env.SECRET)

			res.send(token)
		}
	} catch (error) {
		res.status(500).send(error)
	}
})

/////////////////////////////////////////////// USUARIOS

app.get('/getUsuarios', async (req, res) => {
	try {
		let result = await Usuario.find().exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/Login/:email/:senha', async (req, res) => {
	try {
		const Email = req.params.email
		const usuario = await Usuario.findOne({ email: Email })
		if (!usuario) {
			res.status(401).send('Usuário não cadastrado')
		} else {
			const ComparandoSenha = bcrypt.compareSync(req.params.senha, usuario.senha)

			if (!ComparandoSenha) {
				res.status(401).send('Senha incorreta')
			}
			let token = jwt.encode(usuario._id, process.env.SECRET)

			res.send(token)
		}
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getUsuario/:id', async (req, res) => {
	try {
		let result = await Usuario.findById(req.params.id).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getUsuarioByToken/:token', async (req, res) => {
	try {
		let Token = req.params.token
		let decoded = await jwt.decode(Token, process.env.SECRET)
		let result = await Usuario.findById(decoded)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/addUsuario', async (req, res) => {
	try {
		const Email = await Usuario.findOne({ email: req.body.email })
		if (Email) {
			res.status(401).send('Email já cadastrado')
		} else {
			const salt = bcrypt.genSaltSync()
			req.body.senha = bcrypt.hashSync(req.body.senha, salt)
			let newUsuario = new Usuario(req.body)
			let result = await newUsuario.save({ validateBeforeSave: false })
			let token = jwt.encode(result._id, process.env.SECRET)
			res.send(token)
		}
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}
})

app.delete('/deleteUsuario/:id', async (req, res) => {
	try {
		let result = await Usuario.deleteOne({ _id: req.params.id }).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.put('/updateUsuario/:id', async (req, res) => {
	try {
		let result = await Usuario.updateOne({ _id: req.params.id }, req.body)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

//////////////////////////////////////////////////// VANTAGENS

app.get('/getVantagens', async (req, res) => {
	try {
		let result = await Vantagem.find().exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.get('/getVantagem/:id', async (req, res) => {
	try {
		let result = await Vantagem.findById(req.params.id).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.post('/addVantagem', async (req, res) => {
	try {
		let newVantagem = new Vantagem(req.body)
		let result = await newVantagem.save({ validateBeforeSave: false })
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteVantagem/:id', async (req, res) => {
	try {
		let result = await Vantagem.deleteOne({ _id: req.params.id }).exec()
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})

app.put('/updateVantagem/:id', async (req, res) => {
	try {
		let result = await Vantagem.updateOne({ _id: req.params.id }, req.body)
		res.send(result)
	} catch (error) {
		res.status(500).send(error)
	}
})