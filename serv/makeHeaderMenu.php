
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina retorna o HTML da do Header, de acordo com os privilegios do usuario

-->*/
$admin = $_POST["admin"];
$nome = $_POST["nome"];

if($admin == 0){
  echo '<header class = "w3-row w3-gray">
      <div class="w3-left">
        <div class="paragraph"><b>FRETE GRÁTIS</b> NAS COMPRAS ACIMA DE R$ 300 | PARCELE EM ATÉ <b>6X SEM JUROS</b></div>
      </div>
        <a href="#carrinho" onclick="loadCarrinho()">
          <div class="w3-right paragraph">CARRINHO</div>
          <img class="w3-image imgSacola w3-right" src = "img/sacola.png" alt ="imagem da sacola"/>
        </a>
    </header>

    <div class="w3-bar w3-black">
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small" onclick="loadAgendamento()">AGENDAMENTO</a>

      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small"  onclick="loadMain()"><span>LOJA</span></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small w3-teal w3-padding-small w3-right"  >Bem Vindo ' .$nome. '</a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right" onclick="loadMinhaConta()" >MEUS DADOS</a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right"  onclick="loadSobreNos()">SOBRE NÓS</a>
    </div>
    <div class="w3-bar w3-black">
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button   w3-hover-teal w3-padding-small" onclick="loadAgendamento()"><i class="fa fa-calendar-plus-o"></i></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small"  onclick="loadMain()"><span><i class="fa fa-home"></i></span></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button w3-teal w3-padding-small w3-right"> ' .$nome. '</a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right" onclick="loadMinhaConta()" ><i class="fa fa-user-circle"></i></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right"  onclick="loadSobreNos()"> <i class="fa fa-info-circle"></i></a>
    </div>
    <div class="w3-display-container w3-animate-opacity mainBG">
      <div class="w3-center w3-hide-small">
        <a href="#loja" onclick="loadMain()"><img id = "logoimg" src = "img/aa2.png" alt = "logo"/></a>
      </div>
      <div class="w3-center w3-hide-small">
        <a href="#loja" onclick="loadMain()"><img id = "nome" src = "img/logo.png" alt = "logo"/></a>
      </div>
      <div class="w3-center w3-hide-large w3-hide-medium">
        <a href="#loja" onclick="loadMain()"><img id = "nome2" src = "img/logo.png" alt = "logo"/></a>
      </div>

      <div class="w3-bar w3-center">
        <a href="#" class="w3-center centerMenu2 w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-center w3-white" onclick="loadShop(\'cachorro\', \'alimento\'); w3_open();">CACHORROS</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'gato\', \'alimento\')">GATOS</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'passaro\', \'alimento\')">PÁSSAROS</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'roedor\', \'alimento\')">ROEDORES</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'outro\', \'alimento\')">OUTROS</a>
        <input type="text" class="w3-bar w3-input w3-padding-small  w3-hide-small" placeholder="Procurar..">
        <a href="#" class=" w3-button w3-teal w3-padding-small w3-center w3-hide-small"><i class=" fa fa-search"></i></a>
        <a href="javascript:void(0)" class="w3-hover-teal w3-padding-small w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium w3-black" onclick="showMenu2Mobile()">&#9776;</a>
      </div>

      <div id="menu2Mobile" class="w3-bar-block w3-light-gray w3-hide w3-hide-large w3-hide-medium">

        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'cachorro\', \'alimento\'); w3_open();">CACHORROS</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small " onclick="loadShop(\'gato\', \'alimento\')">GATOS</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'passaro\', \'alimento\')">PÁSSAROS</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'roedor\', \'alimento\')">ROEDORES</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'outro\', \'alimento\')">OUTROS</a>
        <a href="#" class=" w3-bar-item w3-button w3-padding-small w3-right ">
        <input type="text" class="w3-left w3-input w3-padding-small" placeholder="Procurar..">
        Buscar<i class="fa fa-search w3-margin-left" ></i>
        </a>
      </div>
    </div>';
}else{
  echo '<header class = "w3-row w3-gray">
      <div class="w3-left">
        <div class="paragraph"><b>FRETE GRÁTIS</b> NAS COMPRAS ACIMA DE R$ 300 | PARCELE EM ATÉ <b>6X SEM JUROS</b></div>
      </div>
        <a href="#carr" onclick="loadCarrinho()">
          <div class="w3-right paragraph">CARRINHO</div>
          <img class="w3-image imgSacola w3-right" src = "img/sacola.png" alt ="imagem da sacola"/>
        </a>
    </header>

    <div class="w3-bar w3-black">
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small" onclick="loadAgendamento()">AGENDAMENTO</a>

      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small"  onclick="loadMain()"><span>LOJA</span></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small"  onclick="document.getElementById(\'id05\').style.display=\'block\'"><span>CADASTRAR PRODUTO</span>
      </a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small"  onclick="document.getElementById(\'id06\').style.display=\'block\'"><span>CADASTRAR SERVICO</span></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small"  onclick="document.getElementById(\'id08\').style.display=\'block\'"><span>CADASTRAR ADMIN</span></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small"  onclick="loadVendas()"><span>VENDAS</span></a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-padding-small w3-teal w3-right"> Bem vindo '.$nome.' </a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right" onclick="loadMinhaConta()" >MEUS DADOS</a>
      <a href="#" class="w3-bar-item w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-right"  onclick="loadSobreNos()">SOBRE NÓS</a>
    </div>
    <div class="w3-bar w3-black">
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button   w3-hover-teal w3-padding-small" onclick="loadAgendamento()"><i class="fa fa-calendar-plus-o"></i></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small"  onclick="loadPage(\'ajax/servicos.html\', \'serv\')"><span><i class="fa fa-calendar"></i></span></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small"  onclick="loadMain()"><span><i class="fa fa-home"></i></span></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-teal w3-right">'.$nome.' </a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right" onclick="loadMinhaConta()" ><i class="fa fa-user-circle"></i></a>
      <a href="#" class="w3-hide-large w3-hide-medium w3-bar-item w3-button  w3-hover-teal w3-padding-small w3-right"  onclick="loadSobreNos()"> <i class="fa fa-info-circle"></i></a>
    </div>
    <div class="w3-display-container w3-animate-opacity mainBG">
      <div class="w3-center w3-hide-small">
        <a href="#loja" onclick="loadMain()"><img id = "logoimg" src = "img/aa2.png" alt = "logo"/></a>
      </div>
      <div class="w3-center w3-hide-small">
        <a href="#loja" onclick="loadMain()"><img id = "nome" src = "img/logo.png" alt = "logo"/></a>
      </div>
      <div class="w3-center w3-hide-large w3-hide-medium">
        <a href="#loja" onclick="loadMain()"><img id = "nome2" src = "img/logo.png" alt = "logo"/></a>
      </div>

      <div class="w3-bar w3-center">
        <a href="#" class="w3-center centerMenu2 w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-center w3-white" onclick="loadShop(\'cachorro\', \'alimento\'); w3_open();">CACHORROS</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'gato\', \'alimento\')">GATOS</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'passaro\', \'alimento\')">PÁSSAROS</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'roedor\', \'alimento\')">ROEDORES</a>
        <a href="#" class="w3-center w3-button w3-hide-small  w3-hover-teal w3-padding-small w3-white" onclick="loadShop(\'outro\', \'alimento\')">OUTROS</a>
        <input type="text" class="w3-bar w3-input w3-padding-small  w3-hide-small" placeholder="Procurar..">
        <a href="#" class=" w3-button w3-teal w3-padding-small w3-center w3-hide-small"><i class=" fa fa-search"></i></a>
        <a href="javascript:void(0)" class="w3-hover-teal w3-padding-small w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium w3-black" onclick="showMenu2Mobile()">&#9776;</a>
      </div>

      <div id="menu2Mobile" class="w3-bar-block w3-light-gray w3-hide w3-hide-large w3-hide-medium">

        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'cachorro\', \'alimento\'); w3_open();">CACHORROS</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small " onclick="loadShop(\'gato\', \'alimento\')">GATOS</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'passaro\', \'alimento\')">PÁSSAROS</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'roedor\', \'alimento\')">ROEDORES</a>
        <a href="#" class="w3-bar-item w3-button  w3-hover-teal w3-padding-small" onclick="loadShop(\'outro\', \'alimento\')">OUTROS</a>
        <a href="#" class=" w3-bar-item w3-button w3-padding-small w3-right ">
        <input type="text" class="w3-left w3-input w3-padding-small" placeholder="Procurar..">
        Buscar<i class="fa fa-search w3-margin-left" ></i>
        </a>
      </div>
    </div>';
}

?>
