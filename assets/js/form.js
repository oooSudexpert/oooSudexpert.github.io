const apiUrl = 'https://api.sudexpert.ooo';

fetch(apiUrl)
.then(function(response) {
  console.log(response.text());
})
.catch(function(error) {
  console.log('Looks like there was a problem: ', error);
});

/*
(async () => {
  const rawResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({a: 1, b: 'Textual content'})
  });
  const content = await rawResponse.json();

  console.log(content);
})();
*/