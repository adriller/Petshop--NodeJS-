
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina cadastra servicos no BD. (Exemplo veterinario, hotel, tosa, etc.)

-->*/
$nome = $_POST["nome"];
$descricao = $_POST["descricao"];
$preco = $_POST["preco"];
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


$sql = "INSERT INTO servicos (nome, descricao, preco, foto)
VALUES ('" .$nome. "', '" .$descricao. "', '" .$preco. "', '" .$foto. "')";

if ($conn->query($sql) === TRUE) {
  echo "Cadastrado com Sucesso!";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();



?>
