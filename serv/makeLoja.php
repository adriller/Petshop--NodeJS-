
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da loja, recebendo o animal e o tipo de produto que se deseja exibir

-->*/
$tipo = $_POST["tipo"];
$animal = $_POST["animal"];

//$tipo = 'alimento';
//$animal = 'gato';

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



$sql = "SELECT * FROM produtos  WHERE tipo = '" .$tipo. "'";
$result = $conn->query($sql);

$page = '  <br><br><br><br><br><div class="w3-ontainer w3-padding-32 w3-hide-small"></div><button class="w3-button w3-teal w3-xlarge w3-hide-large  w3-black" id="openNav" onclick="w3_open()">&#9776;</button><div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left w3-light-gray" style="width:250px;display:none;" id="mySidebar" onclick="w3_close()"><button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="w3_close()">Close &times;</button><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''.$animal.'\', \'alimento\')">Alimentos</a><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''.$animal.'\', \'casa\')">Casinha</a><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''.$animal.'\', \'saude\')">Saude e Higiene</a><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''.$animal.'\', \'outro\')">Outros</a></div><div class="w3-main" id="prodContainer">';

if ($result->num_rows > 0) {


  while($row = $result->fetch_assoc()) {
    if (strlen(stristr($row["animal"],$animal))>0){
      $page = $page. ' <a href="#prod" onclick=\'loadProdDescription(' .$row["produtoID"]. ')\'>' .
        '<div class = "cao-produto"> ' .
        '<img class = "w3-image cao-image" src = "img/' .$row["foto"]. '" alt = "Ração"/> ' .
        '<div class="cao-container"> ' .
        '<p class = "descricao">' .$row["nome"].
        '<br><span class = "descricao">'  .$row["tipo"]. '</span><br><span class = "preco">R$' . $row["preco"].'</span>' .
        '</p> ' .
        '</div> ' .
        '</div>' .
        '</a> ' ;
    }
  }

  $page .= '</div>';
} else {
  $page .= 'Ainda nao Ha itens dessa categoria';
}

echo $page;
$conn->close();




?>
