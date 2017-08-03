

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o ID do ultimo produto cadastrado. Esse dado e utilizado para saber quantos produtos estão cadastrados no BD

-->*/
$servername = "localhost";
$username = "2344925_valedospets";
$password = "Adriller123@";
$dbname = "2344925_valedospets";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


/* $sql = "SELECT AUTO_INCREMENT as compraID
FROM  INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = '2344925_valedospets'
AND   TABLE_NAME   = 'compras'";*/

$sql = "SELECT compraID FROM compras  ORDER BY compraID DESC";
$result = $conn->query($sql);

$lastID = -1;


if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  $lastID = $row["compraID"] + 1;
  echo $lastID;
} else {
  echo "<p id='alert'>Erro: Nao foi posivel conectar ao BD</p>";
}
$conn->close();

?>
