<?php
  include 'data.php';

  usort($dischi, function($disco_a, $disco_b) {
    return $disco_a['anno'] > $disco_b['anno'] ? 1 : -1;
  });

  echo json_encode($dischi);
?>
