const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: '1404',   
  database: 'gcs' 
});


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL');
});

module.exports = connection;
