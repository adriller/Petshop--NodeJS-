

<?php
/*<!--

BONUS - PAGINA SENDO IMPLEMENTADA

Adriller Genova Ferreira - NºUSP: 8922201
Allan Ribeiro Polachini - NºUSP: 8922347
Hikaro Augusto de Oliveira - NºUSP: 9066487
Matheus de França Cabrini - NºUSP: 8937375
Rita Raad - NºUSP: 8061452

Estamos tentando fazer um blog para gerar noticias sobre PETs automaticamente utilizando o Microsoft Cognitive Services.
Estamos com algumas dificuldades, mas planejamos finalizar ate a proxima entrega.

-->*/
require_once 'HTTP/Request2.php';

$request = new Http_Request2('https://api.cognitive.microsoft.com/bing/v5.0/images/search');
$url = $request->getUrl();

$headers = array(
    // Request headers
    'Content-Type' => 'multipart/form-data',
    'Ocp-Apim-Subscription-Key' => '{subscription key}',
);

$request->setHeader($headers);

$parameters = array(
    // Request parameters
    'q' => 'cats',
);

$url->setQueryVariables($parameters);

$request->setMethod(HTTP_Request2::METHOD_POST);

// Request body
$request->setBody("{body}");

try
{
    $response = $request->send();
    echo $response->getBody();
}
catch (HttpException $ex)
{
    echo $ex;
}

?>
