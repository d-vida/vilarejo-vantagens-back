let {Cupom,Loja,Usuario,Vantagem} = require('./models.js')

let mongoose = require('mongoose')
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

mongoose.connect(
	'mongodb+srv://admin:admin@vilarejo-9wp9p.gcp.mongodb.net/vilarejo?retryWrites=true&w=majority',
	{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true}
)

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.listen(4000, () => {console.log('listening at 4000')})

/*************
	ENDPOINTS
*************/

///////////////////////////////////////////////// CUPONS

app.get('/getCupons', async (req, res) => {
	try {
		let result = await Cupom.find().exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.get('/getCupom/:id', async (req, res) => {
	try {
		let result = await Cupom.findById(req.params.id).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.post('/addCupom', async (req,res) => {
	try {
		let newCupom = new Cupom(req.body)
		let result = await newCupom.save({validateBeforeSave:false})
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteCupom/:id', async (req,res) => {
	try{
		let result = await Cupom.deleteOne({_id: req.params.id}).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.put('/updateCupom/:id', async (req,res) => {
	try {
		let result = await Cupom.updateOne({_id: req.params.id}, req.body)
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

/////////////////////////////////////////////////// LOJA

app.get('/getLojas', async (req, res) => {
	try {
		let result = await Loja.find().exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.get('/getLoja/:id', async (req, res) => {
	try {
		let result = await Loja.findById(req.params.id).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.post('/addLoja', async (req,res) => {
	try {
		let newLoja = new Loja(req.body)
		let result = await newLoja.save({validateBeforeSave:false})
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteLoja/:id', async (req,res) => {
	try{
		let result = await Loja.deleteOne({_id: req.params.id}).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.put('/updateLoja/:id', async (req,res) => {
	try {
		let result = await Loja.updateOne({_id: req.params.id}, req.body)
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

/////////////////////////////////////////////// USUARIOS

app.get('/getUsuarios', async (req, res) => {
	try {
		let result = await Usuario.find().exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.get('/getUsuario/:id', async (req, res) => {
	try {
		let result = await Usuario.findById(req.params.id).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.post('/addUsuario', async (req,res) => {
	try {
		let newUsuario = new Usuario(req.body)
		let result = await newUsuario.save({validateBeforeSave:false})
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteUsuario/:id', async (req,res) => {
	try{
		let result = await Usuario.deleteOne({_id: req.params.id}).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.put('/updateUsuario/:id', async (req,res) => {
	try {
		let result = await Usuario.updateOne({_id: req.params.id}, req.body)
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

//////////////////////////////////////////////////// VANTAGENS

app.get('/getVantagens', async (req, res) => {
	try {
		let result = await Vantagem.find().exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.get('/getVantagem/:id', async (req, res) => {
	try {
		let result = await Vantagem.findById(req.params.id).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.post('/addVantagem', async (req,res) => {
	try {
		let newVantagem = new Vantagem(req.body)
		let result = await newVantagem.save({validateBeforeSave:false})
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.delete('/deleteVantagem/:id', async (req,res) => {
	try{
		let result = await Vantagem.deleteOne({_id: req.params.id}).exec()
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})

app.put('/updateVantagem/:id', async (req,res) => {
	try {
		let result = await Vantagem.updateOne({_id: req.params.id}, req.body)
		res.send(result)
	} catch(error) {
		res.status(500).send(error)
	}
})