
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da pagina Minha conta, gerando todas as compras e agendamentos do usuario logado

-->*/
$email = $_POST["email"];
//$email = "adriller_gf@hotmail.com";


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



$sql = "SELECT * FROM compras  WHERE clienteEmail = '" .$email. "'";
$result = $conn->query($sql);

$page = '<br><br><br><br>
  <div class="w3-ontainer w3-padding-32 w3-hide-small"></div>

  <div id=\'containerConta\' class="w3-light-gray w3-container ">
    <div class="w3-container w3-white minhaConta">
      <label class="titleConta w3-margin-left">Minha Conta</label>
      <div class="w3-center w3-container ContaHist w3-margin">
        Historico de Pedidos';





if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $page .= '<div class="contentHist w3-container w3-border ">
          Data: '.$row["dataCadastro"].'<br>
          Codigo:'.$row["compraID"].'<br><br>
          Itens comprados:<br>';

    $sql2 = "SELECT produtos.foto as foto, produtos.descricao as descricao, itensComprados.qtd as qtd, produtos.preco as preco FROM itensComprados JOIN compras ON itensComprados.compraID = compras.compraID  JOIN produtos ON itensComprados.produtoID = produtos.produtoID WHERE compras.compraID = " .$row["compraID"]. "";
    $result2 = $conn->query($sql2);
    if ($result2->num_rows > 0) {
      while($row2 = $result2->fetch_assoc()) {
        $page.='<div class="histItem w3-container w3-row">
                <div class="cartProdImg w3-container w3-col">
                    <img class = "cartImg w3-image" src = "img/'.$row2["foto"].'" alt = "Ração"/>
                </div>

              <div class="cartDescr w3-col w3-container">'.$row2["descricao"].'</div>
                <div class="cartQtd w3-container w3-col">'.$row2["qtd"].' </div>
                <div class="cartPreco w3-container w3-col">R$'.$row2["preco"].' </div>
            </div>';
      }
    }
    $page .=  '</div>';
  }

}
else{
  $page .= '<br>Nenhuma compra efetuada';
}
$page .= '</div>';


$page .= '<span style="font-size:4vmin;text-align:center">Meus Pets</span>

    <div class="w3-container">';

$sql = "SELECT * FROM pets WHERE donoEmail = '" .$email. "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $page .='<div class="escolherPet w3-margin">
        <a href="#" id="selection" onclick="return false;"><img class="w3-image offCalend" id="pet'.$row["petID"].'" src="img/'.$row["foto"].'" /></a>
      </div>';

  }
} else {
  $page .=  '<span style="font-size:2vmin">Voce ainda nao possui PETs cadastrados. Por favor, cadastre.</span>';
}


$page .='
        </div>
         <br><a id="btnMain" class="w3-hover-gray w3-teal w3-center" href="#cadpet" onclick="cadastrarContaPET()"> Cadastrar novo PET</a> <br><br><br>
      </div>

    </div>';

echo $page;
$conn->close();



?>
