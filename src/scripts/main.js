document.getElementById('reviews-page-link').addEventListener('click', () => {
  console.log('clicked')
  onNavItemClick('reviews');
});

let redirect404 = () => {
  var segmentCount = 0;
  var location = window.location;
  location.replace(
      location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') +
      location.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
      location.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
      (location.search ? '&q=' + location.search.slice(1).replace(/&/g, '~and~') : '') +
      location.hash
  );
}

let recieveRedirect = () => {
  (function(location) {
    if (location.search) {
      console.log(location);
      var q = {};
      location.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
            location.pathname.slice(0, -1) + (q.p || '') +
            (q.q ? ('?' + q.q) : '') +
            location.hash
        );
      }
    }
  }(window.location));
};

recieveRedirect();

let contentDiv = document.getElementById('content');

let homepage = `
<h2> Hi, I am the homepage :)</h2>
`

let reviewsPage = `
<h2> asdfasdfasdfasdfasdcxfasdfasdfasdf</h2>
`

let routes = {
  '/': homepage,
  '/reviews': reviewsPage
};

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
}

let onNavItemClick = (pathName) => {
  console.log(pathName);
  console.log(window.location.pathname);
  console.log(window.location.origin);
  console.log(window.location.origin + pathName)
  console.log(window.location.origin + '/#/' + pathName)
  window.history.pushState({}, pathName, window.location.origin + '/#/' + pathName);
  contentDiv.innerHTML = routes[pathName];
}

contentDiv.innerHTML = routes[window.location.pathname];


