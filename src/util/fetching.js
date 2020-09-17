
function fetching(
  url,
  {
    method="POST",
    body={},
    data={},
    headers={}
  }
  
) {
  const pramas = {}

  if (method === 'POST') {
    pramas.body = JSON.stringify(body)
    pramas.headers = {
      ...headers,
      'Content-Type': 'application/json'
    }
  } else if(method === 'GET'){
    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
    pramas.headers = {
      ...headers,
    }
  }



  return fetch(url, pramas)
    .then(response => response.json())
    .catch((err) => {
      console.log('err', err)
    })
}

export default fetching