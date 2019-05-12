document.addEventListener('DOMContentLoaded', function() {
  //Activate Sidebar Nav
  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        //Load Menu List Link
        document.querySelectorAll('.topnav, .sidenav').forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // register the event listener for every menu link
        document
          .querySelectorAll('.sidenav a, .topnav a')
          .forEach(function(elm) {
            elm.addEventListener('click', function(evt) {
              //close the sidenav
              var sidenav = document.querySelector('.sidenav');
              M.Sidenav.getInstance(sidenav).close();

              //load the content of the called page
              page = event.target.getAttribute('href').substr(1);
              console.log('load navigation of ' + page);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  var page = window.location.hash.substr(1);
  if (page == '') page = 'home';
  loadPage(page);

  function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        var content = document.querySelector('#body-content');
        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = '<p>Halaman tidak ditemukan</p>';
        } else {
          content.innerHTML = '<p>Ups.. Halaman tidak dapat diakses</p>';
        }
      }
    };
    console.log('will show ' + page);
    xhttp.open('GET', 'pages/' + page + '.html', true);
    xhttp.send();
  }
});
