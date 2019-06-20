<?php
  include 'data.php';
  $artista_selezionato = $_GET['artista'];

  $dischi_artista = [];
  foreach ($dischi as $disco) {
    if($disco['artista'] == $artista_selezionato) {
      $dischi_artista[] = $disco;
    }
  }

  // oppure mettendo Object.values(JSON.parse(data)) nell'app.js
  // $dischi_artista = array_filter($dischi, function($disco) use($artista_selezionato) {
  //   return $disco['artista'] == $artista_selezionato;
  // });

  echo json_encode($dischi_artista);
?>
