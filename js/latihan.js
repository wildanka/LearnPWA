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
