

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da pagina de Vendas, disponivel no administrador, retornando todas as vendas e agendamentos ja efetuados na loja, bem como o total ganho.

-->*/
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

$totalProdutos = 0;
$totalServicos = 0;
$total = 0;


$page = '<br><br><br><br>
  <div class="w3-ontainer w3-padding-32 w3-hide-small"></div>

  <div id=\'containerConta\' class="w3-light-gray w3-container ">
    <div class="w3-container w3-white minhaConta">
      <label class="titleConta w3-margin-left">Vendas</label>
      <div class="w3-center w3-container ContaHist w3-margin">
        Historico de Vendas<br><br>
        Compras de produtos<br>';

$sql = "SELECT * FROM compras";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $page .= '<div class="contentHist w3-container w3-border ">
          Cliente: '.$row["clienteEmail"].'<br>
          Data: '.$row["dataCadastro"].'<br>
          Codigo:'.$row["compraID"].'<br><br>
          Itens comprados:<br>';


    $sql2 = "SELECT produtos.foto as foto, produtos.descricao as descricao, itensComprados.qtd as qtd, produtos.preco as preco FROM itensComprados JOIN compras ON itensComprados.compraID = compras.compraID  JOIN produtos ON itensComprados.produtoID = produtos.produtoID WHERE compras.compraID = " .$row["compraID"];
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
        $totalProdutos += $row2["preco"] * $row2["qtd"];
      }
      $page .= '</div>';
    }else{
      $page.= 'Sem itens comprados<br>';
      $page .= '</div>';
    }
  }

}else{
  $page .='Ainda nao ha vendas de Produtos<br>'. $sql;
}


$page .= 'Compras de Servicos <br>';

$sql = "SELECT agendamentos.donoEmail as donoEmail, agendamentos.dataAgendamento as dataAgendamento, agendamentos.agendamentoID as agendamentoID, agendamentos.horario as horario, agendamentos.nomeServico as nomeServico, pets.foto as foto, pets.nome as nome, pets.raca as raca, servicos.preco as preco FROM agendamentos INNER JOIN pets ON agendamentos.petID = pets.petID INNER JOIN servicos ON servicos.nome = agendamentos.nomeServico";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {

    $page .= ' <div class="contentHist w3-container w3-border ">
          Cliente: '.$row["donoEmail"].'<br>
          Data: '.$row["dataAgendamento"].'<br>
          Codigo:'.$row["agendamentoID"].'<br><br>
          Servico adquirido:<br>
           <div class="histItem w3-container w3-row">
                    <div class="sizeHist w3-container w3-col">
                        <img class = "cartImg w3-image" src = "img/'.$row["foto"].'" alt = "Ração"/>
                    </div>
                  <div class="sizeHist w3-col w3-container">Tipo:<br>'.$row["nomeServico"].'</div>
                    <div class="sizeHist w3-container w3-col">PET:<br>'.$row["nome"].' </div>
                    <div class="sizeHist w3-container w3-col">Horario<br>'.$row["horario"].'</div>
                    <div class="sizeHist w3-container w3-col">Raca<br>'.$row["raca"].' </div>
                </div>
        </div>';
    $totalServicos += $row["preco"];
  }
}else{
  $page .='Ainda nao ha vendas de Servicos<br>'. $sql;
}

$total = $totalProdutos + $totalServicos;
$page .= '
        Total em vendas de Produtos = '.$totalProdutos.' <br>
        Total em vendas de Serviços = '.$totalServicos.'<br>
        Total = '.$total.'
      </div>

    </div>

  </div>';

echo $page;

$conn->close();



?>
