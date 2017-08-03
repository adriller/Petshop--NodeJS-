
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da pagina de descricao de um produto; gerando automaticamente produtos a serem recomendados para o usuario

-->*/
$id = $_POST["id"];
$admin = $_POST["eAdmin"];
$numVendas = $_POST["numVendas"];
//$id = 1;
//$admin = 1;
//$numVendas = 12;


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



$sql = "SELECT * FROM produtos  WHERE produtoID = " .$id. "";
$result = $conn->query($sql);

$page = '<div id="descr-bg">'.
  '<div class="w3-ontainer w3-padding-32 w3-hide-small"></div>'.
  '<br><br><br><br><br>'.
  '<div class=" produtoHeader w3-cell-row ">'.
  '<div class="w3-container w3-cell w3-center w3-mobile w3-margin-bottom">'.
  '<img class = "cao-image" src = " img/';


if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    /*echo  $row["produtoID"].', \''.$row["nome"].'\', \''.$row["descricao"].'\', \''.$row["tipo"].'\', \''.$row["animal"].'\', '.$row["preco"].', '.$row["qtdE"].', '.$row["qtdV"];*/
    $page = $page. $row["foto"];
    $page = $page. '"alt = "Ração"/>'.
      '</div>'.
      '<div class="w3-cell descHeader w3-center w3-black w3-padding w3-mobile">'.
      '<br>'.
      '<h1>'.
      $row["nome"].
      '<br></h1>'.
      '<h3>Tipo: '.
      $row["tipo"].
      '</h3>'.
      '<h3>Para: '.
      $row["animal"].
      '</h3>'.
      '<h3>Preço: R$'.
      $row["preco"].
      '</h3><br><br>'.
      '<a id="btnDesc" type="button" class="w3-hover-white w3-teal" href="#" onclick=\'Comprar(' .$row["produtoID"].',"'. $row["foto"].'"'. ',"'. $row["descricao"].'",'. $row["preco"].', '. $row["qtdE"].')\'>Comprar</a>';
    if($admin == 1)
      $page .= '<a id="btnDesc" type="button" class="w3-hover-white w3-yellow" href="#" onclick="editarProd(' .$row["produtoID"].', \''.$row["nome"].'\', \''.$row["descricao"].'\', \''.$row["tipo"].'\', \''.$row["animal"].'\', '.$row["preco"].', '.$row["qtdE"].', '.$row["qtdV"].', \''.$row["foto"].'\');return false;">Editar</a>';
    $page .= '<br>'.
      '</div>'.
      '</div>'.
      '<div class="w3-container descr-item2 w3-light-gray">'.
      '<h2>Descrição</h2>'.
      '<p>'.
      $row["descricao"].
      ' </p>' .
      '</div>'.
      '<div class="w3-container  w3-center relIA w3-black">'.
      '<h2>Quem viu esse, tambem comprou:</h2>'.
      '    <div class="w3-row">';


    $random = rand ( 1, $numVendas );
    $produtosEscolhidos = array(0, $row["produtoID"]);
    for($x = 0 ; $x < 4 ; $x++){
      while(in_array($random, $produtosEscolhidos))
        $random = rand ( 1, $numVendas );
      array_push($produtosEscolhidos, $random);
      $sql2 = "SELECT * FROM produtos  WHERE produtoID = " .$random. "";
      $result2 = $conn->query($sql2);
      $row2 = $result2->fetch_assoc();
      //echo $sql2;

      while(strlen($row2["animal"]) < 4){
        while(in_array($random, $produtosEscolhidos))
          $random = rand ( 1, $numVendas );
        array_push($produtosEscolhidos, $random);
        $sql2 = "SELECT * FROM produtos  WHERE produtoID = " .$random. "";
        $result2 = $conn->query($sql2);
        $row2 = $result2->fetch_assoc();
      }
      //echo $row2["produtoID"]." ";
      $page .= '<a href="#prod" onclick=\'loadProdDescription(' .$row2["produtoID"]. ')\'>'.
        '<div class="w3-col prodRec w3-hover-teal">'.
        '            <img class = " w3-image image-recomend" src = " img/'.$row2["foto"].'" alt = "Pote para ração"/>'.
        '            <div class="w3-container recomend-container w3-center w3-white ">'.
        '                '.$row2["descricao"].'<br>Para:'.$row2["animal"].'<br>R$'.$row2["preco"].''.
        '            </div>'.
        '            <div class="w3-container cao-container2 w3-center">'.
        '                <p class = "ver">Ver<br></p>'.
        '            </div>'.
        '        </div> </a>';
    }
    /*$page .= '        <div class="w3-col prodRec w3-hover-teal">'.
      '            <img class = " w3-image image-recomend" src = " img/bocasorriso.jpg" alt = "Pote para ração"/>'.
      '            <div class="w3-container recomend-container w3-center w3-white ">'.
      '                Boca Sorriso<br>R$ 49,80'.
      '            </div>'.
      '            <div class="w3-container cao-container2 w3-center">'.
      '                <p class = "ver">Ver<br></p>'.
      '            </div>'.
      '        </div>';

      $page .= '        <div class="w3-col prodRec w3-hover-teal">'.
      '            <img class = " w3-image image-recomend" src = " img/areia.jpg" alt = "Pote para ração"/>'.
      '            <div class="w3-container recomend-container w3-center w3-white ">'.
      '                Areia para gatos<br>Higiene<br>R$ 19,80'.
      '            </div>'.
      '            <div class="w3-container cao-container2 w3-center">'.
      '                <p class = "ver">Ver<br></p>'.
      '            </div>'.
      '        </div>';

      $page .='                <div class="w3-col prodRec w3-hover-teal">'.
      '                    <img class = " w3-image image-recomend" src = " img/vaso.jpg" alt = "Pote para ração"/>'.
      '                    <div class="w3-container recomend-container w3-center w3-white ">'.
      '                        Vasinho sanitario<br>higiene<br>R$ 49,80'.
      '                    </div>'.
      '                    <div class="w3-container cao-container2 w3-center">'.
      '                       <p class = "ver">Ver<br></p>'.
      '                    </div>'.
      '                </div>';*/

    $page .='                </div>'.
      '            </div>'.
      '    </div>';

  }

  echo $page;
} else {
  echo "<p id='alert'>Erro: Nao foi possivel caregar</p>".$conn->error;
}
$conn->close();



?>
