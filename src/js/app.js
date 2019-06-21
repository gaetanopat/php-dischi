var $ = require('jquery');
// Stampare a schermo una decina di dischi musicali (vedi screenshot) in due modi diversi:
// 1 - Solo con l’utilizzo di PHP, che stampa direttamente i dischi in pagina: al caricamento della pagina ci saranno tutti i dischi.
// 2 - Attraverso l’utilizzo di AJAX: al caricamento della pagina ajax chiederà attraverso una chiamata i dischi a php e li stamperà attraverso handlebars.
// Utilizzare: Html, Sass, JS, jQuery, handlebars, Php
//
// *Opzionale*:
// A - Attraverso un’altra chiamata ajax, filtrare gli album per artista
// B - Attraverso un’altra chiamata ajax, ordinare gli album per data di uscita.
// I dati da visualizzare per ogni disco sono:
// - immagine di copertina
// - titolo album
// - nome artista
// - anno d'uscita

$(document).ready(function(){
  // chiamata ajax
  $.ajax({
    'url': 'database/totale_dischi.php',
    'method': 'GET',
    'success': function(data){
      var dischi = JSON.parse(data);

      // visualizzazione normale, senza ordinamento
      visualizzazioneIniziale(dischi);

      // visualizzazione degli artisti nella select
      visualizzazioneArtistiSelect(dischi);

      // quando clicco su 'Home'
      $('.home').click(function(){
        // resetto la input checkbox
        $('.ordina').prop('checked', false);
        // dopo aver cliccato resetto con l'option di default
        $('select option').first().prop('selected', true);
        visualizzazioneIniziale(dischi);
      });

      // quando clicco sulla checkbox 'Ordina per data'
      $('.ordina').change(function(){
        // se questa è selezionata
        if($(this).is(":checked")) {
          ordinaAlbum();
        } else {
          visualizzazioneIniziale(dischi);
        }
      });
    },
    'error': function(){
      alert('Si è verificato un errore');
    }
  });
});


// quando apro il sito, visualizzazione base
function visualizzazioneIniziale(dischi){
  // codice da clonare
  var album = $('#template_disco').html();
  // funzione compilatrice
  var template_disco_function = Handlebars.compile(album);

  // svuoto il container della section
  $('.dischi .container').empty();


  var handlebars_album;
  // per la visualizzazione nel template
  for (var disco in dischi) {
    handlebars_album = {
      copertina: dischi[disco]['copertina'],
      titolo: dischi[disco]['titolo'],
      artista: dischi[disco]['artista'],
      anno: dischi[disco]['anno']
    };
    var html = template_disco_function(handlebars_album);
    $('.dischi .container').append(html);
  }
}

// per la visualizzazione degli artisti nella select
function visualizzazioneArtistiSelect(dischi){
  // codice da clonare
  var select_artista = $('#template_select').html();
  // funzione compilatrice
  var template_select_function = Handlebars.compile(select_artista);

  var handlebars_artista;
  var artisti = [];
  // preparo un array contenente i nomi degli artisti non ripetuti
  for (var i = 0; i < dischi.length; i++) {
    var disco = dischi[i];
    if(!artisti.includes(disco['artista'])) {
      artisti.push(disco['artista']);
    }
  }
  // per la visualizzazione nel template
  for (var i = 0; i < artisti.length; i++) {
    handlebars_artista = {
      value: artisti[i],
      artista: artisti[i]
    };
    var html2 = template_select_function(handlebars_artista);
    $('select').append(html2);
  }

  // quando cambio la option della select
  $('select').change(function(){
    // prendo il value dell'artista selezionato
    var artista_selezionato = $(this).val();
    cercaAlbumArtista(dischi, artista_selezionato);
  });
}

// quando cambio l'option della select
function cercaAlbumArtista(dischi, artista_selezionato){
  // svuoto il container della section
  $('.dischi .container').empty();
  // resetto la input checkbox
  $('.ordina').prop('checked', false);

  var handlebars_album;
  // se ho selezionato qualcosa di diverso dalla prima option
  if(artista_selezionato != ''){
    $.ajax({
      'url': 'database/filtro_artista.php',
      'method': 'GET',
      data: {
        'artista': artista_selezionato
      },
      'success': function(data){
        var dischi_filtrati = JSON.parse(data);
        visualizzazioneIniziale(dischi_filtrati);
      },
      error: function(){
        alert('Si è verificato un errore');
      }
    });
  } else {
    // se riseleziono 'Scegli l'artista'
    visualizzazioneIniziale(dischi);
  }

}

// quando clicco 'Ordina per data'
function ordinaAlbum(dischi){
  // svuoto il container della section
  $('.dischi .container').empty();
  // dopo aver cliccato resetto con l'option di default
  $('select option').first().prop('selected', true);

  // chiamata ajax
  $.ajax({
    'url': 'database/ordina_dischi.php',
    'method': 'GET',
    'success': function(data){
      var dischi = JSON.parse(data);
      visualizzazioneIniziale(dischi);
    },
    'error': function(){
      alert('Si è verificato un errore');
    }
  });
}
