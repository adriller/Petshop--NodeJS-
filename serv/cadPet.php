

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Essa pagina faz a inserção de pets no BD

-->*/
$nome = $_POST["nome"];
$donoEmail = $_POST["donoEmail"];
$raca = $_POST["raca"];
$idade = $_POST["idade"];
$permissaoFoto = $_POST["permissao"];
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

$sql = "INSERT INTO pets (donoEmail, nome, raca, idade, permissaoFoto, foto, dataCadastro)
VALUES ('" .$donoEmail. "', '" .$nome. "', '" .$raca. "', '" .$idade. "', '" .$permissaoFoto. "', '" .$foto. "', '" .$data. "')";

if ($conn->query($sql) === TRUE) {
  echo "Cadastrado com Sucesso!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();



?>
