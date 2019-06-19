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
  var url = 'http://localhost:8888/php-dischi/data.php';
  // codice da clonare
  var select_artista = $('#template_select').html();
  // funzione compilatrice
  var template_select_function = Handlebars.compile(select_artista);

  // codice da clonare
  var album = $('#template_disco').html();
  // funzione compilatrice
  var template_disco_function = Handlebars.compile(album);

  // per popolare la select
  // chiamata ajax
  $.ajax({
    'url': url,
    'method': 'GET',
    'success': function(data){
      var dischi = JSON.parse(data);
      var handlebars_artista;
      // per la visualizzazione nel template
      for (var key in dischi) {
        handlebars_artista = {
          value: dischi[key]['artista'],
          artista: dischi[key]['artista']
        };
        var html2 = template_select_function(handlebars_artista);
        $('select').append(html2);
      }

      // per eliminare i doppioni dalle option della select se un giorno dovessi inserire un album con lo stesso Artista
      var usedNames = {};
      $("select option").each(function () {
          if(usedNames[this.text]) {
              $(this).remove();
          } else {
              usedNames[this.text] = this.value;
          }
      });
      // richiamo la funzione per cercare l'album dell'artista selezionato
      cercaAlbumArtista(url, dischi, template_disco_function);
    },
    'error': function(){
      alert('Si è verificato un errore');
    }
  });


  // visualizzazione normale, senza ordinamento
  visualizzazioneIniziale(url, template_disco_function);

  // quando clicco su 'Home'
  $('.home').click(function(){
    visualizzazioneIniziale(url, template_disco_function);
  })

  // quando clicco sulla checkbox 'Ordina per data'
  $('.ordina').change(function(){
    // se questa è selezionata
    if($(this).is(":checked")) {
      ordinaAlbum(url, template_disco_function);
    } else {
      visualizzazioneIniziale(url, template_disco_function);
    }
  });
});


// quando apro il sito, visualizzazione base
function visualizzazioneIniziale(url, template_disco_function){
  // dopo aver cliccato resetto con l'option di default
  $('select option').first().prop('selected', true);
  // svuoto il container della section
  $('.dischi .container').empty();
  // resetto la input checkbox
  $('.ordina').prop('checked', false);

  // chiamata ajax
  $.ajax({
    'url': url,
    'method': 'GET',
    'success': function(data){
      var dischi = JSON.parse(data);
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
    },
    'error': function(){
      alert('Si è verificato un errore');
    }
  });
}

// quando cambio l'option della select
function cercaAlbumArtista(url, dischi, template_disco_function){
  $('select').change(function(){
    $('.dischi .container').empty();
    // resetto la input checkbox
    $('.ordina').prop('checked', false);
    // prendo il value dell'artista selezionato
    var artista_selezionato = $(this).children("option:selected").val();
    var handlebars_album;
    // se ho selezionato qualcosa di diverso dalla prima option
    if(artista_selezionato != ''){
      for (var key in dischi) {
        // controllo se l'artista del disco che sto guardando è = all'artista selezionato
        if (dischi[key]['artista'] == artista_selezionato) {
          handlebars_album = {
            copertina: dischi[key]['copertina'],
            titolo: dischi[key]['titolo'],
            artista: dischi[key]['artista'],
            anno: dischi[key]['anno']
          };
          var html = template_disco_function(handlebars_album);
          $('.dischi .container').append(html);
        }
      }
    } else {
      // se riseleziono 'Scegli l'artista'
      visualizzazioneIniziale(url, template_disco_function);
    }


  });
}

// quando clicco 'Ordina per data'
function ordinaAlbum(url, template_disco_function){
  // dopo aver cliccato resetto con l'option di default
  $('select option').first().prop('selected', true);

  // chiamata ajax
  $.ajax({
    'url': url,
    'method': 'GET',
    'success': function(data){
      // svuoto il container
      $('.dischi .container').empty();
      var dischi = JSON.parse(data);
      // array vuoto che popolerò dopo
      var sortable = [];
      // pusho nell'array che sarò così
      // 0: Array(2)
      //   0: {copertina: "../img/bonjovi.jpg", titolo: "New Jersey", artista: "Bon Jovi", anno: "1988"}
      //   1: "1988"
      // 1: Array(2)
      //   0: {copertina: "../img/queen.jpg", titolo: "Live at Wembley 86", artista: "Queen", anno: "1992"}
      //   1: "1992"
      // e così via
      for (var disco in dischi) {
        sortable.push([dischi[disco], dischi[disco]['anno']]);
      }
      // funzione per ordinare in base all'anno
      sortable.sort(function(a, b) {
          return a[1] - b[1];
      });

      var handlebars_album;
      // prendo la chiave in sortable, es. sortable[key] mi restituisce un array con 2 elementi, il primo con tutti i dati dell'album, il secondo con l'anno
      // sortable[key][0] mi restituisce tutti i dati dell'album, es. {copertina: "../img/bonjovi.jpg", titolo: "New Jersey", artista: "Bon Jovi", anno: "1988"}
      // sortable[key]['titolo'] mi restituisce il singolo parametro dell'album, es. New Jersey
      for (var key in sortable) {
        // per la visualizzazione nel template
        handlebars_album = {
          copertina: sortable[key][0]['copertina'],
          titolo: sortable[key][0]['titolo'],
          artista: sortable[key][0]['artista'],
          anno: sortable[key][0]['anno']
        };
        var html = template_disco_function(handlebars_album);
        $('.dischi .container').append(html);
      }
    },
    'error': function(){
      alert('Si è verificato un errore');
    }
  });
}
