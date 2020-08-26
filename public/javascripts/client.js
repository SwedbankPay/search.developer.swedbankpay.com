var search = document.querySelector('#search');
var code = document.querySelector('pre');

search.addEventListener('keyup', function () {
  if (search.value == "")
    return;
  var xhr = new XMLHttpRequest;
  xhr.open('GET', '/search/?query=' + search.value, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      code.textContent = xhr.responseText;
    }
  };
  xhr.send();
}, false);