

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da pagina de Agendamentos

-->*/
$email = $_POST["email"];
//$email = 'adriller_gf@hotmail.com';

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


$page = '<div id="calendarioPage">
    <br><br><br><br>
  <div class="w3-ontainer w3-padding-32 w3-hide-small"></div>
  <div class="w3-container w3-center tituloCalend w3-teal">
    <br>Agende um serviço!<br><br>
  </div>
  <div class= " w3-container w3-center subtitCalend w3-black" >
    <br>Escolha uma data e hora:<br>
    <input id="servData" class="dataSelect" type="date"/><br><br>
    Qual serviço deseja:
  <form id="formEscolherServico">
    <input id="selectServico" class="dataSelect" list="servicos" onchange="mostrarSobreServico()" name="servico">
    <datalist id="servicos" >';

$sql = "SELECT * FROM servicos";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $page .='<option value="'.$row["nome"].'">';
  }
} else {
  echo "<p id='alert'>Erro: Nao foi possivel caregar</p>".$conn->error;
}

$page .='</datalist>
    <br>
  </form>
  <button class="w3-light-gray w3-hover-teal w3-margin btnSelectServ" onclick="mostrarHorarios()">Consultar Horarios</button>

   <div class="w3-container w3-teal w3-margin" id="sobreServico">
   </div>

    <div id="horariosServ" class="w3-container w3-margin ">';


/* $page .='<a href="#" onclick="selectHorario(horario)"><div class="w3-container w3-red w3-margin">
        <div class=" w3-quarter">
          <img class="w3-image offCalend" src="img/meme2.jpg" />
        </div>
        <div class="w3-threequarter">
          <span class="horarioBlock" >Nome: Luluzinha <br>Servico: Tosa <br> Horario: 9h</span>
        </div>
      </div></a>';*/

$page .='</div>

    Qual PET sera atendido?

    <div class="w3-container">';

$sql = "SELECT * FROM pets WHERE donoEmail = '" .$email. "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $page .='<div class="escolherPet w3-margin">
        <a href="#" id="selection" onclick="selectPet('.$row["petID"].');return false;"><img class="w3-image offCalend" id="pet'.$row["petID"].'" src="img/'.$row["foto"].'" /></a>
      </div>';

  }
} else {
  $page .=  "Voce ainda nao possui PETs cadastrados. Por favor, cadastre.";
}



$page .='</div>
    <br> <a id="btnMain2" class="w3-teal" href="#cadpet" onclick="cadastrarNovoPET()"> Cadastrar novo PET</a>
    <br><br>
    <a id="btnMain" class="w3-green" href="#cadpet" onclick="pagarServ();return false;">Agendar</a><br><br>
  </div>
  </div>';

echo $page;
?>
