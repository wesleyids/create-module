var fs = require('fs');

/**
* Template Controller
*/
var templateController = 
  'const {nameModule}Repository = require("./repository");\n'
+ 'const handlerError = require("../../response/handlerError");\n'
+ 'const handlerSuccess = require("../../response/handlerSuccess");\n'
+ 'const {nameModule}Service = require("./service");\n'
+ '\n'
+ 'var {nameModule}Controller = function() {}\n'
+ '\n'
+ '{nameModule}Controller.prototype.find = (request, response) => {\n'
+ '    {nameModule}Repository.find({}, {}, (err, resultDB) => {\n'
+ '        if (err) {\n'
+ '            return handlerError(response, err);\n'
+ '        }\n'
+ '        handlerSuccess(response, resultDB);\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Controller.prototype.findById = (request, response) => {\n'
+ '    var _id = request.params.id;\n'
+ '    {nameModule}Repository.findById(_id, {}, (err, resultDB) => {\n'
+ '        if (err) {\n'
+ '            return handlerError(response, err);\n'
+ '        }\n'
+ '        handlerSuccess(response, resultDB);\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Controller.prototype.update = (request, response) => {\n'
+ '    var body = request.body;\n'
+ '    {nameModule}Repository.findById(body._id, (err, resultDB) => {\n'
+ '        if (err) {\n'
+ '            return handlerError(response, err);\n'
+ '        }\n'
+ '\n'
+ '        if (!resultDB) {\n'
+ '            return handlerError(response, "messageError", 404);\n'
+ '        }\n'
+ '\n'
+ '        var updated = {nameModule}Service.assign(body, resultDB);\n'
+ '\n'
+ '        {nameModule}Repository.update(updated, (err, result) => {\n'
+ '            if (err) {\n'
+ '                return handlerError(response, err);\n'
+ '            }\n'
+ '            handlerSuccess(response, result, 200);\n'
+ '        })\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Controller.prototype.save = (request, response) => {\n'
+ '    var body = request.body;\n'
+ '    {nameModule}Repository.save(body, (err, resultDB) => {\n'
+ '        if (err) {\n'
+ '            return handlerError(response, err);\n'
+ '        }\n'
+ '        handlerSuccess(response, resultDB, 201);\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Controller.prototype.remove = (request, response) => {\n'
+ '    var _id = request.params.id;\n'
+ '    {nameModule}Repository.remove(_id, (err, result) => {\n'
+ '        if (err) {\n'
+ '            return handlerError(response, err);\n'
+ '        }\n'
+ '        handlerSuccess(response, result);\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ 'module.exports = new {nameModule}Controller();';

/**
* Repository
*/
var templateRepository = 
  'const {nameModule} = require("./model");\n'
+ '\n'
+ 'var {nameModule}Repository = function() {}\n'
+ '\n'
+ '{nameModule}Repository.prototype.find = (query, fields, callback) => {\n'
+ '    {nameModule}.find(query, fields, (err, results) => {\n'
+ '        if (err) {\n'
+ '            callback(err, null);\n'
+ '        } else {\n'
+ '            callback(null, results);\n'
+ '        }\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Repository.prototype.findById = (_id, fields, callback) => {\n'
+ '    {nameModule}.findById(_id, fields, (err, result) => {\n'
+ '        if (err) {\n'
+ '            callback(err, null);\n'
+ '        } else {\n'
+ '            callback(null, result);\n'
+ '        }\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Repository.prototype.save = (data, callback) => {\n'
+ '    {nameModule}.create(data, (err, result) => {\n'
+ '        if (err) {\n'
+ '            callback(err, null);\n'
+ '        } else {\n'
+ '            callback(null, result);\n'
+ '        }\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Repository.prototype.update = (data, callback) => {\n'
+ '    {nameModule}.update(data, { new: true }, (err, result) => {\n'
+ '        if (err) {\n'
+ '            callback(err, null);\n'
+ '        } else {\n'
+ '            callback(null, result);\n'
+ '        }\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ '{nameModule}Repository.prototype.remove = (_id, callback) => {\n'
+ '    {nameModule}.remove(_id, (err, result) => {\n'
+ '        if (err) {\n'
+ '            callback(err, null);\n'
+ '        } else {\n'
+ '            callback(null, result);\n'
+ '        }\n'
+ '    })\n'
+ '}\n'
+ '\n'
+ 'module.exports = new {nameModule}Repository();';

/**
* Template Model
*/
var templateModel = 
  'const mongoose = require("mongoose");\n'
+ 'var Schema = mongoose.Schema;\n'
+ '\n'
+ 'var {nameModule}Schema = new Schema({\n'
+ '    createdAt: { type: Date, default: new Date() }\n'
+ '});\n'
+ '\n'
+ 'module.exports = mongoose.model("{nameModule}", {nameModule}Schema);';


/**
* Template Index
*/
var templateIndex = 
  'const express = require("express");\n'
+ 'const router = express.Router();\n'
+ 'const controller = require("./controller");\n'
+ '\n'
+ 'router.get("/", controller.find);\n'
+ 'router.get("/:id", controller.findById);\n'
+ 'router.post("/", controller.save);\n'
+ 'router.put("/", controller.update);\n'
+ 'router.delete("/:id", controller.remove);\n'
+ '\n'
+ 'module.exports = router;';

/**
* Template Service
*/
var templateService =
  'var {nameModule}Service = function() {}\n'
+ '\n'
+ '{nameModule}Service.prototype.update = (body, resultDB) => {\n'
+ '	return Object.assign(body, resultDB);\n'
+ '}\n'
+ '\n'
+ 'module.exports = new {nameModule}Service();';

var search = '{nameModule}';
var nameModule = '';

function replace(value) {
	var replaceWith = nameModule;
	return value.split(search).join(replaceWith);
}

function createFile(nameFile, contentFile) {
	fs.writeFile(nameFile, contentFile, 'utf8', function(err, file) {
		if (err) {
			throw new Error(`Error create file ${nameFile}: `, err);
		}
		console.log(`create file ${nameFile} with success.`);
	})
}

function existsDir(dir) {
	return fs.existsSync(dir);
}

function createFiles(dir, callback) {

	var files = [
		{
			name: 'index.js',
			content: replace(templateIndex)
		},
		{
			name: 'controller.js',
			content: replace(templateController)
		},
		{
			name: 'model.js',
			content: replace(templateModel)
		},
		{
			name: 'repository.js',
			content: replace(templateRepository)
		},
		{
			name: 'service.js',
			content: replace(templateService)
		}
	]

	// for (var i = 0; i < files.length; i++) {
	// 	var file = files[i]
	// 	createFile(`${dir}/${file.name}`, file.content);
	// }

	var fn = function(index) {

		if (!files[index]) {
			return callback(true);
		}

		var nameFile = `${dir}/${files[index].name}`;
		var contentFile = files[index].content;

		fs.writeFile(nameFile, contentFile, 'utf8', function(err, file) {
			if (err) {
				throw new Error(`Error create file ${nameFile}: `, err);
			}
			console.log(`create file ${nameFile} with success.`);
			fn(index + 1);
		})
	}

	fn(0);
}

function isHelped() {
	if (args.length > 0) {
		for (var i = 0; i < args.length; i++) {
			if (args[i].indexOf('--h') != -1 ||
				args[i].indexOf('--help') != -1) {
				console.log(help);
				return true;
			}
		}
	}
	return false;
}

// fixme: renomeando {nameModule} errado
function createModule(dir, indexModule) {

	let mod = modules[indexModule];

	if (!mod) {
		return;
	}

	// for (var i = 0; i < modules.length; i++) {
		// let mod = modules[i];
	nameModule = mod.charAt(0).toUpperCase() + mod.slice(1);

	var tracoModulo = nameModule.indexOf('-');
	if (tracoModulo != -1) {
		nameModule = nameModule.replace('-', nameModule.charAt(tracoModulo+2).toUpperCase());
		// console.log("-----> " , nameModule.charAt(tracoModulo).toUpperCase());
		// console.log("-----> " , tracoModulo);
		// console.log("-----> " , nameModule.charAt(tracoModulo+1).toUpperCase());
	}

	if (!existsDir(`${dir}/${mod}`)) {
		fs.mkdir(`${dir}/${mod}`, function(err, dirr) {
			if (err) {
				console.log(err);
			} else {
				console.log(`create module ${mod}..`);

				createFiles(`${dir}/${mod}`, function(result) {
					if (result) {
						createModule(dir, (indexModule + 1));
					}
				});
			}
		});
	} else {
		console.log(`Already exists module with name: [${mod}]`);
		createModule(dir, (indexModule + 1));
	}
	// }
}

function initialize() {

	var _existsDir = existsDir(dir);

	var _dirFull = `${__dirname}/${dir}`;

	if (!_existsDir) {
		console.log("dir output not exists...");
	} else {
		createModule(_dirFull, 0);
	}
}

var help = 
  ' Usage: node createModule.js --modules=sales --dir=modules\n\n'
+ '  --modules=...			name modules comma separated\n'
+ '  --dir=			create module in dir';

var args = process.argv.slice(2);

if (isHelped()) {
	process.exit(0)
}

var modules = [];
var dir = "";

// config modules
// for (var i = 0; i < args.length; i++) {
// }
// console.log(args[0])
if (args.length > 0) {

	//config modules
	var tmpModules = args[0];
	if (tmpModules.indexOf('--modules=') == -1) {
		console.log('first parameter is [--modules=...]');
		process.exit(0);
	} else {
		tmpModules = tmpModules.replace('--modules=', '');
		modules = tmpModules.split(',');
	}

	// config dir
	var tmpDir = args[1];
	if (tmpDir.indexOf('--dir=') == -1) {
		console.log('second parameter is [--dir=...]');
		process.exit(0);
	} else {
		dir = tmpDir.replace('--dir=', '');
	}
}

initialize()

/*
README.md

node createModule.js --h | --help

	--modules=...			name modules comma separated
	--dir=					create module in dir


node createModule.js --modules=sales,customer --dir=testModules

create
	/<name_module>
		index.js // contains routes
		controller.js
		model.js
		repository.js
		service.js

*/
