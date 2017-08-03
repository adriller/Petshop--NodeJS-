

<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da pagina inicial, gerando 4 produtos para a seção Mais Buscados

-->*/
$numVendas = $_POST["numVendas"];
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

$page = '
<div id="petShop" >
  <br><br><br><br>
  <div class="w3-ontainer w3-padding-32 w3-hide-small"></div>
    <div class = "cat w3-container">

      <div class="w3-content w3-display-container slides">
        <img class="mySlides" src="img/banner2.jpg" >
        <img class="mySlides" src="img/banner13.jpg" >
        <img class="mySlides" src="img/banner12.jpg" >
        <img class="mySlides" src="img/banner11.jpg" >
        <img class="mySlides" src="img/banner7.jpg" >
        <img class="mySlides" src="img/banner10.jpg" >

        <button class="w3-button w3-black w3-display-left" onclick="plusDivs(-1)">&#10094;</button>
        <button class="w3-button w3-black w3-display-right" onclick="plusDivs(1)">&#10095;</button>
      </div>

    </div>


    <div id = "maisvendidos" class="w3-center w3-container">
        <h3 class = "titulo"><span>MAIS BUSCADOS</span></h3>

<div id="loadMaisVendidos">


  <div class="w3-row w3-center" id = "selection">
  <div class="w3-row w3-center" id = "selection"> <div class="w3-container w3-col seta" ><a href="#prev" onclick=\'loadMaisVendidos("prev")\'><img class = "w3-image imgSeta" src = "img/back.png" alt = "Seta apontando para antes"/></a></div>';

$random = rand ( 1, $numVendas );
$produtosEscolhidos = array(0);
for($x = 0 ; $x < 4 ; $x++){
  while(in_array($random, $produtosEscolhidos))
    $random = rand ( 1, $numVendas );
  array_push($produtosEscolhidos, $random);
  $sql2 = "SELECT * FROM produtos  WHERE produtoID = " .$random. "";
  $result2 = $conn->query($sql2);
  $row2 = $result2->fetch_assoc();
  echo $sql2. "<br";

  while(strlen($row2["animal"]) < 4){
    while(in_array($random, $produtosEscolhidos))
      $random = rand ( 1, $numVendas );
    array_push($produtosEscolhidos, $random);
    $sql2 = "SELECT * FROM produtos  WHERE produtoID = " .$random. "";
    $result2 = $conn->query($sql2);
    $row2 = $result2->fetch_assoc();
  }

  $page .= '<div class = " w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido">
    <a href="#prod" onclick=\'loadProdDescription(' .$row2["produtoID"]. ')\'>
        <img class = "w3-image imagemMaisVendido" src = " img/' .$row2["foto"]. '" alt = "Ração"/>
          <div class="w3-display-container w3-black w3-hover-teal contDescr">
          ' .$row2["nome"]. '<br>
          <b>R$ ' .$row2["preco"]. '</b>
          </div>

    </a>
  </div>';
}

/*$page .= '<div class = "w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido">
    <a href="#produto" onclick="loadPageDesc(\'casinha grande\')">
      <img class = "w3-image imagemMaisVendido"src = " img/casa-aquario.jpg" alt = "Ração de gato"/>
        <div class="w3-container">
          bolinha com bigode<br>
          Variedades<br>
          <b>R$ 1,80</b>
        </div>

  </a>
</div>

<div class = "w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido">
  <img class = "w3-image imagemMaisVEendido"src = " img/pote.jpg" alt = "Pote para ração"/>
  <div class="w3-container">
  bolinha com bigode<br>
  Variedades<br>
  <b>R$ 1,80</b>
  </div>
</div>

<div class = "w3-container w3-col  w3-animate-right w3-card-4 w3-white  prodMaisVendido">
  <img class = "w3-image imagemMaisVendido"src = " img/bigode.jpg" alt = "Sache para cães"/>
  <div class="w3-container">
  bolinha com bigode<br>
  Variedades<br>
  <b>R$ 1,80</b>
  </div>
</div>';*/

$page .= '<div class="w3-container w3-col  w3-image seta">
  <a href="#next" onclick=\'loadMaisVendidos("next")\'>
    <img class = "w3-image imgSeta" src = " img/next.png" alt = "Seta apontando para antes"/>
  </a>
</div>
</div>
  </div>


    <h3 class = "titulo"><span>CONFIRA TAMBEM:</span></h3>

        <a href="#" onclick=\'loadDestaques("dataCadastro", "DESC")\' class="destaques">
    <div class="w3-display-container w3-margin w3-yellow w3-padding w3-card-4" >
      <div class="w3-quarter w3-container">
        <img id = "imgDestaque1" class="w3-image" src = "img/rabbitpng.png" alt = "Gato mostrando a patinha"/>
      </div>
      <div class="w3-panel w3-rest" >
        <h1 class="w3-text-white destaquesText">
          <b>Novidades</b></h1>
      </div>
      <div class="w3-display-right w3-margin w3-padding w3-display-hover w3-large">
        <img id = "imgCute" class="w3-image" src = "img/catcute.png" alt = "Gato mostrando a patinha"/>
      </div>
    </div>
    </a>
    <br>
    <a href="#" onclick=\'loadDestaques("preco", "ASC")\' class="destaques">
    <div class="w3-display-container w3-margin w3-lime w3-padding w3-card-4" >
      <div class="w3-quarter w3-container">
        <img id = "imgDestaque1" class="w3-image" src = "img/birdpng.png" alt = "Gato mostrando a patinha"/>
      </div>
      <div class="w3-panel w3-rest" >
        <h1 class="w3-text-white destaquesText">
          <b>Mais Baratos</b></h1>
      </div>
      <div class="w3-display-right w3-margin w3-padding w3-display-hover w3-large">
        <img id = "imgCute" class="w3-image" src = "img/dogcute.png" alt = "Gato mostrando a patinha"/>
      </div>
    </div>
    </a>
      <br>

    <a href="#" onclick=\'loadDestaques("qtdV", "DESC")\' class="">
    <div class="w3-display-container w3-margin w3-khaki w3-padding w3-card-4" >
      <div class="w3-quarter w3-container">
        <img id = "imgDestaque1" class="w3-image" src = "img/peixepng.png" alt = "Gato mostrando a patinha"/>
      </div>
      <div class="w3-panel w3-rest" >
        <h1 class="w3-text-white destaquesText">
          <b>Mais Vendidos</b></h1>
      </div>
      <div class="w3-display-right w3-margin w3-padding w3-display-hover w3-large">
        <img id = "imgCute" class="w3-image" src = "img/hamster.png" alt = "Gato mostrando a patinha"/>
      </div>
    </div>
    </a>

    <div class="w3-container w3-center">
      <div class="w3-container fraseContainer w3-center">
        <div class="w3-quarter w3-container">
          <img id = "imgDestaque2" class="w3-image" src = "img/lovepet.PNG" alt = "Gato mostrando a patinha"/>
        </div>
        <div class="w3-panel w3-rest" >
          <h1 class="w3-text-black frase">
            <cite>"Se quiser aprender a amar, comece com os animais ... eles são mais sensíveis."</cite></h1>
        </div>
      </div>
      </div>


';

/*  '<h1 id="ClientsPets">Ultimos PETs cadastrados:</h1>
    <section class= "w3-row w3-center" id = "selection2">


        <div class = "w3-col produto2">
            <img class = "image2 w3-image" src = " img/meme2.jpg" alt = "Ração"/>
            <div class="container w3-teal">
                Abigail
            </div>
        </div>

            <div class = "produto2 w3-col">
            <img class = "image2" src = " img/meme10.jpg" alt = "Ração"/>
            <div class="container w3-teal">
                Abelardo
            </div>
        </div>

            <div class = "produto2 w3-col">
            <img class = "image2" src = " img/meme4.jpg" alt = "Ração"/>
            <div class="container w3-teal">
                Onix
            </div>
        </div>

            <div class = "produto2 w3-col">
            <img class = "image2" src = " img/meme5.jpg" alt = "Ração"/>
            <div class="container w3-teal">
                Floquinho
            </div>
        </div>

        <div class = "produto2 w3-col">
            <img class = "image2"src = " img/meme6.jpg" alt = "Ração de gato"/>
            <div class="container w3-teal">
                Bugao
            </div>
        </div>

        <div class = "produto2 w3-col">
            <img class = "image2"src = " img/meme7.jpg" alt = "Pote para ração"/>
            <div class="container w3-teal">
                K-9
            </div>
        </div>

        <div class = "produto2 w3-col">
            <img class = "image2"src = " img/meme8.jpg" alt = "Sache para cães"/>
            <div class="container w3-teal">
                Toto
            </div>
        </div>


    </section>
        <div class="w3-container w3-center  w3-margin-bottom">
          <h3>Quer seu pet aqui?</h3>
          <a id="btnMain" class="w3-hover-teal" href="#cadpet" onclick="cadastrarPET()">Cadastre</a>
        </div>';*/

$page .= '<footer>
        <p>Trabalho de WEB</p>

        <p>Adriller, Matheus, Rita, Allan, Hikaro</p>


    </footer>
    </div>
</div>';

echo $page;

?>
