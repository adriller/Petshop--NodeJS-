

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna informacoes sobre determinado servico, que e exibido no agendamento

-->*/

$nome= $_POST["servico"];
//$nome= "hotel";

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


$sql = "SELECT * FROM servicos WHERE nome='" .$nome."'";
$result = $conn->query($sql);

$page = "";




if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {

    $page .='<div class="w3-container w3-quarter">
        <img class="w3-image imgServico w3-margin" src="img/'.$row["foto"].'" />
        </div>
        <div class="w3-container w3-rest w3-center" id="descrServico">
          <br>'.$nome.': <br>
          '.$row["descricao"].'<br>
          Preco: '.$row["preco"].'
        </div>';
  }
}


echo $page;

$conn->close();



?>
