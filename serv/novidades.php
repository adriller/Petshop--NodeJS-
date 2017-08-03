
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna os produtos mais novos cadastrados no BD

-->*/
$categoria = $_POST["categoria"];
$ordem = $_POST["ordem"];
//$categoria = "dataCadastro";

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



$sql = "SELECT * FROM produtos ORDER BY ".$categoria. " " .$ordem. "  LIMIT 30";
$result = $conn->query($sql);

echo $sql;

$page = '  <br><br><br><br><br>
    <div class="w3-ontainer w3-padding-32 w3-hide-small"></div>
    <div class="w3-main" id="prodContainer">';

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    if (strlen($row["animal"])>4){
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
  $page .= 'Ainda nao Ha itens dessa categoria'.$conn->error." ".$sql;
}

echo $page;
$conn->close();




?>
