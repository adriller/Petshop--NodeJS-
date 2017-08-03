
<?php
/*<!--
Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Esta pagina faz o upload de fotos para a pasta img.
Assim quando em um cadastro, é adicionado uma foto, a imagem é transferida para a pasta.

Obs: TODAS as imagens devem conter nome MENOR que 255 caracteres e tamanho MENOR que 200kb.
Caso contrário será recusado.

-->*/
if(isset($_FILES["foto"]["type"]))
{
  $validextensions = array("jpeg", "jpg", "png");
  $temporary = explode(".", $_FILES["foto"]["name"]);
  $file_extension = end($temporary);
  if ((($_FILES["foto"]["type"] == "image/png") || ($_FILES["foto"]["type"] == "image/jpg") || ($_FILES["foto"]["type"] == "image/jpeg")
      ) && ($_FILES["foto"]["size"] < 200000)//Approx. 200kb files can be uploaded.
      && in_array($file_extension, $validextensions)) {
    if ($_FILES["foto"]["error"] > 0)
    {
      echo "Return Code: " . $_FILES["foto"]["error"] . "<br/><br/>";
    }
    else
    {
      if (file_exists("../img/" . $_FILES["foto"]["name"])) {
        echo $_FILES["foto"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
      }
      else
      {
        echo " transfering \n";
        $sourcePath = $_FILES['foto']['tmp_name']; // Storing source path of the file in a variable
        $targetPath = "../img/".$_FILES['foto']['name']; // Target path where file is to be stored
        move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
        echo "\n source = " . $sourcePath ."  dest = " . $targetPath . "\n" ;
        echo "<span id='success'>Image Uploaded Successfully...!!</span><br/>";
        echo "<br/><b>File Name:</b> " . $_FILES["foto"]["name"] . "<br>";
        echo "<b>Type:</b> " . $_FILES["foto"]["type"] . "<br>";
        echo "<b>Size:</b> " . ($_FILES["foto"]["size"] / 1024) . " kB<br>";
        echo "<b>Temp file:</b> " . $_FILES["foto"]["tmp_name"] . "<br>";
      }
    }
  }
  else
  {
    echo "<span id='invalid'>***Invalid file Size or Type***<span>";
  }
}
?>
