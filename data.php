<?php
  $dischi = [
    [
      'copertina' => 'img/bonjovi.jpg',
      'titolo' => 'New Jersey',
      'artista' => 'Bon Jovi',
      'anno' => '1988'
    ],
    [
      'copertina' => 'img/queen.jpg',
      'titolo' => 'Live at Wembley 86',
      'artista' => 'Queen',
      'anno' => '1992'
    ],
    [
      'copertina' => 'img/sting.jpg',
      'titolo' => 'Ten\'s Summoner\'s Tales',
      'artista' => 'Sting',
      'anno' => '1993'
    ],
    [
      'copertina' => 'img/stevegaddband.jpg',
      'titolo' => 'Steve Gadd Band',
      'artista' => 'Steve Gadd Band',
      'anno' => '2018'
    ],
    [
      'copertina' => 'img/ironmaden.jpg',
      'titolo' => 'Brave new World',
      'artista' => 'Iron Maiden',
      'anno' => '2000'
    ],
    [
      'copertina' => 'img/ericclapton.jpg',
      'titolo' => 'One more car, one more rider',
      'artista' => 'Eric Clapton',
      'anno' => '2002'
    ],
    [
      'copertina' => 'img/eminem.jpeg',
      'titolo' => 'Revival',
      'artista' => 'Eminem',
      'anno' => '2017'
    ],
    [
      'copertina' => 'img/50cent.jpg',
      'titolo' => 'Get Rich or Die Tryin',
      'artista' => '50 Cent',
      'anno' => '2003'
    ],
    [
      'copertina' => 'img/linkinpark.jpg',
      'titolo' => 'One More Light',
      'artista' => 'Linkin Park',
      'anno' => '2017'
    ],
    [
      'copertina' => 'img/martingarrix.jpg',
      'titolo' => 'The Martin Garrix Collection',
      'artista' => 'Martin Garrix',
      'anno' => '2017'
    ],
  ];
  if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    echo json_encode($dischi);
  }
?>
