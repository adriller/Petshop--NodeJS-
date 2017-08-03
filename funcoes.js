/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina contem todas as funcoes javascript

-->*/

//variaveis referentes ao slideshow
var inicio = 0;
var bgImgIndex = 0;

//info sobre o usuario logado
var usuarioLogado;

//JSON dos produtos no carrinho
var carrinho = '{"produtos":[]}';

//total da compra
var precototal = 0;

//horario escolhido para agendamento
var horario = -1;

//pet escolhido para o agendamento
var petID = -1;

//redirecionadores de pagina
var goToAgendamento = -1;
var goToMinhaConta = -1;
var editProdId = 0;

//numero de produtos vendidos (começa com 15, mas é atualizada na funcao pegarNumVendas)
var numVendas = 15;


//e utilizada para marcar qual aba da loja esta atualmente selecionada
function refreshNav(){
  $(".navLoja a").on("click", function(){
    $(".navLoja").find(".active").removeClass("active");
    $(this).addClass("active");
  });
}

//carrega a seção de mais vendidos (os 4 itens na tela inicial)
function loadMaisVendidos(x){
  loadMain();
}


//abre e fecha os menus mobile da loja
function w3_open() {
  if($(window).width() < 739){
    document.getElementById("prodContainer").style.marginLeft = "27%";
    document.getElementById("mySidebar").style.width = "25%";
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("openNav").style.display = 'none';
  }
}
function w3_close() {
  document.getElementById("prodContainer").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
}
function showMenu2Mobile() {
  var x = document.getElementById("menu2Mobile");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

function closeMenu2Mobile() {
  var x = document.getElementById("menu2Mobile");
  if (x.className.indexOf("w3-show") > -1) {
    x.className = x.className.replace(" w3-show", "");
  }
}

function hideMenuEffect(){
  var x = document.getElementById("mySidebar");
  if ( $(window).width() > 739 && x.className.indexOf("w3-animate-left") > -1) {
    x.className = x.className.replace("w3-animate-left", "");
  }
  else {
    x.className += "w3-animate-left";
  }
}

//muda o tamanho da secao mais vendidos se for tela pequena
function setMobileImgSize(){
  if ( $(window).width() < 739) {
    $(".prodMaisVendido").height(90);
  }
}

//inicia o slideshow de ofertas
function initDivs(){
  plusDivs(1);
  setTimeout(initDivs, 8000);
}

//incrementa o indice da imagem mostrada no slideshow
function plusDivs(n){
  bgImgIndex += n;

  changebg();
}

//muda o slideshow
function changebg(){

  /*$(".cat").css("background-image", "url(img/bg" + bgImgIndex + ".jpg)");*/

  var x = document.getElementsByClassName("mySlides");

  if(bgImgIndex >= x.length)
    bgImgIndex = 0;
  if(bgImgIndex < 0)
    bgImgIndex = x.length-1;

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[bgImgIndex].style.display = "block";

}

//envia um pedido para registrar um cliente
function regClient(){
  var foto = $('#fotoUser')[0].files[0].name;
  //alert(foto);
  var sendData = $("#register").serialize() + "&foto=" + foto; //dados inseridos no formulario de cadastro
  //alert($("#register").serialize());
  //alert(sendData);
  $.post( "serv/serv.php", sendData )
    .done(function(data){
    document.getElementById("confReg").innerHTML = data + ' <button onclick="document.getElementById(\'id02\').style.display=\'none\'" type="button" class="w3-button w3-green">Ok</button>';
  });
}

//envia um pedido para registrar um produto
function regProd(){
  var foto = $('#fotoProd')[0].files[0].name;
  //alert(foto);
  var sendData = $("#registerProd").serialize() + "&foto=" + foto;
  //alert($("#register").serialize());
  //alert(sendData);
  $.post( "serv/cadProd.php", sendData )
    .done(function(data){
    if(data.search("Erro") < 0 ){
      document.getElementById('id05').style.display='none';
    }else{
      document.getElementById("confRegP").innerHTML = data;
      $("#alert").fadeOut(3000);
    }
  });
}

//transfere a imagem colocada no formulario de registro de produto para a pasta img
$(document).ready(function (e) {
  $("#registerProd").on('submit',(function(e) {
    e.preventDefault();
    $.ajax({
      url: "serv/upload.php", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data)   // A function to be called if request succeeds
      {
        document.getElementById("confRegP").innerHTML = data;
      }
    });
  }));
});

//transfere a imagem colocada no formulario de registro de PET para a pasta img
$(document).ready(function (e) {
  $("#registerPet").on('submit',(function(e) {
    e.preventDefault();
    $.ajax({
      url: "serv/upload.php", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data)   // A function to be called if request succeeds
      {
        document.getElementById("confRegPet").innerHTML = data;
      }
    });
  }));
});

//transfere a imagem colocada no formulario de registro de servico para a pasta img
$(document).ready(function (e) {
  $("#registerServ").on('submit',(function(e) {
    e.preventDefault();
    $.ajax({
      url: "serv/upload.php", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data)   // A function to be called if request succeeds
      {
        document.getElementById("confRegS").innerHTML = data;
      }
    });
  }));
});

//transfere a imagem colocada no formulario de editar produto para a pasta img
$(document).ready(function (e) {
  $("#registerProd2").on('submit',(function(e) {
    e.preventDefault();
    $.ajax({
      url: "serv/upload.php", // Url to which the request is send
      type: "POST",             // Type of request to be send, called as method
      data: new FormData(this), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false,       // The content type used when sending data to the server.
      cache: false,             // To unable request pages to be cached
      processData:false,        // To send DOMDocument or non processed data file it is set to false
      success: function(data)   // A function to be called if request succeeds
      {
        document.getElementById("confRegP2").innerHTML = data;
      }
    });
  }));
});

//envia as informacoes para registrar um novo servico
function regServ(){
  var foto = $('#fotoServ')[0].files[0].name;
  //alert(foto);
  var sendData = $("#registerServ").serialize() + "&foto=" + foto;
  //alert($("#register").serialize());
  //alert(sendData);
  $.post( "serv/cadServ.php", sendData )
    .done(function(data){
    if(data.search("Erro") < 0 ){
      document.getElementById('id06').style.display='none';
    }else{
      document.getElementById("confRegS").innerHTML = data;
      $("#alert").fadeOut(3000);
    }
  });
}

//envia as informacoes para registrar um novo PET
function regPet(){
  var foto = $('#fotoPet')[0].files[0].name;
  //alert(foto);
  var sendData = $("#registerPet").serialize() + "&foto=" + foto + "&donoEmail=" + usuarioLogado.UserEmail;
  //alert($("#register").serialize());
  //alert(sendData);
  $.post( "serv/cadPet.php", sendData )
    .done(function(data){

    notify(data);
    document.getElementById('id03').style.display='none';

    if(goToAgendamento == 1){
      setTimeout(function(){
        loadAgendamento();
      }, 2000);

      goToAgendamento = -1;
    }
    if(goToMinhaConta == 1){
      setTimeout(function(){
        loadMinhaConta();
      }, 2000);
      goToMinhaConta = -1;
    }
  });
}

//envia as informacoes para fazer login, colocando na variavel usuarioLogado seu nome, email e permissao em formato JSON
function logIn(){
  var sendData = $("#formLogIn").serialize();
  //alert($("#register").serialize());
  alert(sendData);
  $.post("http://localhost:3000/login", sendData )
    .done(function(data){
    if(data.search("Erro") < 0 ){
      usuarioLogado = JSON.parse(data);
      loadheader();
      document.getElementById('id01').style.display='none';
    }else{
      document.getElementById("confRegLogIn").innerHTML = data;
      $("#alert").fadeOut(3000);
    }
  });

}

//envia as informacoes para obter um header de acordo com o provilegio
function loadheader(){
  //alert("a");
  $.post( "http://localhost:3000/header", "admin=" + usuarioLogado.UserAdmin + "&nome=" + usuarioLogado.UserName )
    .done(function(data){
    document.getElementById("headerMenu").innerHTML = data;
  });
}

//pede a pagina inicial enviando o numero de vendas para que seja possivel gerar automaticamente os produtos mais buscados
function loadMain(){
  $.get( "http://localhost:3000/main")
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
  //loadMaisVendidos("next");
  //plusDivs(1);
  changebg();
}

//pega o numero de produtos ja cadastrados
function pegarNumVendas(){
  var vendaID;
  $.get( "serv/pegarVendaID.php")
    .done(function(data){
    vendaID =  data;
  });
  //vendaID = vendaID.substring(285);
  //alert(vendaID);
  numVendas = vendaID;
}

//recebe a pagina Sobre Nos
function loadSobreNos(){
  //alert(numVendas);
  $.get( "http://localhost:3000/SobreNos" )
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
}

//envia as informacoes para gerar a pagina da loja
function loadShop(animal, tipo){
  //alert("loadShop");
  $.post( "serv/makeLoja.php",  "animal=" + animal + "&tipo=" + tipo)
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
  w3_open();
  hideMenuEffect();
  showMenu2Mobile();
}

//envia as informacoes para gerar a pagina de descricao de produtos
function loadProdDescription(id){
  //alert(id);
  if(usuarioLogado == null){
    $.post( "serv/makeProdDescr.php", "id=" + id + "&eAdmin=0&numVendas=" + numVendas )
      .done(function(data){
      //alert(data);
      document.getElementById("success").innerHTML = data;
    });
  }
  else{
    //alert(usuarioLogado.UserAdmin);
    $.post( "serv/makeProdDescr.php", "id=" + id + "&eAdmin=" + usuarioLogado.UserAdmin+"&numVendas=" + numVendas )
      .done(function(data){
      document.getElementById("success").innerHTML = data;
    });
  }
  //alert("ok");
}

//exibe uma mensagem na tela com um pop-up
function notify(message){
  document.getElementById('id04').style.display='block';
  document.getElementById("notification").innerHTML = message;
}

//Abre o formlario para cadastrar PET
function cadastrarPET(){
  if(usuarioLogado == null){
    notify("Voce deve efetuar login antes");
  }else{
    document.getElementById('id03').style.display='block';
  }
}

//adiciona produtos ao carrinho no formato JSON
function Comprar(id, foto, desc, preco, qtdE){
  if(usuarioLogado == null){
    notify("Voce deve efetuar login antes");
  }else{
    notify("Produto adicionado ao carrinho!");
    var obj = JSON.parse(carrinho);
    obj["produtos"].push({"produtoID":id, "foto":foto, "desc":desc, "preco":preco, "qtdE": qtdE});
    carrinho = JSON.stringify(obj);

  }
}

//gera a pagina de carrinho
function loadCarrinho(){
  var compras = JSON.parse(carrinho);
  var i;
  var page = '<div id="cartPage" class="w3-center w3-light-gray">'+
      '<br><br><br><br><br>'+
      '<div class="w3-ontainer w3-padding-32 w3-hide-small"></div>'+
      '<div class="w3-center w3-container ">'+
      '<h2 class="KartHead">Carrinho</h2>'+
      '</div>'+
      '<div class="w3-container cartContent w3-center w3-white">'+
      '<div class="cartContentHeader w3-black w3-row">'+
      '<div class = "descKart w3-col	">Item</div>'+
      '<div class = "descKart w3-col	">Descricao</div>'+
      '<div class = "descKart w3-col	">Quantidade</div>'+
      '<div class = "descKart w3-col	">Preco</div>'+
      '</div>';
  for(i = 0 ; i < compras.produtos.length ; i++){
    page += '<div class="cartItem w3-container w3-row">'+
      '<div class="cartProdImg w3-container w3-col">'+
      '<img class = "cartImg w3-image" src = "img/'+ compras.produtos[i].foto +'" alt = "Ração"/>'+
      '</div>'+

      '<div class="cartDescr w3-col w3-container">'+ compras.produtos[i].desc +'</div>'+
      '<div  class="cartQtd w3-container w3-col"><input onkeydown="return false;" onclick="updatePreco()"  type=\'number\' min="0" max=\''+compras.produtos[i].qtdE+ '\' id=\'qtd'+ compras.produtos[i].produtoID + '\' name=\'mynumber\' value=\'1\' /> </div>'+
      '<div class="cartPreco w3-container w3-col">R$'+ compras.produtos[i].preco +'</div>'+
      /*'<div class="cartX w3-container w3-col "><span class="w3-hover-black Xis"><a href="#" onclick="removerDoCarrinho('+ compras.produtos[i].produtoID +')">X</a></span></div>'+*/
      '</div>';
    precototal += parseFloat(compras.produtos[i].preco);
  }


  page += '<div class="cartSumPrice w3-black"><span class="w3-right totalPrice" id="precoTotal">Total: R$ '+ precototal +'</span></div>'+
    '</div>'+
    '<div class="w3-container w3-row">'+
    '<div class="w3-container w3-half w3-center w3-white contPay w3-border">'+
    '<h2 class="KartHead2 w3-teal">Pagamento</h2>'+
    'Numero do Cartão:<br>'+
    '<input type=text class="payIn" pattern="[0-9]{13,16}"><br>'+
    'Senha:<br>'+
    '<input type="password" class="payIn"><br>'+

    '<img class = "cartImg" src = "img/Logos-Cart%C3%B5es-de-Cr%C3%A9dito-com-Logo-Pagseguro.jpg" alt = "Ração"/>'+
    '</div>'+

    '<div class="w3-container w3-half w3-center w3-white contPay w3-border">'+
    '<h2 class="KartHead2 w3-teal">Endereco</h2>'+
    'Endereco:<br>'+
    '<input type=text class="payIn"><br>'+
    'CEP:<br>'+
    '<input type=text class="payIn" pattern="[0-9]{13,16}"><br>'+
    'Telefone:<br>'+
    '<input type=text class="payIn" pattern="[0-9]{13,16}"><br>'+
    '<div class="w3-container fimKart">'+
    '<a href="#" onclick="realizarVenda()"><div id="FinPay" type="button" class="w3-black w3-hover-teal">Finalizar</div></a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
  document.getElementById("success").innerHTML = page;
  updatePreco();
}

//envia as informacoes para registrar uma venda
function realizarVenda(){
  var i;
  var vendaID;
  var compras = JSON.parse(carrinho);
  $.post( "serv/pegarVendaID.php")
    .done(function(data){
    vendaID =  data;
  });
  //vendaID = vendaID.substring(285);
  //alert(vendaID);
  numVendas = vendaID;
  $.post( "serv/cadastrarVenda.php", "vendaid=" + vendaID + "&email=" + usuarioLogado.UserEmail) //registra a venda
    .done(function(data){
    //alert(data);
  });
  //alert("length=" + compras.produtos.length);
  for(i = 0 ; i < compras.produtos.length ; i++){
    var qtd= document.getElementById("qtd" + compras.produtos[i].produtoID).value;
    //alert(qtd);
    $.post( "serv/cadastrarVendaProdutos.php", "vendaid=" + vendaID + "&produtoid=" + compras.produtos[i].produtoID + "&qtd=" + qtd) //registra produtos vendidos
      .done(function(data){
      //alert(data);
    });
    //debita quantidade do produto no estoque
    $.post( "serv/debitarEstoque.php", "produtoid=" + compras.produtos[i].produtoID + "&qtd=" + qtd)
      .done(function(data){
      //alert(data);
    });
  }
  notify("Venda realizada com Sucesso!<br>Numero do pedido: " + vendaID + "<br>Voce pode acessar seus pedidos na aba Meus Dados");
  carrinho = '{"produtos":[]}';
  loadCarrinho();
}

//envia as informacoes para gerar a pagina Minha Conta
function loadMinhaConta(){
  $.post( "serv/makeMinhaConta.php", "email=" + usuarioLogado.UserEmail)
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
}

//Altera o preco do carrinho ao aumentar ou diminuir a quantidades de itens
function updatePreco(){
  var i;
  precototal = 0;
  var compras = JSON.parse(carrinho);
  for(i = 0 ; i < compras.produtos.length ; i++){
    var qtd = document.getElementById("qtd" + compras.produtos[i].produtoID).value;
    var preco = compras.produtos[i].preco;
    precototal += qtd * preco;
  }
  document.getElementById("precoTotal").innerHTML = "Total: R$ " + precototal;
}

//envia as informacoes do usuario logado para gerar a pagina de Agendamento já com os PETs que p usuario possui
function loadAgendamento(){
  //alert("a");
  //alert(usuarioLogado.UserEmail);
  $.post( "serv/makeAgendamento.php", "email="+ usuarioLogado.UserEmail)
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
}

//envia as informacoes para gerar os horarios disponiveis em uma data
function mostrarHorarios(){
  var dataS = document.getElementById("servData").value;
  var servico = $("#formEscolherServico").serialize();
  if(dataS == "" || servico == "servico="){
    notify("Selecione uma data e um servico");
  }
  else{
    $.post( "serv/pegarHorarios.php", "data=" + dataS)
      .done(function(data){
      document.getElementById("horariosServ").innerHTML = data;
    });
  }
}

//gera indormacoes sobre o servico que o usuario deseja
function mostrarSobreServico(){
  var servico = $("#formEscolherServico").serialize();
  //alert(servico);
  if(servico == "servico="){
    notify("Selecione um servico");
  }
  else{
    $.post( "serv/sobreServico.php", servico)
      .done(function(data){
      document.getElementById("sobreServico").innerHTML = data;
    });
  }
}

//marca o horario desejado pelo usuario em cinza
function selectHorario(hora){
  $( "#horario" + horario ).removeClass( "w3-gray" );
  $( "#horario" + horario ).addClass( "w3-green" );
  horario = hora;
  $( "#horario" + hora ).removeClass( "w3-green" );
  $( "#horario" + hora ).addClass( "w3-gray" );
}

//marca o pet selecionado pelo usuario em cinza
function selectPet(id){
  $( "#pet" + petID ).removeClass( "w3-grayscale-max" );
  petID = id;
  $( "#pet" + id ).addClass( "w3-grayscale-max" );
}

//envia as informacoes para registrar um agendamento
function agendar(){
  var dataS = document.getElementById("servData").value;
  var servico = $("#formEscolherServico").serialize();
  if(horario == -1 || petID == -1){
    notify("Selecione um pet e um horario disponivel")
  }
  else{
    $.post( "serv/agendar.php", servico + "&data=" + dataS + "&horario=" + horario + "&petID=" + petID + "&email=" + usuarioLogado.UserEmail)
      .done(function(data){
      document.getElementById('id09').style.display='none';
      notify(data);
      mostrarHorarios();
      $( "#pet" + petID ).removeClass( "w3-grayscale-max" );
      petID = -1;
      horario = -1;

    });
  }
}

//pega todas as vendas ja efetuadas na loja
function loadVendas(){
  $.get( "serv/makeVendas.php")
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
}

//abre o cadastro de PET voltando pra tela de agendamento quando finalizar o cadastro
function cadastrarNovoPET(){
  cadastrarPET();
  goToAgendamento = 1;
}

//abre o cadastro de PET voltando pra tela de Minha Conta quando finalizar o cadastro
function cadastrarContaPET(){
  cadastrarPET();
  goToMinhaConta = 1;
}

//pega as informacoes do produto que esta sendo editado
function editarProd(id, nome, desc, tipo, animal, preco, qtdE, qtdV, foto){
  //alert("aa");
  document.getElementById('id07').style.display='block';
  $("#Edit-Nome").val(nome);
  $("#Edit-Desc").val(desc);
  $("#Edit-Tipo").val(tipo);
  $("#Edit-Animal").val(animal);
  $("#Edit-Preco").val(preco);
  $("#Edit-qtdE").val(parseInt(qtdE));
  $("#Edit-qtdV").val(parseInt(qtdV))
  editProdId = id;
}

//envia as informacoes para alterar um produto no BD
function editProd(){
  var foto = $('#fotoProd2')[0].files[0].name;
  //alert(foto);
  var sendData = $("#registerProd2").serialize() + "&foto=" + foto + "&produtoID=" + editProdId;
  //alert($("#register").serialize());
  //alert(sendData);
  $.post( "serv/editProd.php", sendData )
    .done(function(data){
    if(data.search("Erro") < 0 ){
      //alert(data);
      document.getElementById('id07').style.display='none';
      setTimeout(function(){
        loadProdDescription(editProdId);
      }, 500);
    }else{
      //alert(data);
      //alert("bb");
      document.getElementById("confRegP2").innerHTML = data;
      $("#alert").fadeOut(3000);
    }
  });
  //alert("what");
}

$("[type='number']").keypress(function (evt) {
  evt.preventDefault();
});

//Faz query de produtos de acordo com os parametros citados. Por exemplo exibir os mais vendidos, ou mais baratos ou recem cadastrados
function loadDestaques(categoria, ordem){
  $.post( "serv/novidades.php", "categoria=" + categoria + "&ordem=" + ordem)
    .done(function(data){
    document.getElementById("success").innerHTML = data;
  });
}

//envia as informacoes para registrar um admin
function regAdmin(){
  var sendData = $("#registerAdmin").serialize();
  var foto = $('#fotoAdmin')[0].files[0].name;
  $.post("serv/cadastrarAdmin.php", sendData + "&foto=" + foto)
    .done(function(data){
    $("#confRegAdmin").html(data);
    $("#textinho").fadeOut(3000);
  });

}

//abre o formulario para pagar um servico
function pagarServ(){
  if(horario == -1 || petID == -1){
    notify("Selecione um pet e um horario disponivel")
  }
  else{
    document.getElementById('id09').style.display='block';
  }
}
