const axios = require('axios').default;

setInterval(() => {
    axios.get('http://backend:8080/gamers/adding/money/random')
    .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, 1000);