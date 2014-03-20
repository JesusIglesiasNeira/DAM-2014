<?php
$login = $_POST["login"];

srand((double)microtime()*1000000);
$numeroAleatorio = rand(0, 10);

// Simular un falso retardo por la red y el servidor
sleep($numeroAleatorio % 2);

$disponible = ($numeroAleatorio % 2 == 0)? "si" : "no";
if($disponible == "no") {
	$alternativasAutomaticas[] = $login.$login;
	$alternativasAutomaticas[] = "123".$login;
	$alternativasAutomaticas[] = $login."_otro";
	$alternativasAutomaticas[] = $login.".a";
	$alternativasAutomaticas[] = $login."100";
}

if($disponible == "si") {
	echo json_encode(array("disponible" => "si"));
}
else {
	echo json_encode(array("disponible" => no, "alternativas" => $alternativasAutomaticas));
}

?>