let getPost = async (id) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts/` + id, options)
    const json = await response.json();
    // console.log(json)
    return json
  } catch (err) {
    console.log('Error getting documents', err)
  }
}

let PostShow = {
  render : async () => {
    let request = Utils.parseRequestURL()
    let post = await getPost(request.id)

    return /*html*/`
            <section class="section">
                <h1> Post Id : ${post.id}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.content} </p>
                <p> Post Author : ${post.name} </p>
            </section>
        `
  }
  , after_render: async () => {
  }
}

let routes = {
  '/': null,
  '/videos': PostShow
};

const router = async () => {
  let request = Utils.parseRequestURL();
  console.log(request);

  let parsedURL =
      (request.resource ? '/' + request.resource : '/') +
      (request.id ? '/:id' : '') +
      (request.verb ? '/' + request.verb : '');

  let page = routes[parsedURL];
  console.log(routes[parsedURL]);

  getFromPHP();

  const content = document.getElementById('content-container');
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

const getFromPHP = () => {
  fetch('../php/posts.php', {
    method: 'get',
    // may be some code of fetching comes here
  }).then(function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response.text()
    }
    throw new Error(response.statusText)
  })
  .then(function(response) {
    console.log(response);
  })
};


const Utils = {
  parseRequestURL: () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/");
    let request = {
      resource: null,
      id: null,
      verb: null
    };

    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request
  },
  sleep: (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
