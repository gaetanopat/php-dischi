<!-- <?php include 'data.php' ?> -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="public/css/app.css">
    <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
    <title></title>
  </head>
  <body>
    <header>
      <div class="container">
        <i class="fab fa-spotify"></i>
      </div>
    </header>

    <section class="dischi">
      <div class="container">
        <!-- visualizzazione col php-->
        <!-- <?php foreach ($dischi as $disco){ ?>
          <div class="card">
            <img src="<?php echo $disco['copertina'] ?>">
            <h4><?php echo $disco['titolo'] ?></h4>
            <h5><?php echo $disco['artista'] ?></h5>
            <h5><?php echo $disco['anno'] ?></h5>
          </div>
        <?php } ?> -->
      </div>
    </section>
    <script src="public/js/app.js"></script>
    <!-- template handlebars-->
    <script id="template_disco" type="text/x-handlebars-template">
      <div class="card">
        <img src="{{copertina}}">
        <h4>{{titolo}}</h4>
        <h5>{{artista}}</h5>
        <h5>{{anno}}</h5>
      </div>
    </script>
  </body>
</html>
