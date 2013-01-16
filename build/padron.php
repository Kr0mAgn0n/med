<?php
$tipo = $_GET['tipo'];
$cod_ubigeo = $_GET['codgeo'];
$cod_ugel = $_GET['codugel'];
$CodModular = $_GET['codmod'];
$anexo = $_GET['anexo'];
$NombreIIEE = $_GET['nombreie'];
$CodLocal = $_GET['codlocal'];
$Direccion = $_GET['direccion'];
$nomccpp = $_GET['cenpob'];
//$codccpp = $_GET['localidad'];
$nivel = $_GET['nivmod'];
$gesdep = $_GET['gesdep'];
$codccpp = $_GET['codcp'];



$servername = "MEDESTADISTICA\GIS";
$username = "sa";
$password = "sasa";
$bd = "BDGEOREF";

$conect = mssql_connect($servername, $username, $password);
$selected = mssql_select_db($bd, $conect);

$storeProcedure = mssql_init("storeProcedure", $conect);
mssql_bind($storeProcedure, '@tipo',  $tipo,  SQLVARCHAR,  false,  false,  1);
mssql_bind($storeProcedure, '@coddepartamento', $coddepartamento, SQLVARCHAR, false, false, 2);
mssql_bind($storeProcedure, '@codprovincia', $codprovincia, SQLVARCHAR, false, false, 4);
mssql_bind($storeProcedure, '@coddistrito', $coddistrito, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@dre', $dre, SQLVARCHAR, false, false, 50);
mssql_bind($storeProcedure, '@codugel', $codugel, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@NombreIIEE', $NombreIIEE, SQLVARCHAR, false, false, 80);
mssql_bind($storeProcedure, '@CodModular', $CodModular, SQLVARCHAR, false, false, 10);
mssql_bind($storeProcedure, '@CodLocal', $CodLocal, SQLVARCHAR, false, false, 10);
mssql_bind($storeProcedure, '@Direccion', $Direccion, SQLVARCHAR, false, false, 80);
mssql_bind($storeProcedure, '@nomccpp', $nomccpp, SQLVARCHAR, false, false, 200);
mssql_bind($storeProcedure, '@codccpp', $codccpp, SQLVARCHAR, false, false, 80);
mssql_bind($storeProcedure, '@cod_ubigeo', $cod_ubigeo, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@cod_ugel', $cod_ugel, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@nivel', $nivel, SQLVARCHAR, false, false, 50);
mssql_bind($storeProcedure, '@gesdep', $gesdep, SQLVARCHAR, false, false, 2);
mssql_bind($storeProcedure, '@tipo_de_programa', $tipo_de_programa, SQLVARCHAR, false, false, 4);
mssql_bind($storeProcedure, '@visitado', $visitado, SQLVARCHAR, false, false, 1);

$result = mssql_execute($storeProcedure);

var_dump($result);

mssql_close($conect);
?>
