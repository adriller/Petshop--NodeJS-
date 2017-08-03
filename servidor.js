/*
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452
*/

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let fs = require('fs');
let url = require('url');
let nano = require("nano")("http://localhost:5984");
var currentID = 5;
var prod;
app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static('public'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('public'));

app.get('/SobreNos', function(req, res) {
  console.log("Got a GET request for sobre nos");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  let data = fs.readFileSync('staticpages/sobreNos.html');


  res.end(data);
})

app.post('/header', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  var admin = req.body.admin;
  var nome = req.body.nome;
  var prod = null;
  let data = "";
  if(admin == 0){
    data = "<header class = \"w3-row w3-gray\">"
      +"      <div class=\"w3-left\">"
      +"        <div class=\"paragraph\"><b>FRETE GRÁTIS</b> NAS COMPRAS ACIMA DE R$ 300 | PARCELE EM ATÉ <b>6X SEM JUROS</b></div>"
      +"      </div>"
      +"        <a href=\"#carrinho\" onclick=\"loadCarrinho()\">"
      +"          <div class=\"w3-right paragraph\">CARRINHO</div>"
      +"          <img class=\"w3-image imgSacola w3-right\" src = \"img/sacola.png\" alt =\"imagem da sacola\"/>"
      +"        </a>"
      +"    </header>"
      +
      "    <div class=\"w3-bar w3-black\">"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\" onclick=\"loadAgendamento()\">AGENDAMENTO</a>"
      +
      "      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\"  onclick=\"loadMain()\"><span>LOJA</span></a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small w3-teal w3-padding-small w3-right\"  >Bem Vindo ' "+nome+" '</a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right\" onclick=\"loadMinhaConta()\" >MEUS DADOS</a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right\"  onclick=\"loadSobreNos()\">SOBRE NÓS</a>"
      +"    </div>"
      +"    <div class=\"w3-bar w3-black\">"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button   w3-hover-teal w3-padding-small\" onclick=\"loadAgendamento()\"><i class=\"fa fa-calendar-plus-o\"></i></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small\"  onclick=\"loadMain()\"><span><i class=\"fa fa-home\"></i></span></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button w3-teal w3-padding-small w3-right\"> ' "+nome+" '</a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right\" onclick=\"loadMinhaConta()\" ><i class=\"fa fa-user-circle\"></i></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right\"  onclick=\"loadSobreNos()\"> <i class=\"fa fa-info-circle\"></i></a>"
      +"    </div>"
      +"    <div class=\"w3-display-container w3-animate-opacity mainBG\">"
      +"      <div class=\"w3-center w3-hide-small\">"
      +"        <a href=\"#loja\" onclick=\"loadMain()\"><img id = \"logoimg\" src = \"img/aa2.png\" alt = \"logo\"/></a>"
      +"      </div>"
      +"      <div class=\"w3-center w3-hide-small\">"
      +"        <a href=\"#loja\" onclick=\"loadMain()\"><img id = \"nome\" src = \"img/logo.png\" alt = \"logo\"/></a>"
      +"      </div>"
      +"      <div class=\"w3-center w3-hide-large w3-hide-medium\">"
      +"        <a href=\"#loja\" onclick=\"loadMain()\"><img id = \"nome2\" src = \"img/logo.png\" alt = \"logo\"/></a>"
      +"      </div>"
      +
      "      <div class=\"w3-bar w3-center\">"
      +"        <a href=\"#\" class=\"w3-center centerMenu2 w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-center w3-white\" onclick=\"loadShop(\'cachorro\', \'alimento\'); w3_open();\">CACHORROS</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'gato\', \'alimento\')\">GATOS</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'passaro\', \'alimento\')\">PÁSSAROS</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'roedor\', \'alimento\')\">ROEDORES</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'outro\', \'alimento\')\">OUTROS</a>"
      +"        <input type=\"text\" class=\"w3-bar w3-input w3-padding-small  w3-hide-small\" placeholder=\"Procurar..\">"
      +"        <a href=\"#\" class=\" w3-button w3-teal w3-padding-small w3-center w3-hide-small\"><i class=\" fa fa-search\"></i></a>"
      +"        <a href=\"javascript:void(0)\" class=\"w3-hover-teal w3-padding-small w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium w3-black\" onclick=\"showMenu2Mobile()\">&#9776;</a>"
      +"      </div>"
      +
      "      <div id=\"menu2Mobile\" class=\"w3-bar-block w3-light-gray w3-hide w3-hide-large w3-hide-medium\">"
      +
      "        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'cachorro\', \'alimento\'); w3_open();\">CACHORROS</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small \" onclick=\"loadShop(\'gato\', \'alimento\')\">GATOS</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'passaro\', \'alimento\')\">PÁSSAROS</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'roedor\', \'alimento\')\">ROEDORES</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'outro\', \'alimento\')\">OUTROS</a>"
      +"        <a href=\"#\" class=\" w3-bar-item w3-button w3-padding-small w3-right \">"
      +"        <input type=\"text\" class=\"w3-left w3-input w3-padding-small\" placeholder=\"Procurar..\">"
      +"        Buscar<i class=\"fa fa-search w3-margin-left\" ></i>"
      +"        </a>"
      +"      </div>"
      +"    </div>";
  }
  else if(admin == 1){
    data = "<header class = \"w3-row w3-gray\">"
      +"      <div class=\"w3-left\">"
      +"        <div class=\"paragraph\"><b>FRETE GRÁTIS</b> NAS COMPRAS ACIMA DE R$ 300 | PARCELE EM ATÉ <b>6X SEM JUROS</b></div>"
      +"      </div>"
      +"        <a href=\"#carr\" onclick=\"loadCarrinho()\">"
      +"          <div class=\"w3-right paragraph\">CARRINHO</div>"
      +"          <img class=\"w3-image imgSacola w3-right\" src = \"img/sacola.png\" alt =\"imagem da sacola\"/>"
      +"        </a>"
      +"    </header>"
      +
      "    <div class=\"w3-bar w3-black\">"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\" onclick=\"loadAgendamento()\">AGENDAMENTO</a>"
      +
      "      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\"  onclick=\"loadMain()\"><span>LOJA</span></a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\"  onclick=\"document.getElementById(\'id05\').style.display=\'block\'\"><span>CADASTRAR PRODUTO</span>"
      +"      </a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\"  onclick=\"document.getElementById(\'id06\').style.display=\'block\'\"><span>CADASTRAR SERVICO</span></a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\"  onclick=\"document.getElementById(\'id08\').style.display=\'block\'\"><span>CADASTRAR ADMIN</span></a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small\"  onclick=\"loadVendas()\"><span>VENDAS</span></a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-padding-small w3-teal w3-right\"> Bem vindo "+nome+" </a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right\" onclick=\"loadMinhaConta()\" >MEUS DADOS</a>"
      +"      <a href=\"#\" class=\"w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right\"  onclick=\"loadSobreNos()\">SOBRE NÓS</a>"
      +"    </div>"
      +"    <div class=\"w3-bar w3-black\">"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button   w3-hover-teal w3-padding-small\" onclick=\"loadAgendamento()\"><i class=\"fa fa-calendar-plus-o\"></i></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small\"  onclick=\"loadPage(\'ajax/servicos.html\', \'serv\')\"><span><i class=\"fa fa-calendar\"></i></span></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small\"  onclick=\"loadMain()\"><span><i class=\"fa fa-home\"></i></span></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-teal w3-right\">"+nome+" </a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right\" onclick=\"loadMinhaConta()\" ><i class=\"fa fa-user-circle\"></i></a>"
      +"      <a href=\"#\" class=\"w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right\"  onclick=\"loadSobreNos()\"> <i class=\"fa fa-info-circle\"></i></a>"
      +"    </div>"
      +"    <div class=\"w3-display-container w3-animate-opacity mainBG\">"
      +"      <div class=\"w3-center w3-hide-small\">"
      +"        <a href=\"#loja\" onclick=\"loadMain()\"><img id = \"logoimg\" src = \"img/aa2.png\" alt = \"logo\"/></a>"
      +"      </div>"
      +"      <div class=\"w3-center w3-hide-small\">"
      +"        <a href=\"#loja\" onclick=\"loadMain()\"><img id = \"nome\" src = \"img/logo.png\" alt = \"logo\"/></a>"
      +"      </div>"
      +"      <div class=\"w3-center w3-hide-large w3-hide-medium\">"
      +"        <a href=\"#loja\" onclick=\"loadMain()\"><img id = \"nome2\" src = \"img/logo.png\" alt = \"logo\"/></a>"
      +"      </div>"
      +
      "      <div class=\"w3-bar w3-center\">"
      +"        <a href=\"#\" class=\"w3-center centerMenu2 w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-center w3-white\" onclick=\"loadShop(\'cachorro\', \'alimento\'); w3_open();\">CACHORROS</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'gato\', \'alimento\')\">GATOS</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'passaro\', \'alimento\')\">PÁSSAROS</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'roedor\', \'alimento\')\">ROEDORES</a>"
      +"        <a href=\"#\" class=\"w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white\" onclick=\"loadShop(\'outro\', \'alimento\')\">OUTROS</a>"
      +"        <input type=\"text\" class=\"w3-bar w3-input w3-padding-small  w3-hide-small\" placeholder=\"Procurar..\">"
      +"        <a href=\"#\" class=\" w3-button w3-teal w3-padding-small w3-center w3-hide-small\"><i class=\" fa fa-search\"></i></a>"
      +"        <a href=\"javascript:void(0)\" class=\"w3-hover-teal w3-padding-small w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium w3-black\" onclick=\"showMenu2Mobile()\">&#9776;</a>"
      +"      </div>"
      +
      "      <div id=\"menu2Mobile\" class=\"w3-bar-block w3-light-gray w3-hide w3-hide-large w3-hide-medium\">"
      +
      "        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'cachorro\', \'alimento\'); w3_open();\">CACHORROS</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small \" onclick=\"loadShop(\'gato\', \'alimento\')\">GATOS</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'passaro\', \'alimento\')\">PÁSSAROS</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'roedor\', \'alimento\')\">ROEDORES</a>"
      +"        <a href=\"#\" class=\"w3-bar-item w3-button  w3-hover-teal w3-padding-small\" onclick=\"loadShop(\'outro\', \'alimento\')\">OUTROS</a>"
      +"        <a href=\"#\" class=\" w3-bar-item w3-button w3-padding-small w3-right \">"
      +"        <input type=\"text\" class=\"w3-left w3-input w3-padding-small\" placeholder=\"Procurar..\">"
      +"        Buscar<i class=\"fa fa-search w3-margin-left\" ></i>"
      +"        </a>"
      +"      </div>"
      +"    </div>";
  }
  res.end(data);
})

app.get('/index.html+', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  let data = fs.readFileSync('index.html');

  res.end(data);
})

app.get('/main', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  let data = "<div id=\"petShop\" >"
  +"  <br><br><br><br>"
  +"  <div class=\"w3-ontainer w3-padding-32 w3-hide-small\"></div>"
  +"    <div class = \"cat w3-container\">"
  +
      "      <div class=\"w3-content w3-display-container slides\">"
  +"        <img class=\"mySlides\" src=\"img/banner2.jpg\" >"
  +"        <img class=\"mySlides\" src=\"img/banner13.jpg\" >"
  +"        <img class=\"mySlides\" src=\"img/banner12.jpg\" >"
  +"        <img class=\"mySlides\" src=\"img/banner11.jpg\" >"
  +"        <img class=\"mySlides\" src=\"img/banner7.jpg\" >"
  +"        <img class=\"mySlides\" src=\"img/banner10.jpg\" >"
  +
      "        <button class=\"w3-button w3-black w3-display-left\" onclick=\"plusDivs(-1)\">&#10094;</button>"
  +"        <button class=\"w3-button w3-black w3-display-right\" onclick=\"plusDivs(1)\">&#10095;</button>"
  +"      </div>"
  +
      "    </div>"
  +

      "    <div id = \"maisvendidos\" class=\"w3-center w3-container\">"
  +"        <h3 class = \"titulo\"><span>MAIS BUSCADOS</span></h3>"
  +
      "<div id=\"loadMaisVendidos\">"
  +

      "  <div class=\"w3-row w3-center\" id = \"selection\">"
  +"  <div class=\"w3-row w3-center\" id = \"selection\"> <div class=\"w3-container w3-col seta\" ><a href=\"#prev\" onclick=\'loadMaisVendidos(\"prev\")\'><img class = \"w3-image imgSeta\" src = \"img/back.png\" alt = \"Seta apontando para antes\"/></a></div>"
  +"  ";

  nano.use("valedospets").view("meusProdutos", "produtos_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      //console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(1 == body.rows[i].key){
          prod = body.rows[i].value;
          data+= "  <div class = \" w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido\">"
            +"    <a href=\"#prod\" onclick=\'loadProdDescription(1)\'>"
            +"        <img class = \"w3-image imagemMaisVendido\" src = \" img/"+prod.foto+"\" alt = \"Ração\"/>"
            +"          <div class=\"w3-display-container w3-black w3-hover-teal contDescr\">"
            +"          "+prod.nome+"<br>"
            +"          <b>R$ "+prod.preco+"</b>"
            +"          </div>"
            +
            "    </a>"
            +"  </div>";
        }else if(2 == body.rows[i].key){
          prod = body.rows[i].value;
          data+= "  <div class = \" w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido\">"
            +"    <a href=\"#prod\" onclick=\'loadProdDescription(2)\'>"
            +"        <img class = \"w3-image imagemMaisVendido\" src = \" img/"+prod.foto+"\" alt = \"Ração\"/>"
            +"          <div class=\"w3-display-container w3-black w3-hover-teal contDescr\">"
            +"          "+prod.nome+"<br>"
            +"          <b>R$ "+prod.preco+"</b>"
            +"          </div>"
            +
            "    </a>"
            +"  </div>";
        }else if(3 == body.rows[i].key){
          prod = body.rows[i].value;
          data+= "  <div class = \" w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido\">"
            +"    <a href=\"#prod\" onclick=\'loadProdDescription(3)\'>"
            +"        <img class = \"w3-image imagemMaisVendido\" src = \" img/"+prod.foto+"\" alt = \"Ração\"/>"
            +"          <div class=\"w3-display-container w3-black w3-hover-teal contDescr\">"
            +"          "+prod.nome+"<br>"
            +"          <b>R$ "+prod.preco+"</b>"
            +"          </div>"
            +
            "    </a>"
            +"  </div>";
        }else if(4 == body.rows[i].key){
          prod = body.rows[i].value;
          data+= "  <div class = \" w3-container w3-col w3-animate-right w3-card-4 w3-white  prodMaisVendido\">"
            +"    <a href=\"#prod\" onclick=\'loadProdDescription(4)\'>"
            +"        <img class = \"w3-image imagemMaisVendido\" src = \" img/"+prod.foto+"\" alt = \"Ração\"/>"
            +"          <div class=\"w3-display-container w3-black w3-hover-teal contDescr\">"
            +"          "+prod.nome+"<br>"
            +"          <b>R$ "+prod.preco+"</b>"
            +"          </div>"
            +
            "    </a>"
            +"  </div>";
        }
      }
    }
    data += "  <div class=\"w3-container w3-col  w3-image seta\">"
      +"  <a href=\"#next\" onclick=\'loadMaisVendidos(\"next\")\'>"
      +"    <img class = \"w3-image imgSeta\" src = \" img/next.png\" alt = \"Seta apontando para antes\"/>"
      +"  </a>"
      +"</div>"
      +"</div>"
      +"  </div>"
      +

      "    <h3 class = \"titulo\"><span>CONFIRA TAMBEM:</span></h3>"
      +
      "        <a href=\"#\" onclick=\'loadDestaques(\"dataCadastro\", \"DESC\")\' class=\"destaques\">"
      +"    <div class=\"w3-display-container w3-margin w3-yellow w3-padding w3-card-4\" >"
      +"      <div class=\"w3-quarter w3-container\">"
      +"        <img id = \"imgDestaque1\" class=\"w3-image\" src = \"img/rabbitpng.png\" alt = \"Gato mostrando a patinha\"/>"
      +"      </div>"
      +"      <div class=\"w3-panel w3-rest\" >"
      +"        <h1 class=\"w3-text-white destaquesText\">"
      +"          <b>Novidades</b></h1>"
      +"      </div>"
      +"      <div class=\"w3-display-right w3-margin w3-padding w3-display-hover w3-large\">"
      +"        <img id = \"imgCute\" class=\"w3-image\" src = \"img/catcute.png\" alt = \"Gato mostrando a patinha\"/>"
      +"      </div>"
      +"    </div>"
      +"    </a>"
      +"    <br>"
      +"    <a href=\"#\" onclick=\'loadDestaques(\"preco\", \"ASC\")\' class=\"destaques\">"
      +"    <div class=\"w3-display-container w3-margin w3-lime w3-padding w3-card-4\" >"
      +"      <div class=\"w3-quarter w3-container\">"
      +"        <img id = \"imgDestaque1\" class=\"w3-image\" src = \"img/birdpng.png\" alt = \"Gato mostrando a patinha\"/>"
      +"      </div>"
      +"      <div class=\"w3-panel w3-rest\" >"
      +"        <h1 class=\"w3-text-white destaquesText\">"
      +"          <b>Mais Baratos</b></h1>"
      +"      </div>"
      +"      <div class=\"w3-display-right w3-margin w3-padding w3-display-hover w3-large\">"
      +"        <img id = \"imgCute\" class=\"w3-image\" src = \"img/dogcute.png\" alt = \"Gato mostrando a patinha\"/>"
      +"      </div>"
      +"    </div>"
      +"    </a>"
      +"      <br>"
      +
      "    <a href=\"#\" onclick=\'loadDestaques(\"qtdV\", \"DESC\")\' class=\"\">"
      +"    <div class=\"w3-display-container w3-margin w3-khaki w3-padding w3-card-4\" >"
      +"      <div class=\"w3-quarter w3-container\">"
      +"        <img id = \"imgDestaque1\" class=\"w3-image\" src = \"img/peixepng.png\" alt = \"Gato mostrando a patinha\"/>"
      +"      </div>"
      +"      <div class=\"w3-panel w3-rest\" >"
      +"        <h1 class=\"w3-text-white destaquesText\">"
      +"          <b>Mais Vendidos</b></h1>"
      +"      </div>"
      +"      <div class=\"w3-display-right w3-margin w3-padding w3-display-hover w3-large\">"
      +"        <img id = \"imgCute\" class=\"w3-image\" src = \"img/hamster.png\" alt = \"Gato mostrando a patinha\"/>"
      +"      </div>"
      +"    </div>"
      +"    </a>"
      +
      "    <div class=\"w3-container w3-center\">"
      +"      <div class=\"w3-container fraseContainer w3-center\">"
      +"        <div class=\"w3-quarter w3-container\">"
      +"          <img id = \"imgDestaque2\" class=\"w3-image\" src = \"img/lovepet.PNG\" alt = \"Gato mostrando a patinha\"/>"
      +"        </div>"
      +"        <div class=\"w3-panel w3-rest\" >"
      +"          <h1 class=\"w3-text-black frase\">"
      +"            <cite>\"Se quiser aprender a amar, comece com os animais ... eles são mais sensíveis.\"</cite></h1>"
      +"        </div>"
      +"      </div>"
      +"      </div>"
      +"	  "
      +"	  <footer>"
      +"        <p>Trabalho de WEB</p>"
      +
      "        <p>Adriller, Matheus, Rita, Allan, Hikaro</p>"
      +

      "    </footer>"
      +"    </div>"
      +"</div>";
    res.end(data);
  })

})

app.post('/login', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  var email = req.body.usrname;
  var senha = req.body.psw;
  let data = "";
  nano.use("valedospets").view("meusClientes", "clientes_by_email", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        console.log(email);
        if(email == body.rows[i].key){
          console.log("found!\nnome= " +  body.rows[i].value.nome);
          if(senha == body.rows[i].value.senha){
            data = '{"UserName":"'+body.rows[i].value.nome+'", "UserAdmin":'+body.rows[i].value.eAdmin+', "UserEmail":"'+email+'"}';
          }
        }
      }
      if (data == ""){
        data = "<p id='alert'>Erro: Credenciais Invalidas</p>";
      }
      res.end(data);
    }
  });
})

app.post('/register', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to register;")
  var email = req.body.email;
  var senha = req.body.senha;
  var nome = req.body.nome;
  var foto = req.body.foto;
  var sexo = req.body.sexo;
  var telefone = req.body.telefone;
  let data = "";
  addClienteBD(++currentID, nome, email, telefone, senha, sexo, foto, 0);
  res.end("sucesso");
})

app.post('/registroProduto', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to register prod")
  var precoProd = req.body.preco;
  var nomeProd = req.body.nome;
  var tipoProd = req.body.tipo;
  var animalProd = req.body.animal;
  var descricaoProd = req.body.descricao;
  var qtdEProd = req.body.qtdE;
  var qtdVProd = req.body.qtdV;
  var fotoProd = req.body.foto;
  addProdutoBD(++currentID, precoProd, nomeProd, tipoProd, animalProd, descricaoProd, qtdEProd, qtdVProd, fotoProd);
  res.end("sucesso");
})

app.post('/loja', function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  var tipo = req.body.tipo;
  var animal = req.body.animal;
  console.log("request for loja: " + animal + " " +tipo);
  let data = '<br><br><br><br><br><div class="w3-ontainer w3-padding-32 w3-hide-small"></div><button class="w3-button w3-teal w3-xlarge w3-hide-large  w3-black" id="openNav" onclick="w3_open()">&#9776;</button><div class="w3-sidebar w3-bar-block w3-collapse w3-card-2 w3-animate-left w3-light-gray" style="width:250px;display:none;" id="mySidebar" onclick="w3_close()"><button class="w3-bar-item w3-button w3-large w3-hide-large" onclick="w3_close()">Close &times;</button><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''+animal+'\', \'alimento\')">Alimentos</a><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''+animal+'\', \'casa\')">Casinha</a><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''+animal+'\', \'saude\')">Saude e Higiene</a><a href="#" class="w3-bar-item w3-button w3-hover-teal" onclick="loadShop(\''+animal+'\', \'outro\')">Outros</a></div><div class="w3-main" id="prodContainer">';


  nano.use("valedospets").view("meusProdutos", "produtos_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        console.log(body.rows[i].value.tipo + " " + body.rows[i].value.animal);
        if(body.rows[i].value.tipo == tipo && body.rows[i].value.animal == animal){

          data += '<a href="#prod" onclick=\'loadProdDescription(' +body.rows[i].value.produtoID+ ')\'>' +
            '<div class = "cao-produto"> ' +
            '<img class = "w3-image cao-image" src = "img/' +body.rows[i].value.foto+ '" alt = "Ração"/> ' +
            '<div class="cao-container"> ' +
            '<p class = "descricao">' +body.rows[i].value.nome+
            '<br><span class = "descricao">'  +body.rows[i].value.tipo+ '</span><br><span class = "preco">R$' + body.rows[i].value.preco+'</span>' +
            '</p> ' +
            '</div> ' +
            '</div>' +
            '</a>';

          console.log(data);
        }
      }
      data += '</div>';
      res.end(data);
    }
  });

})

app.post('/descricao', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  var id = req.body.id;
  var eAdmin = req.body.eAdmin;
  console.log("request for descricao: " + id);
  let data = '<div id="descr-bg">'+
      '<div class="w3-ontainer w3-padding-32 w3-hide-small"></div>'+
      '<br><br><br><br><br>'+
      '<div class=" produtoHeader w3-cell-row ">'+
      '<div class="w3-container w3-cell w3-center w3-mobile w3-margin-bottom">'+
      '<img class = "cao-image" src = " img/';


  nano.use("valedospets").view("meusProdutos", "produtos_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        console.log(body.rows[i].value.tipo + " " + body.rows[i].value.animal);
        if(body.rows[i].key == id){

          data += body.rows[i].value.foto+
            '"alt = "Ração"/>'+
            '</div>'+
            '<div class="w3-cell descHeader w3-center w3-black w3-padding w3-mobile">'+
            '<br>'+
            '<h1>'+
            body.rows[i].value.nome+
            '<br></h1>'+
            '<h3>Tipo: '+
            body.rows[i].value.tipo+
            '</h3>'+
            '<h3>Para: '+
            body.rows[i].value.animal+
            '</h3>'+
            '<h3>Preço: R$'+
            body.rows[i].value.preco+
            '</h3><br><br>'+
            '<a id="btnDesc" type="button" class="w3-hover-white w3-teal" href="#" onclick=\'Comprar(' +body.rows[i].value.produtoID+',"'+ body.rows[i].value.foto+'"'+ ',"'+ body.rows[i].value.descricao+'",'+ body.rows[i].value.preco+', '+ body.rows[i].value.qtdE+')\'>Comprar</a>';
          if(eAdmin == 1){
            data += '<a id="btnDesc" type="button" class="w3-hover-white w3-yellow" href="#" onclick="editarProd(' +
              body.rows[i].value.produtoID+', \''+body.rows[i].value.nome+'\', \''+body.rows[i].value.descricao+
              '\', \''+body.rows[i].value.tipo+'\', \''+body.rows[i].value.animal+'\', '+body.rows[i].value.preco+
              ', '+body.rows[i].value.qtdE+', '+body.rows[i].value.fotoqtdV+', \''+body.rows[i].value.foto+
              '\');return false;">Editar</a>';
          }
          data += '<br>'+
            '</div>'+
            '</div>'+
            '<div class="w3-container descr-item2 w3-light-gray">'+
            '<h2>Descrição</h2>'+
            '<p>'+
            body.rows[i].value.descricao+
            ' </p>' +
            '</div>'+
            '<div class="w3-container  w3-center relIA w3-black">'+
            '<h2>Quem viu esse, tambem comprou:</h2>'+
            '    <div class="w3-row">'
          nano.use("valedospets").view("meusProdutos", "produtos_by_id", function (err, body, header) {
            if(err){
              console.log("Erro ao conectar a view");
            }else{
              //console.log(JSON.stringify(body));
              for(var i = 0 ; i < body.total_rows ; i++){
                if(1 == body.rows[i].key){
                  prod = body.rows[i].value;
                  data+= '<a href="#prod" onclick=\'loadProdDescription(' +body.rows[i].value.produtoID+ ')\'>'+
                    '<div class="w3-col prodRec w3-hover-teal">'+
                    '            <img class = " w3-image image-recomend" src = " img/'+body.rows[i].value.foto+'" alt = "Pote para ração"/>'+
                    '            <div class="w3-container recomend-container w3-center w3-white ">'+
                    '                '+body.rows[i].value.descricao+'<br>Para:'+body.rows[i].value.animal+'<br>R$'+body.rows[i].value.preco+''+
                    '            </div>'+
                    '            <div class="w3-container cao-container2 w3-center">'+
                    '                <p class = "ver">Ver<br></p>'+
                    '            </div>'+
                    '        </div> </a>';
                }else if(2 == body.rows[i].key){
                  prod = body.rows[i].value;
                  data+= '<a href="#prod" onclick=\'loadProdDescription(' +body.rows[i].value.produtoID+ ')\'>'+
                    '<div class="w3-col prodRec w3-hover-teal">'+
                    '            <img class = " w3-image image-recomend" src = " img/'+body.rows[i].value.foto+'" alt = "Pote para ração"/>'+
                    '            <div class="w3-container recomend-container w3-center w3-white ">'+
                    '                '+body.rows[i].value.descricao+'<br>Para:'+body.rows[i].value.animal+'<br>R$'+body.rows[i].value.preco+''+
                    '            </div>'+
                    '            <div class="w3-container cao-container2 w3-center">'+
                    '                <p class = "ver">Ver<br></p>'+
                    '            </div>'+
                    '        </div> </a>';
                }else if(3 == body.rows[i].key){
                  prod = body.rows[i].value;
                  data+= '<a href="#prod" onclick=\'loadProdDescription(' +body.rows[i].value.produtoID+ ')\'>'+
                    '<div class="w3-col prodRec w3-hover-teal">'+
                    '            <img class = " w3-image image-recomend" src = " img/'+body.rows[i].value.foto+'" alt = "Pote para ração"/>'+
                    '            <div class="w3-container recomend-container w3-center w3-white ">'+
                    '                '+body.rows[i].value.descricao+'<br>Para:'+body.rows[i].value.animal+'<br>R$'+body.rows[i].value.preco+''+
                    '            </div>'+
                    '            <div class="w3-container cao-container2 w3-center">'+
                    '                <p class = "ver">Ver<br></p>'+
                    '            </div>'+
                    '        </div> </a>';
                }else if(4 == body.rows[i].key){
                  prod = body.rows[i].value;
                  data+= '<a href="#prod" onclick=\'loadProdDescription(' +body.rows[i].value.produtoID+ ')\'>'+
                    '<div class="w3-col prodRec w3-hover-teal">'+
                    '            <img class = " w3-image image-recomend" src = " img/'+body.rows[i].value.foto+'" alt = "Pote para ração"/>'+
                    '            <div class="w3-container recomend-container w3-center w3-white ">'+
                    '                '+body.rows[i].value.descricao+'<br>Para:'+body.rows[i].value.animal+'<br>R$'+body.rows[i].value.preco+''+
                    '            </div>'+
                    '            <div class="w3-container cao-container2 w3-center">'+
                    '                <p class = "ver">Ver<br></p>'+
                    '            </div>'+
                    '        </div> </a>';
                }
              }
              data += '                </div>'+
                '            </div>'+
                '    </div>';
              res.end(data);
            }
          })
        }

      }
    }
  });

})

app.post('/registroVenda', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to register venda")
  var email = req.body.email;
  var produtos = req.body.produtos;
  let data = "";
  addVendaBD(++currentID, email, produtos);
  console.log("Produtos comprados = " + produtos);
  produtos = JSON.parse(produtos);

  console.log("produto qtd = " + produtos[0].qtd);
  res.end(""+currentID);
})

app.post('/minhaConta', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to minha conta");
  var email = req.body.email;
  var notFound = 1;
  var continuar = 0;
  var naotempet = 1;
  let data = "<br><br><br><br>"
  +"  <div class=\"w3-ontainer w3-padding-32 w3-hide-small\"></div>"
  +
      "  <div id=\'containerConta\' class=\"w3-light-gray w3-container \">"
  +"    <div class=\"w3-container w3-white minhaConta\">"
  +"      <label class=\"titleConta w3-margin-left\">Minha Conta</label>"
  +"      <div class=\"w3-center w3-container ContaHist w3-margin\">"
  +"        Historico de Pedidos"
  +"		";

  nano.use("valedospets").view("minhasVendas", "vendas_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(email == body.rows[i].value.email){
          notFound = 0;
          data += "<div class=\"contentHist w3-container w3-border \">"
            +"          Codigo:"+body.rows[i].key+"<br><br>"
            +"          Itens comprados:<br>";

          console.log(JSON.stringify(body.rows[i].value.produtos));
          var prods = JSON.stringify(body.rows[i].value.produtos);
          prods = JSON.parse(prods);
          console.log("oi");

          for(var j = 0 ; j < prods.length ; j++){
            data+= '<div class="histItem w3-container w3-row">'
              +'                <div class="cartProdImg w3-container w3-col">'
              +'                    <img class = "cartImg w3-image" src = "img/'+prods[j].foto+'" alt = "Ração"/>'
              +'                </div>'
              +'              <div class="cartDescr w3-col w3-container">'+prods[j].desc+'</div>'
              +'                <div class="cartQtd w3-container w3-col">'+prods[j].qtd+' </div>'
              +'                <div class="cartPreco w3-container w3-col">R$'+prods[j].preco+' </div>'
              +'            </div>'
          }

          data += '</div>'

        }
      }
      if(notFound == 1)
        data += '<br>Nenhuma compra efetuada';
      data += '</div>';
      res.end(data);

    }
  })
})

app.post('/meusPets', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  var email = req.body.email;
  var naotempet = 1;
  let data = '<span style="font-size:4vmin;text-align:center">Meus Pets</span> <div class="w3-container">';
  nano.use("valedospets").view("meusPets", "pets_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(email == body.rows[i].value.email){
          data +='<div class="escolherPet w3-margin">'
            +'        <a href="#" id="selection" onclick="return false;"><img class="w3-image offCalend" id="pet'+body.rows[i].value.petID+'" src="img/'+body.rows[i].value.foto+'" /></a>'
            +'      </div>';
          naotempet = 0;
        }
      }
      if(naotempet == 1){
        data+= '<span style="font-size:2vmin">Voce ainda nao possui PETs cadastrados. Por favor, cadastre.</span>';
      }

      data += '</div><br><a id="btnMain" class="w3-hover-gray w3-teal w3-center" href="#cadpet" onclick="cadastrarContaPET()"> Cadastrar novo PET</a> <br><br><br></div></div>';
      res.end(data);
    }

  });
})

app.get('/vendas', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to vendas");
  var totalVendas = 0;
  let data = '<br><br><br><br>'
  +'  <div class="w3-ontainer w3-padding-32 w3-hide-small"></div>'
  +
      '  <div id=\'containerConta\' class="w3-light-gray w3-container ">'
  +'    <div class="w3-container w3-white minhaConta">'
  +'      <label class="titleConta w3-margin-left">Vendas</label>'
  +'      <div class="w3-center w3-container ContaHist w3-margin">'
  +'        Historico de Vendas<br><br>'
  +'        Compras de produtos<br>';

  nano.use("valedospets").view("minhasVendas", "vendas_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));

      for(var i = 0 ; i < body.total_rows ; i++){
        data += '<div class="contentHist w3-container w3-border ">Cliente: '+body.rows[i].value.email+'<br>Codigo:'+body.rows[i].value.vendaID+'<br><br>Itens comprados:<br>';

        var prods = JSON.stringify(body.rows[i].value.produtos);
        prods = JSON.parse(prods);
        for(var j = 0 ; j < prods.length ; j++){
          data += '<div class="histItem w3-container w3-row"><div class="cartProdImg w3-container w3-col"><img class = "cartImg w3-image" src = "img/'+prods[j].foto+'" alt = "Ração"/></div><div class="cartDescr w3-col w3-container">'+prods[j].desc+'</div><div class="cartQtd w3-container w3-col">'+prods[j].qtd+' </div><div class="cartPreco w3-container w3-col">R$'+prods[j].preco+' </div></div>';
          totalVendas += prods[j].preco * prods[j].qtd;
        }
        data += '</div>';
      }
      data += 'Total em vendas de Produtos = '+totalVendas+' <br></div></div> </div>';
      res.end(data);
    }
  });

})

app.post('/registroPet', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to reg pet");
  var nomeP = req.body.nome;
  var emailP = req.body.donoEmail;
  var racaP = req.body.raca;
  var idadeP = req.body.idade;
  var permP = req.body.perm;
  var fotoP = req.body.foto;
  let data = "sucesso";
  addPetBD(++currentID, nomeP, emailP, racaP, idadeP, permP, fotoP);
  res.end(data);
})

app.post('/registroServico', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to minha conta");
  var email = req.body.email;
  let data = "";

  res.end(data);
})

app.post('/registroAgendamento', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to minha conta");
  var email = req.body.email;
  let data = "";

  res.end(data);
})

app.post('/registroAdmin', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Content-Type", "text/html");
  console.log("got a request to register admin")
  var email = req.body.email;
  var senha = req.body.senha;
  var nome = req.body.nome;
  var foto = req.body.foto;
  var sexo = req.body.sexo;
  var telefone = req.body.telefone;
  let data = "";
  addClienteBD(++currentID, nome, email, telefone, senha, sexo, foto, 1);
  res.end("sucesso");
})

function addProdutoBD(currID, precoProd, nomeProd, tipoProd, animalProd, descricaoProd, qtdEProd, qtdVProd, fotoProd){
  var produto = {
    produtoID: currID,
    nome: nomeProd,
    preco: precoProd,
    tipo: tipoProd,
    animal: animalProd,
    descricao: descricaoProd,
    qtdE: qtdEProd,
    qtdV: qtdVProd,
    foto: fotoProd
  };
  nano.use("valedospets").insert(produto, produto.produtoID, function(err, body, header) {
    if(err) {
      console.log("Inserting prod failed. " + err + "\n");
    } else {
      console.log("incr id = " + currID);
      console.log("prod inserted. Response: " + JSON.stringify(body) + "\n");
    }
  });
}

function addVendaBD(currID, emailCli, produtosComprados){
  var venda = {
    vendaID: currID,
    email: emailCli,
    produtos : JSON.parse(produtosComprados)
  };

  nano.use("valedospets").insert(venda, venda.vendaID, function(err, body, header) {
    if(err) {
      console.log("Inserting venda failed. " + err + "\n");
    } else {
      console.log("incr id = " + currID);
      console.log("venda inserted. Response: " + JSON.stringify(body) + "\n");
    }
  });

}

function addClienteBD(currID, nomeCli, emailCli, telCli, senhaCli, sexoCli, fotoCli, eAdmin){
  var cliente = {
    id: currID,
    nome: nomeCli,
    email: emailCli,
    telefone: telCli,
    senha: senhaCli,
    sexo: sexoCli,
    foto: fotoCli,
    eAdmin: eAdmin
  };

  nano.use("valedospets").insert(cliente, cliente.id, function(err, body, header) {
    if(err) {
      console.log("Inserting cliente failed. " + err + "\n");
    } else {
      console.log("incr id = " + currID);
      console.log("cliente inserted. Response: " + JSON.stringify(body) + "\n");
    }
  });
}

function addPetBD(currID, nomeP, emailP, racaP, idadeP, permP, fotoP){
  var pet = {
    petID: currID,
    nome: nomeP,
    email: emailP,
    raca: racaP,
    idade: idadeP,
    perm: permP,
    foto: fotoP
  };

  nano.use("valedospets").insert(pet, pet.petID, function(err, body, header) {
    if(err) {
      console.log("Inserting cliente failed. " + err + "\n");
    } else {
      console.log("incr id = " + currID);
      console.log("pet inserted. Response: " + JSON.stringify(body) + "\n");
    }
  });
}

function createProdutoView(){
  var prod;
  nano.use("valedospets").insert(
    { "views":
     { "produtos_by_id":
      {
        "map": "function (doc) { if(doc.produtoID) { emit (doc.produtoID, doc); } }"
      }
     }
    }, '_design/meusProdutos', function (error, response) {
      if (error) {
        console.log("view creation failed. " + error + "\n");
      } else {
        console.log("view produtos criada");
      }
    });
}

function createClientesView(){
  var prod;
  nano.use("valedospets").insert(
    { "views":
     { "clientes_by_email":
      {
        "map": "function (doc) { if(doc.email) { emit (doc.email, doc); } }"
      }
     }
    }, '_design/meusClientes', function (error, response) {
      if (error) {
        console.log("view creation failed. " + error + "\n");
      } else {
        console.log("view clientes criada");
      }
    });
}

function createPetsView(){
  var prod;
  nano.use("valedospets").insert(
    { "views":
     { "pets_by_id":
      {
        "map": "function (doc) { if(doc.petID) { emit (doc.petID, doc); } }"
      }
     }
    }, '_design/meusPets', function (error, response) {
      if (error) {
        console.log("view creation failed. " + error + "\n");
      } else {
        console.log("view pets criada");
      }
    });
}

function createVendasView(){
  nano.use("valedospets").insert(
    { "views":
     { "vendas_by_id":
      {
        "map": "function (doc) { if(doc.vendaID) { emit (doc.vendaID, doc); } }"
      }
     }
    }, '_design/minhasVendas', function (error, response) {
      if (error) {
        console.log("view creation failed. " + error + "\n");
      } else {
        console.log("view vendas criada");
      }
    });
}

function queryProduto(produtoID){
  nano.use("valedospets").view("meusProdutos", "produtos_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(produtoID == body.rows[i].key){

          prod = body.rows[i].value;
          console.log("found!\nnome= " +  prod.nome);
          return true;
        }
      }
    }
  });
}

function queryCliente(clienteID){
  nano.use("valedospets").view("meusClientes", "clientes_by_email", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(clienteID == body.rows[i].key){

          cli = body.rows[i].value;
          console.log("found!\nnome= " +  cli.nome);
          return true;
        }
      }
    }
  });
}

function queryPet(clienteID){
  nano.use("valedospets").view("meusPets", "pets_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(petID == body.rows[i].key){

          pet = body.rows[i].value;
          console.log("found!\nnome= " +  cli.nome);
          return true;
        }
      }
    }
  });
}

function queryVenda(produtoID){
  nano.use("valedospets").view("minhasVendas", "vendas_by_id", function (err, body, header) {
    if(err){
      console.log("Erro ao conectar a view");
    }else{
      console.log(JSON.stringify(body));
      for(var i = 0 ; i < body.total_rows ; i++){
        if(produtoID == body.rows[i].key){

          prod = body.rows[i].value;
          console.log("found!\nnome= " +  prod.nome);
          return true;
        }
      }
    }
  });
}

function iniciarBanco(){
  /*cria o banco*/
  nano.db.destroy('valedospets', function() {
    nano.db.create("valedospets", function (err, body, header) {
      if (err) {
        console.log("Database creation failed. " + err + "\n");
        nano.db.destroy('valedospets');
      } else {
        console.log("Database created. Response: " + JSON.stringify(body) + "\n");
        /*popula o banco*/
        addProdutoBD(1, 14.50, "Racao Royal Canin", "alimento", "cachorro", "racao de qualidade", 5, 11, "racao.jpg");
        addProdutoBD(2, 20, "Racao Whiskas", "alimento", "gato", "Racao enlatada para gatos", 6, 11, "gato-r1.jpg");
        addProdutoBD(3, 50, "Comida peixes", "alimento", "outro", "racao para peixinhos", 10, 11, "outro-r1.jpg");
        addProdutoBD(4, 19.50, "Racao Nutropica", "alimento", "roedor", "racao de qualidade", 20, 11, "roedor-r1.jpg");
        addProdutoBD(5, 28.50, "Sementes Variadas", "alimento", "passaro", "racao de qualidade para passaros", 30, 11, "passaro-r1.jpg");
        addClienteBD(++currentID, "admin", "admin", "000", "admin", "feminino", "aa.jpg", 1);
        createProdutoView();
        createClientesView();
        createVendasView();
        createPetsView();
      }
    });
  });

}

let server = app.listen(3000, ()=>{
  let host = server.address().address
  let port = server.address().port
  iniciarBanco();
  console.log("Listening at http://%s:%s", host, port)
})
