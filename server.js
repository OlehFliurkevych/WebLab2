const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
    response.render('pages/index', { title: 'Home' })
})
app.get('/customer', function (request, response) {
    response.render('pages/customer', { title: 'Customer' })
})
app.get('/project', function (request, response) {
    response.render('pages/project', { title: 'Project' })
})
app.get('/performer', function (request, response) {
    response.render('pages/performer', { title: 'Performer' })
})
app.get('/projects-on-execution', function (request, response) {
    response.render('pages/projects_on_execution', { title: 'ProjectsOnExecution' })
})
app.get('/customer/:id', function (request, response) {

    response.render('pages/customer-edit', {
        title: 'Customer-edit',
        id: request.params.id })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8080)
