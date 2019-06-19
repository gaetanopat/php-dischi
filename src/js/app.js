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

  // codice da clonare
  var album = $('#template_disco').html();
  // funzione compilatrice
  var template_disco_function = Handlebars.compile(album);

  // chiamata ajax
  $.ajax({
    'url': 'http://localhost:8888/php-dischi/data.php',
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
});
