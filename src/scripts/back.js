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
  console.log(routes);
  contentDiv.innerHTML = routes[window.location.pathname];
}

let onNavItemClick = (pathName) => {
  console.log(pathName);
  console.log(window.location.pathname);
  console.log(window.location.origin);
  console.log(window.location.origin + pathName)
  console.log(window.location.origin + '/#/' + pathName)
  window.history.pushState({}, pathName, window.location.origin + '/#/' + pathName);
  console.log(routes);
  contentDiv.innerHTML = routes[pathName];
}

contentDiv.innerHTML = routes[window.location.pathname];

<!DOCTYPE html>
<html>
<head>
<title>Programmer Gains</title>

<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Michael Chaffins">
    <meta name="description" content="Site about programming, fitness, and content reviews.">
    <meta name="keywords" content="HTML, CSS, JavaScript, Angular, Material, books, lifting, nutrition">

    <link rel="stylesheet" type="text/css" href="./styles/main.css">
    </head>
    <body>

    <header>
    <h1>Programmer Gains</h1>
<nav id="main-navigation">
    <span id="posts-link" class="nav-links">Posts</span>
    <span class="nav-divider">|</span>
    <a class="nav-links" href="#">Videos</a>
    <span class="nav-divider">|</span>
    <span id="reviews-page-link" class="nav-links" href="#">Reviews</span>
    <span class="nav-divider">|</span>
    <a class="nav-links" href="#">About</a>
    </nav>
    </header>

    <section>
    <div id="content">
    <article> Loading....</article>
</div>
</section>


<script src="./scripts/main.js"></script>
    <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script></body>
</html>
