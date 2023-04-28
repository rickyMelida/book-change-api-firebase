const app = require('./app');
const port = process.env.PORT || '3300';
const {swaggerDocs: v1SwaggerDocs} = require('./routes/swagger');
 

app.listen(port, () => {
    console.log('Server is running on port ' + port);
    v1SwaggerDocs(app, port);
});
