const logError = (ret) => {
  if (ret.code !== 20000) {
    alert(ret.body);
    return;
  }

  return Promise.resolve(ret.body);
}

const get = (url) => {
  var myInit = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
  };

  var myRequest = new Request(url);

  return fetch(myRequest, myInit).then(function (response) {
    return response.json().then(logError);
  });
}

const post = (url, params) => {
  var myHeaders = new Headers({
    "Content-Type": "application/json"
  });

  var myInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(params)
  };

  var myRequest = new Request(url);

  return fetch(myRequest, myInit).then(function (response) {
    return response.json().then(logError);
  });
}

export { get, post };