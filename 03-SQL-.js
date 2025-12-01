// ===== Bloque 1 – Introducción a MongoDB =====
// Ejercicio 1 - Selecciona/crea la base 'universidad' (se genera al insertar el primer registro).
//use universidad

// Ejercicio 2 - Muestra la base de datos en uso (debería ser 'universidad').
db

// Ejercicio 3 - Lista todas las bases; la nueva aparece solo tras guardar datos.
//show dbs


// ===== Bloque 2 – Beneficios del esquema flexible =====
// Ejercicio 1 - Inserta un documento con campos anidados sin definir estructura previa.
db.cursos.insertOne({ nombre: 'Probabilidad II', creditos: 10, horas: { teoria: 6, practica: 4 } })

// Ejercicio 2 - Inserta otro documento con atributos distintos; MongoDB admite ambos.
db.cursos.insertOne({ nombre: 'Curso X', duracion: 'variable' })

// Ejercicio 3 - Muestra documentos en formato legible; se nota la diversidad de esquemas.
db.cursos.find().pretty()


// ===== Bloque 3 – JSON frente a BSON =====
// Ejercicio 1 - JSON es fácil de leer; útil en desarrollo y pruebas.
// Ejemplo JSON para humanos:
//{ nombre: 'Ana', edad: 28 }

// Ejercicio 2 - BSON es el formato binario interno de MongoDB.
// Internamente: BSON guarda tipos y es binario; no es comando shell

// Ejercicio 3 - Devuelve un documento BSON convertido a JSON para visualizarlo en shell.
db.cursos.findOne()


// ===== Bloque 4 – Panorama NoSQL =====
// Ejercicio 1 - CouchDB, Cassandra, Redis, Neo4j son alternativas con modelos diferentes.
// No existe comando único; solo ejemplos

// Ejercicio 2 - En Redis, PING responde PONG (ejemplo conceptual).
// Ejemplo: conectar a Redis (fuera de Mongo) - comando shell Redis
// redis-cli PING

// Ejercicio 3 - Consulta de ejemplo en Neo4j; muestra el modelo de grafos.
// Neo4j usa Cypher, ejemplo ilustrativo
// MATCH (n) RETURN n LIMIT 1


// ===== Bloque 5 – Instalación y puesta en marcha de MongoDB =====
// Ejercicio 1 - Arranca el servicio mongod.
// En Linux (ejemplo):
//sudo systemctl start mongod

// Ejercicio 2 - Verifica si mongod está activo.
// Consultar estado:
//sudo systemctl status mongod

// Ejercicio 3 - Conéctate al shell de MongoDB.
// Iniciar mongo shell:
//mongo --quiet


// ===== Bloque 6 – Shell y comandos esenciales =====
// Ejercicio 1 - Lista las bases de datos disponibles.
//show dbs

// Ejercicio 2 - Selecciona/crea la base 'tienda'.
//use tienda

// Ejercicio 3 - Muestra ayuda de los métodos disponibles en la base.
//db.help()


// ===== Bloque 7 – Bases, colecciones y documentos =====
// Ejercicio 1 - Crea la colección 'productos' (opcional, se genera al insertar).
db.createCollection('productos')

// Ejercicio 2 - Inserta un documento en 'productos'.
db.productos.insertOne({ nombre: 'Libro', precio: 25 })

// Ejercicio 3 - Muestra los registros guardados en 'productos'.
db.productos.find()


// ===== Bloque 8 – Inserción de documentos =====
// Ejercicio 1 - Inserta un documento (insert es alias de insertOne/insertMany).
db.curso.insert({ nombre: 'Estadística I', creditos: 8 })

// Ejercicio 2 - Inserta varios documentos en una sola operación.
db.curso.insertMany([
    { nombre: 'Probabilidad II', creditos: 10, horas: { teoria: 6, practica: 4 } },
    { nombre: 'Bases de Datos', creditos: 12, horas: { teoria: 4, practica: 8 } }
])

// Ejercicio 3 - Devuelve el número de documentos en la colección 'curso'.
db.curso.countDocuments()


// ===== Bloque 9 – Consultas simples =====
// Ejercicio 1 - Obtiene el primer documento que cumpla la condición.
db.curso.findOne({ nombre: 'Probabilidad II' })

// Ejercicio 2 - Devuelve cursos con creditos >= 10 en formato legible.
db.curso.find({ creditos: { $gte: 10 } }).pretty()

// Ejercicio 3 - Limita la salida a 5 documentos.
db.curso.find({}).limit(5)


// ===== Bloque 10 – Consultas con operadores =====
// Ejercicio 1 - Cursos con creditos entre 9 y 12.
db.curso.find({ creditos: { $gt: 8, $lt: 13 } })

// Ejercicio 2 - Cursos con creditos=10 O práctica >=4.
db.curso.find({ $or: [{ creditos: 10 }, { 'horas.practica': { $gte: 4 } }] })

// Ejercicio 3 - Cursos cuyo nombre comienza con 'Probabilidad'.
db.curso.find({ nombre: { $regex: /^Probabilidad/ } })


// ===== Bloque 11 – Documentos con campos anidados =====
// Ejercicio 1 - Busca por campo interno 'horas.practica'.
db.curso.find({ 'horas.practica': 4 })

// Ejercicio 2 - Proyección que muestra solo nombre y horas.teoria.
db.curso.find({ 'horas.teoria': { $exists: true } }, { nombre: 1, 'horas.teoria': 1, _id: 0 })

// Ejercicio 3 - Combina criterios en campos anidados y superiores.
db.curso.find({ 'horas.practica': 4, 'creditos': 10 })


// ===== Bloque 12 – Arrays en MongoDB =====
// Ejercicio 1 - Documento con lista 'temas'.
db.curso.insertOne({ nombre: 'Análisis', temas: ['Probabilidad', 'Estadística', 'Regresion'] })

// Ejercicio 2 - Encuentra documentos donde el array incluye 'Probabilidad'.
db.curso.find({ temas: 'Probabilidad' })

// Ejercicio 3 - Encuentra documentos que contienen ambos valores en el array.
db.curso.find({ temas: { $all: ['Probabilidad', 'Estadística'] } })


// ===== Bloque 13 – Operaciones en arrays =====
// Ejercicio 1 - Añade 'Series' al array 'temas'.
db.curso.updateOne({ nombre: 'Análisis' }, { $push: { temas: 'Series' } })

// Ejercicio 2 - Añade 'Probabilidad' solo si no existe (evita duplicados).
db.curso.updateOne({ nombre: 'Análisis' }, { $addToSet: { temas: 'Probabilidad' } })

// Ejercicio 3 - Quita 'Regresion' del array 'temas'.
db.curso.updateOne({ nombre: 'Análisis' }, { $pull: { temas: 'Regresion' } })


// ===== Bloque 14 – Actualizaciones de campos =====
// Ejercicio 1 - Cambia creditos a 9.
db.curso.updateOne({ nombre: 'Estadística I' }, { $set: { creditos: 9 } })

// Ejercicio 2 - Suma 1 a creditos.
db.curso.updateOne({ nombre: 'Estadística I' }, { $inc: { creditos: 1 } })

// Ejercicio 3 - Elimina el campo 'departamento' del documento.
db.curso.updateOne({ nombre: 'Estadística I' }, { $unset: { departamento: '' } })


// ===== Bloque 15 – Borrado de documentos =====
// Ejercicio 1 - Borra un documento que cumpla la condición.
db.curso.deleteOne({ nombre: 'Curso X' })

// Ejercicio 2 - Borra todos los cursos con creditos < 5.
db.curso.deleteMany({ creditos: { $lt: 5 } })

// Ejercicio 3 - Vacía la colección (igual a deleteMany({})).
db.curso.remove({})


// ===== Bloque 16 – Índices =====
// Ejercicio 1 - Crea índice ascendente en 'nombre'.
db.curso.createIndex({ nombre: 1 })

// Ejercicio 2 - Crea índice compuesto por creditos y nombre.
db.curso.createIndex({ creditos: 1, nombre: 1 })

// Ejercicio 3 - Lista los índices de la colección.
db.curso.getIndexes()


// ===== Bloque 17 – Compass (interfaz visual y validación) =====
// Ejercicio 1 - Acción visual para crear DB y documentos.
// En Compass: usar 'Create Database' y 'Insert Document' (GUI)

// Ejercicio 2 - Valida que 'nombre' y 'creditos' sean obligatorios.
// Ejemplo de validación (JSON Schema):
//{ validator: { $jsonSchema: { bsonType: 'object', required: ['nombre','creditos'] } } }

// Ejercicio 3 - Construir y probar pipelines de forma visual.
// En Compass: pestaña Aggregations para armar pipelines


// ===== Bloque 18 – Aggregation Pipeline =====
// Ejercicio 1 - Agrupa cursos por creditos y cuenta cuántos hay en cada grupo.
db.curso.aggregate([
    { $match: { creditos: { $gte: 8 } } },
    { $group: { _id: '$creditos', total: { $sum: 1 } } },
    { $sort: { total: -1 } }
])

// Ejercicio 2 - Calcula horas_total sumando teoria y practica.
db.curso.aggregate([{ $project: { nombre: 1, horas_total: { $add: ['$horas.teoria', '$horas.practica'] } } }])

// Ejercicio 3 - Cuenta la frecuencia de cada tema en los arrays 'temas'.
db.curso.aggregate([{ $unwind }])