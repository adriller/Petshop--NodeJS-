
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina faz login verificando se a entrada do usuário é valida.
A função test_input bloqueia SQL Injection

-->*/
$email = test_input($_POST["usrname"]);
$senha = test_input($_POST["psw"]);

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

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

$sql = "SELECT * FROM clientes WHERE email = '" .$email. "' AND senha = '" .$senha. "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();
  echo '{"UserName":"'.$row["nome"].'", "UserAdmin":'.$row["eAdmin"].', "UserEmail":"'.$email.'"}';

} else {
  echo "<p id='alert'>Erro: Credenciais Invalidas</p>";
}
$conn->close();



?>
