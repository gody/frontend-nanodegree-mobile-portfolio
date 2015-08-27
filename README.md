##Udacity Website Optimization Project for Front-end Nanodegree

The current directory contains the Website Optimization Project for [Udacity Front-end Nanodegree](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).

To run this project, all the code sources are in the root folder and in the img, css, js and views (here is the pizza site source code) folders. The node_modules, contains the grunt modules used for website optimization such as uglify, htmlmin, cssmin and imageoptim.

Finally, the production site is being hosted inside the build directory and you can access the portfolio at index.html inside the build folder. A link to the final version is [here](http://gody.github.io/frontend-nanodegree-mobile-portfolio/build/). For accessing the pizza site, you can look at build/views/pizza.html or directly in this [link](http://gody.github.io/frontend-nanodegree-mobile-portfolio/build/views/pizza.html).

###Part 1: Pagespeed optimization

For optimazing the index.html page to improve pagespeed insight score, a couple of steps were taken:

1. Resize images for max size used in webpage layout.

2. Set up a grunt enviroment to automate certain tasks such as:
	1. Imageoptim: optimeze images for web pages.
	2. Javascript Uglify: Use for compress javascript files
	3. CSSmin: Use for compress css files
	4. HTMLmin: Use for compress html files
	5. All process are made in the source files and store in the build directory mantaining the website structure

3. Put same CSS code for not render block the above the fold content
4. Async load of google web fonts

Results of the pagespeed insight [here](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fgody.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fbuild%2F).

###Part 2: 60 - FPS Pizza page

For achieving 60 FPS in the Pizzas [website](http://gody.github.io/frontend-nanodegree-mobile-portfolio/build/views/pizza.html), improve in rendering is needed to be done.

1. As the DevTools shows up. At first, a lot of time is used in javascript functions, specifically in the updatePositions() function. The part that needed refactoring is shown.

```
var items = document.querySelectorAll('.mover');
for (var i = 0; i < items.length; i++) {
	var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
	items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
}
```
To optimize this, I move out the static calculation outside the for loop, improving the FPS as the calculations are reduce to 1 instead of 200 every time the page is scroll. The resulted code is shown.
```
var items = document.querySelectorAll('.mover');
var scrollDistance = document.body.scrollTop / 1250; // Move out of the for loop!!
for (var i = 0; i < items.length; i++) {
  var phase = Math.sin(scrollDistance + (i % 5));
  items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
}
```

2. Next, I reduce the amount of pizzas loaded in the back. The default is set to be 200! As this is a large number, and no more than de 20% is needed, I cut the production of slider pizzas depending on the size (height) of the browser where the page is being render. The resulting code shown below, breaks out of the loop when a new line is going to be generated below the render area.

```
document.addEventListener('DOMContentLoaded', function() {
	var cols = 8;
	var s = 256;
	var maxHeight = window.innerHeight; // Obtain total height to display, from this point forward do no create pizzas
	for (var i = 0; i < 200; i++) {
	  var elem = document.createElement('img');
	  elem.className = 'mover';
	  elem.src = "images/pizza.png";
	  elem.style.height = "100px";
	  elem.style.width = "73.333px";
	  elem.basicLeft = (i % cols) * s;
	  var top = (Math.floor(i / cols) * s);
	  if (top > maxHeight){ break; } // If the pizza is going to render outside the screen, don't create it
	  elem.style.top = top + 'px';
	  document.querySelector("#movingPizzas1").appendChild(elem);

	}
	updatePositions();
}
 ```

3. The last improvement is to achive the load time when resizing pizzas. Here the problem is in the layout-style order in the resizing function. To solve this, I noted that all the pizzas are going to be the same size, so calculating the new size each time inside of the loop is not an option. Taking this out, reduces in 10x the load time.
Code improvement shown below.

```
  function changePizzaSizes(size) {
    var allPizzas = document.querySelectorAll(".randomPizzaContainer");
    var dx = determineDx(allPizzas[1], size);
    var newwidth = (allPizzas[1].offsetWidth + dx) + 'px';
    for (var i = 0; i < allPizzas.length; i++) {
      allPizzas[i].style.width = newwidth;
    }
  }
```