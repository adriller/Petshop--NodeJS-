

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Essa pagina faz o cadastro de adminstradores
O campo eAdmin = 1 indica administrador e eAdmin = 0 indica usuario comum

-->*/
$nome = $_POST["nome"];
$email = $_POST["email"];
$telefone = $_POST["telefone"];
$genero = $_POST["sexo"];
$foto = $_POST["foto"];
$senha = $_POST["senha"];

$servername = "localhost";
$username = "2344925_valedospets";
$password = "Adriller123@";
$dbname = "2344925_valedospets";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO clientes (nome, email, telefone, senha, sexo, foto, eAdmin)
  VALUES('".$nome."', '".$email."', '".$telefone."', '".$senha."', '".$genero."', '".$foto."', 1)";

if ($conn->query($sql) === TRUE) {
  echo "Cadastrado com Sucesso!";
} else {
  echo "<span id='textinho' style='color:red'>Error: " . $sql . "<br>" . $conn->error. "</span>";
}
$conn->close();

?>
