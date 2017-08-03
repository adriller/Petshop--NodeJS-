


<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Essa pagina faz a inserção de agendamentos no BD

-->*/
$petID = $_POST["petID"];
$email = $_POST["email"];
$servico = $_POST["servico"];
$horario = $_POST["horario"];
$data = $_POST["data"];

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


$sql = "INSERT INTO agendamentos (petID, donoEmail, nomeServico, horario, dataAgendamento)
          VALUES (".$petID.", '".$email."', '".$servico."', ".$horario.", '".$data."');";

if ($conn->query($sql) === TRUE) {
  echo "Agendado com Sucesso!";
}
else{
  echo "falha no agendamento". $conn->error .$sql;
}


$conn->close();



?>
