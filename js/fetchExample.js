//introduction into JavaScript fetch API
var request = new XMLHttpRequest();
request.onload = function() {
  var data = JSON.parse(this.responseText);
  console.log(data);
};

request.onerror = function() {
  console.log('Error : -S', error);
};

request.open('get', 'https://readerapi.codepolitan.com/articles', true);
request.send();

//implementasi fetch dengan promise (Then, catch)
fetch('https://readerapi.codepolitan.com/articles')
  .then(function(response) {
    if (response.status !== 200) {
      console.log('Error : ' + response.status);
      return;
    }

    response.json().then(function(data) {
      console.log(data);
    });
  })
  .catch(function(error) {
    console.log('Error : ' + error);
  });

fetch('https://readerapi.codepolitan.com/articles')
  .then(function(response) {
    console.log('============================= Chaining Promise =============');
    if (response.status !== 200) {
      console.log('Error : ' + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Promise.resolve akan Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }
  })
  .then(function(response) {
    // Mengembalikan sebuah Promise berupa objek/array JavaScript
    // yang diubah dari teks JSON.
    return response.json();
  })
  .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    console.log(data);
  })
  .catch(function(error) {
    // Parameter error berasal dari Promise.reject()
    console.log('Error : ' + error);
  });

// region separate promise method
function status(response) {
  if (response.status !== 200) {
    console.log('Error : ' + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
function json(response) {
  // Mengembalikan sebuah Promise berupa objek/array JavaScript
  // yang diubah dari teks JSON.
  return response.json();
}
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log('Error : ' + error);
}
fetch('https://readerapi.codepolitan.com/articles')
  .then(status)
  .then(json)
  .then(function(data) {
    // Objek/array JavaScript dari response.json() masuk lewat data.
    console.log(data);
  })
  .catch(error);
// endregion separate promise method

/**
 * References : 
 * https://davidwalsh.name/fetch
https://developers.google.com/web/updates/2015/03/introduction-to-fetch
https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api
https://alligator.io/js/fetch-api/ https://developers.google.com/web/fundamentals/primers/service-workers/
https://github.com/deanhume/progressive-web-apps-book/blob/master/chapter-3/progressive-times/sw.js
 */
