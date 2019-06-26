var helloWorld = function(name) {
  return new Promise((resolve, reject) => {
    if (name === '' || name === undefined || name === null) {
      reject('You have to provide the name!');
    } else {
      var message = 'Hello world, ' + name;
      resolve(message);
    }
  });
};

function triggerPromise(input) {
  console.log(helloWorld(input));
  // output jika null atau empty: You have to provide the name!

  helloWorld('Wildan K')
    .then(function(result) {
      // jika promise dapat menyelesaikan tasknya maka dia akan masuk ke dalam blok then
      console.log(result);
    })
    .catch(function(error) {
      // jika promise tidak dapat menyelesaikan tasknya maka dia akan masuk ke dalam blok catch
      console.log(error);
    });
  // output: Wildan K
}

function addMarketkoin(message) {
  return message + ' from Marketkoingit!';
}

/**
 * Seperti yang telah dijelaskan sebelumnya, ada kalanya kita ingin mengeksekusi method lain. Setelah proses pertama, kita dapat gunakan lagi then() setelah then() yang pertama. Misal seperti ini:
 */
function nestingThen() {
  helloWorld('Wildan Si Tamvan')
    .then(function(result) {
      // logic for processing first message here.
      return result;
    })
    .then(function(result2) {
      var message = addMarketkoin(result2);
      console.log(message);
    })
    .catch(function(error) {
      console.log(error);
    });
}
