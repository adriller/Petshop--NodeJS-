
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina cadastra produtos no BD

-->*/
$nome = $_POST["nome"];
$descricao = $_POST["descricao"];
$tipo = $_POST["tipo"];
$preco = $_POST["preco"];
$animal = $_POST["animal"];
$qtdE = $_POST["qtdE"];
$qtdV = $_POST["qtdV"];
$foto = $_POST["foto"];

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

$data = date("Y-m-d");



$sql = "INSERT INTO produtos (nome, descricao, tipo, animal, preco, dataCadastro, qtdE, qtdV, foto)
VALUES ('" .$nome. "', '" .$descricao. "', '" .$tipo. "', '" .$animal. "', '" .$preco. "', '" .$data. "', '" .$qtdE. "', '" .$qtdV. "', '" .$foto. "')";

if ($conn->query($sql) === TRUE) {
  echo "Cadastrado com Sucesso!";
} else {
  echo "<p id='alert'>Erro: Nao foi possivel cadastrar</p>".$conn->error;
}
$conn->close();



?>
