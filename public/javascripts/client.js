var search = document.querySelector('#search');
var code = document.querySelector('pre');
var size = document.querySelector('#size')
var page = document.querySelector('#page')

search.addEventListener('keyup', function () {
  if (search.value == "")
    return;
  var xhr = new XMLHttpRequest;
  xhr.open('GET', `/search/?q=${encodeURI(search.value)}&size=${size.value}&page=${page.value}`, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var json = JSON.parse(xhr.responseText)
      code.textContent = JSON.stringify(json.hits, undefined, 2);
      console.log(json.total);
    }
  };
  xhr.send();
}, false);
