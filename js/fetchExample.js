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


  