/*
* File: makejson
* Project: CodeGenerator
* Author: Ángel Cardiel (angel.cardiel@protonmail.com)
*/

<?php

$nodo = array();
$i = 0;
if (($handle = fopen("CSV/Lista de paradas-REAL.csv", "r")) !== FALSE) {
    while (($line = fgetcsv($handle, 1000, ";")) !== FALSE) {

        $coordenadas = explode(", ", $line[1]);
        $metadata = [
            "x" => floatval($coordenadas[0]),
            "y" => floatval($coordenadas[1])
        ];
        $nodo[] = [
            "id" => strval($i),
            "label" => $line[0],
            "metadata" => $metadata
        ];
        $i++;
    }

    fclose($handle);
}


/* * *
 *
 * PROCESAMOS LAS LINEAS
 *
 */

$lineas = array();
if (($handle = fopen("CSV/colores.csv", "r")) !== FALSE) {
    while (($line = fgetcsv($handle, 1000, ";")) !== FALSE) {
        $lineas[] = [
            "id" => $line[0],
            "color" => "#" . $line[1],
            "group" => NULL
        ];
    }

    fclose($handle);
}



/* * *
 *
 * PROCESAMOS LAS RUTAS
 *
 */

$ficheros = scandir("CSV");

foreach ($ficheros as $f) {
    if ($f != ".." && $f != "." && strpos($f, 'Lista de paradas') === false && strpos($f, 'color') === false) {
        if (($handle = fopen("CSV/" . $f, "r")) !== FALSE) {
            $flag = true;
            $lineaBUS = explode("-", $f)[0];

            while (($line = fgetcsv($handle, 1000, ";")) !== FALSE) {
                if ($flag) {
                    $flag = false;
                    continue;
                }
                $origen = $line[0];
                $destino = $line[1];
                $tiempo = floatval(str_replace(',', '.', $line[2])) * 60;

                $origen_key = array_search($origen, array_column($nodo, 'label'));
                $destino_key = array_search($destino, array_column($nodo, 'label'));

                $origen_id = $nodo[$origen_key]['id'];
                $destino_id = $nodo[$destino_key]['id'];

                $tramo[] = [
                    'source' => $origen_id,
                    'target' => $destino_id,
                    'relation' => 'subway',
                    'lineaTMP' => $lineaBUS,
                    'ST' => $origen_id . $destino_id,
                    'TS' => $destino_id . $origen_id,
                    'idtmp' => $i++,
                    'metadata' => [
                        'time' => intval($tiempo),
                        'lines' => [
                            $lineaBUS
                        ]
                    ],
                ];
            }
            fclose($handle);
        }
    }
}

//BUSCAMOS TRAMOS IGUALES DE LINEAS DIFERENTES

foreach ($tramo as $t) {
    //var_dump($t);

    $tmp = $tramo;
    $iguales = array();
    $idoriginal = array_search($t['idtmp'], array_column($tramo, 'idtmp'));
    array_splice($tmp, $idoriginal, 1);

    while ($rutaIgual = array_search($t['ST'], array_column($tmp, 'ST'))) {

        $iguales[] = $tmp[$rutaIgual];
        array_splice($tmp, $rutaIgual, 1);
    }


    while ($rutaIgual = array_search($t['ST'], array_column($tmp, 'TS'))) {

        $iguales[] = $tmp[$rutaIgual];
        array_splice($tmp, $rutaIgual, 1);
    }


    while ($rutaIgual = array_search($t['TS'], array_column($tmp, 'ST'))) {

        $iguales[] = $tmp[$rutaIgual];
        array_splice($tmp, $rutaIgual, 1);
    }


    while ($rutaIgual = array_search($t['TS'], array_column($tmp, 'TS'))) {

        $iguales[] = $tmp[$rutaIgual];
        array_splice($tmp, $rutaIgual, 1);
    }

    //var_dump($iguales);
    foreach ($iguales as $l) {
        if (!in_array($l['lineaTMP'], $tramo[$idoriginal]['metadata']['lines'])) {
            $tramo[$idoriginal]['metadata']['lines'][] = $l['lineaTMP'];
        }
    }
}

/* * *
 *
 * LIMPIAMOS ARRAY DE TRAMOS
 *
 */

$tramotmp = array();
foreach ($tramo as $t) {
    //var_dump($t);
    unset($t['lineaTMP']);
    unset($t['ST']);
    unset($t['TS']);
    unset($t['idtmp']);
    $tramotmp[] = $t;
}
$tramo = $tramotmp;



/* * *
 *
 * MOSTRAMOS RESULTADOS
 *
 */

$global = array();

$global['nodes'] = $nodo;
$global['edges'] = $tramo;
$global['lines'] = $lineas;

print_r(json_encode($global));
exit;
var_dump($global['lines']);

var_dump($nodo);
var_dump($tramo);
