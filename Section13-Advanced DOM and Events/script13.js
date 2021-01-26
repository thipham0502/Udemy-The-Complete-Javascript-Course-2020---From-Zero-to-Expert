'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function(event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// btnsOpenModal is the result of quertSelector() --> has type NodeList --> iterable
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
// Use forEach instead of for loop
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* Lec180. How the DOM Really Works */
console.log('----------Lec180----------');
// DOM tree is generated from an HTML document. DOM contains lots of methods and properties to interact with DOM tree
// Every single node in the DOM tree is type 'Node', each node is represented in Js by an object and can get access to special methods & properties such as: .textContent, .childNodes, .parentNode, .cloneNode(), etc.
// 'Node''s parent node is 'EventTarget', provides methods: .addEventListener(), .removeEventListener()
// 'EventTarget' has another child: 'Window' - a global object, lots of methods and properties, maybe unrelated to DOM
// 'Node' has some child types: 'Element', 'Text', 'Comment', 'Document' (everything in the HTML has to go into DOM)
//// *Text: text inside an element gets its own node, which is type 'Text'
//// (Ex: <p>My paragraph</p> => Text: "My paragraph")
//// *Comment: (Ex: <!--My comment--> => Comment: "My comment")
//// *Document: provides methods: *.querySelector()*, createElement(), .getElementById(), etc.
//// *Element: the element itself (Ex: <p>My paragraph</p> => Element: <p></p>)
////// => Properties: .innerHTML, .classList, .children, .parentElement, etc.
////// => Methods: .append(), .remove(), .insertAdjacentHTML(), *.querySelector()*, .closest(), .matches(), .scrollIntoView(), .setAttribute(), etc.
////// 'Element' has some child types: Element -> HTMLElement -> HTMLButtonElement (for buttons)
//////                                                        -> HTMLDivElement (for divs)
//////                                                        -> ... (for links, images, etc)
////// (Each HTML element has it own type which is a child type of type 'HTMLElement'. For example, buttons has type 'HTMLButtonElement', ... Each type has some different unique properties, ex: image has 'src' attribute)
// NOTE: Child objects can inherit from it parent's properties and methods (ex: 'HTMLElement' can have access to .innerHTML of 'Element', .cloneNode() of 'Node', and .addEventListener() of 'EventTarget'. Because 'EventTarget' (.addEventListener()) has child 'Node' (.cloneNode()) has child 'Element' (.innerHTML) has child 'HTMLElement')
// **See photo "How-DOM-API-is-Organized-Behind-the-Scene.png"**

/* Lec181. Selecting, Creating, and Deleting Elements */
console.log('----------Lec181----------');
// *Select

console.log(document.documentElement); // Select the whole document element (all HTML content)
console.log(document.head); // Select the head element <head></head>
console.log(document.body); // Select the body element <body></body>

const header = document.querySelector('.header');
console.log(header); // Select 1st element with a class/id name
console.log(document.querySelectorAll('.section')); // Select multiple elements with same class/id name --> return a NodeList

console.log(document.getElementById('section--1')); // Select element by Id
console.log(document.getElementsByClassName('btn')); // Select element by class name
console.log(document.getElementsByTagName('button')); // Select all elements with a tag --> return a HTMLCollection

// *Create and insert elements
/// Method 1: .insertAdjacentHTML: see scriptProject.js
const message = document.createElement('div'); //create a DOM element with 'div' tag
message.classList.add('cookie-message'); //add class name to the element
// message.textContent = 'We use cookied for improved functionality and analytics.'; //only text inside element
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'; //HTML content (including tags)
// header.prepend(message); //add new element as the 1st child of 'header'
header.append(message); //add new element as the last child of 'header'
// NOTE: Each element can only be inserted once (because every DOM element iss unique and so cannot appear at multiple places in the document)
// --> We can use prepend & append to insert and then move the element inside the document

/// **What if we want to insert multiple copies of the same element?
// header.append(message.cloneNode(true)); //make a clone of the element ('true' means we copy of all its child elements)

// header.before(message); //insert an element before the <header>
// header.after(message); //insert an element after the <header>

// *Delete elements
/// Delete the element 'message' when clicking the btn
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function() {
    message.remove(); //remove the element directly
    // message.parentElement.removeChild(message); //remove the element by moving up to its parent -> remove its child (same as message.remove(), but a bit cumbersome 😅)
  });

/* Lec182. Styles, Attributes and Classes */
console.log('----------Lec182----------');
// *Styles
/// Set in-line style in the DOM element, not in CSS
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

/// Get style (can only get in-line style, not CSS style)
console.log(message.style.width); //120%
console.log(message.style.color); //empty (because it's in CSS stylesheet)
console.log(message.style.height); //empty (because not exists)

/// Get the real style appearing on the page (even if it's not declared in CSS)
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); //'50px'

/// Change style
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 20 + 'px';
// (result of getComputedStyle(message).height = '50px' is a string --> use parseInt or parseFloat to take out number 50, and then add 20 and unit 'px' --> '70px')

/// Change CSS property (see ':root' element in style13.css)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// *Attributes (ex: <img> has 'src', 'alt', 'class', ... ; <a> has href, ...)
/// Get attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); //get alt
console.log(logo.className); //get class
console.log(logo.src); //get src (absolute URL)
console.log(logo.getAttribute('src')); //get src (relative URL)
// Absolute URL: "http://127.0.0.1:5500/Section13-Advanced%20DOM%20and%20Events/img/logo.png"
// Relative URL: img/logo.png (same as defined in <img>)

const link = document.querySelector('.nav__link--btn');
// <a class="nav__link nav__link--btn btn--show-modal" href="#">Open account</a>
console.log(link.href); //get href (absolute URL)
console.log(link.getAttribute('href')); //get href (relative URL)
// Absolute URL: "http://127.0.0.1:5500/Section13-Advanced%20DOM%20and%20Events/index13.html#"
// Relative URL: # (same as defined in <a>)

/// Get non-standard attributes (attributes defined by us)
// Ex: <img
//   src="img/logo.png"
//   alt="Bankist logo"
//   class="nav__logo"
//   id="logo"
//   designer="Kathy" //non-standard attribute (defined by me)
// />;
console.log(logo.getAttribute('designer'));

/// Set attributes
logo.alt = 'My Logo';
logo.setAttribute('designer', 'Thi'); //set value for non-standard attribute
logo.setAttribute('company', 'Bankist'); //create and set value for new non-standard attribute

// *Data attributes (used to store data in the interface (the HTML code))
// Ex: <img
//   src="img/logo.png"
//   alt="Bankist logo"
//   class="nav__logo"
//   id="logo"
//   designer="Kathy"
//   data-version-number="3.0" //data attribute (always starts with 'data-')
// />;
console.log(logo.dataset.versionNumber); //'versionNumber' is the camel case for 'version-number'

// *Classes
logo.classList.add('class1', 'class2');
console.log(logo.classList); //["nav__logo", "class1", "class2"]
/*
logo.className = 'new-class'; //remove all existing classes and replace with ONE new class (dont use!)
console.log(logo.classList); //["new-class"] */

logo.classList.remove('class1');
logo.classList.toggle('class1'); //remove if exists and add if not
// .toggle(<class name>, <force>): if force is true, add class (same as add()). If force is false, remove class (same as remove())
// console.log(logo.classList.toggle('class2')); //check if class exists after calling toggle()
console.log(logo.classList.contains('class1'));

/* Lec183. Implementing Smooth Scrolling */
console.log('----------Lec183----------');
// Click the button and smoothly scroll to a section
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(event) {
  // Get the coordinates of the element we are scrolling to
  // Includes: x, y, width, height, left, right, top, bottom (coordinates may change when we scroll the page)
  const sec1Coords = section1.getBoundingClientRect();
  console.log(sec1Coords);

  // event.target: btnScrollTo (the event's activator)
  console.log(event.target.getBoundingClientRect()); //get coordinates of btnScrollTo

  // Get current scroll position
  console.log('Current scroll position (X/Y)', pageXOffset, pageYOffset);

  // Get current page size
  console.log(
    'Height/Width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling to section 1
  // .scrollTo(<x>, <y>)
  // x,y = current scroll position of the page + current position (coordinates) of the element
  // window.scrollTo(
  //   sec1Coords.left + window.pageXOffset,
  //   sec1Coords.top + window.pageYOffset
  // );

  // Smooth scrolling to section 1
  /// Method 1:
  // window.scrollTo({
  //   left: sec1Coords.left + window.pageXOffset,
  //   top: sec1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });

  /// Method 2: (works in modern browsers)
  section1.scrollIntoView({ behavior: 'smooth' });
});

/* Lec184. Types of Events and Event Handlers */
console.log('----------Lec184----------');
// See more: https://developer.mozilla.org/en-US/docs/Web/Events

// *Add event
let h1 = document.querySelector('h1');
/// Method 1
// mouseenter: when hover the mouse over an element
// h1.addEventListener('mouseenter', function(event) {
//   alert('addEventListener: You are reading the heading');
// });

/// Method 2
// h1.onmouseenter = function(event) {
//   alert('.onmouseenter: You are reading the heading');
// };

// NOTE: Using .addEventListener, we can add multiple events to the element. While using method 2, each element can only have 1 event (method 2 will overwrite the existing event)
// Moreover, using .addEventListener, we can remove the event from the element. But first we need to create a named function for the event
const alert_h1 = function(event) {
  alert('addEventListener: You are reading the heading!');

  h1.removeEventListener('mouseenter', alert_h1); //remove event
};
h1.addEventListener('mouseenter', alert_h1);

/// Remove the event after 3 seconds
setTimeout(() => h1.removeEventListener('mouseenter', alert_h1), 3000);

/// Method 3: Add directly on the HTML element (see index13.html, line 37). But not encouraged

/* Lec185. Event Propagation: Bubbling and Capturing */
console.log('----------Lec185----------');
// When activate an event of the child element --> also activate the event of the parent element

// Ex:
// <div class="parent">
//   <div class="child">
//     abc
//   </div>
// </div>
// "parent" has 'click' event that changes the background color
// "child" has 'click' event that changes the text color

// --> When we click "child" --> "child"'s text color is changed AND "parent"'s background color is also changed (the event originates from the child element, and then bubbles up to its parent element --> Propagation)
// --> When we click "parent" --> only "parent"'s background color is also changed

/* Lec186. Event Propagation in Practice */
/*
console.log('----------Lec186----------');
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); //true
  // e.target: where the event first happened
  // e.currentTarget: the element attaching the event (the current element)

  // *Stop the propagation*
  // e.stopPropagation(); //clicking this child element will not affect nor activate parent elements
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  this.style.color = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
  console.log(e.currentTarget === this); //true
  // e.target: where the event first happened
  // e.currentTarget: the element attaching the event (the current element)
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
  console.log(e.currentTarget === this); //true
  // e.target: where the event first happened
  // e.currentTarget: the element attaching the event (the current element)
});

// NOTE: e.target is the element we have clicked:
// Ex: When we click '.nav__link' --> All 3 e.target are '.nav__link';
/// When we click '.nav__links' --> Show e.target = '.nav__links' for CONTAINER & NAV;
/// When we click '.nav' --> Show e.target = '.nav' for only NAV;

// NOTE: 1 element is listening to 2 events: the event of itself, and the event bubbling up from its child elements
*/

/* Lec187. Event Delegation: Implementing Page Navigation */
console.log('----------Lec187----------');
// Page navigation
/*
document.querySelectorAll('.nav__link').forEach(function(elem) {
  // Attach the click event for each '.nav__link' element
  elem.addEventListener('click', function(e) {
    e.preventDefault(); //prevent default navigation
    const id = this.getAttribute('href'); //get 'href' attribute
    console.log(id); //the section id to scroll to

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  });
  // NOTE: Doing so is not a clean solution because we are creating the same function for every element. What if we have 1000 elements? This will impact the performance
  // Solution: *Event Delegation*
});
*/

// *Event Delegation*
/// Step 1: Add event listener to the parent element of all the child elements we want to add event
document.querySelector('.nav__links').addEventListener('click', function(e) {
  // '.nav__links' is the parent of '.nav__link'
  // console.log('e.target', e.target);
  e.preventDefault(); //prevent default navigation

  /// Step 2: Checking if the e.target contains '.nav__link' (i.e. when we click the nav__link)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); //get 'href' attribute
    console.log(id); //the section id to scroll to
    // Do the smooth scrolling
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    });
  }
});

/* Lec188. DOM Traversing */
console.log('----------Lec188----------');
h1 = document.querySelector('h1');

// *Going downwards: parent to child
console.log(h1.querySelectorAll('.highlight')); //select all child elements of h1 with 'highlight' class
/// NOTE: querySelector()/querySelectorAll() can allow to go deeper (Ex: child of child of child...), not just select the direct child

console.log(h1.childNodes); //get all direct children (text, comment and child HTML elements)
console.log(h1.children); //get all direct HTML element children (return a HTMLCollection)

console.log(h1.firstElementChild); //get the first child HTML element
// h1.firstElementChild.style.color = 'white';
console.log(h1.firstChild); //get the first child (can be text, comment, and doesnt have to be a HTML element) (not often used)

console.log(h1.lastElementChild); //get the last child element
// h1.lastElementChild.style.color = 'orangered';
console.log(h1.lastChild); //get the last child (can be text, comment, and doesnt have to be a HTML element) (not often used)

// *Going upwards: child to parent
console.log(h1.parentNode); //get direct parent
console.log(h1.parentElement); //get direct parent

console.log(h1.closest('.header')); //select the closest parent of h1 with class="header"
// h1.closest('.header').style.background = 'var(--gradient-secondary)'; //(see ':root' element in style13.css)

console.log(h1.closest('h1')); //select the closest parent of h1 that is h1 itself

// NOTE:        h1.querySelector()              <>                  h1.closest()
//    Finds children (no matter how deep)             Finds parents (no matter how far up)

// *Going sideways: siblings (same parent, same level)
console.log(h1.previousElementSibling); //get the previous siblings (=null in this case)
console.log(h1.nextElementSibling); //get the next siblings (=<h4>A simpler banking experience for a simpler life.</h4> in this case)

console.log(h1.parentElement.children); //select all siblings of h1, including itself (returns a HTMLCollection)

const siblings = [...h1.parentElement.children]; //HTMLCollection is iterable, so we can turn it into an array using spread operator '...'
console.log(siblings);
siblings.forEach(function(elem) {
  // Compare element & element
  if (elem !== h1) {
    // elem.style.transform = 'scale(0.5)'; //set size 50% smaller, except for h1 element
  }
});

/* Lec189. Building a Tabbed Component */
console.log('----------Lec189----------');
// Each tab has a different content

// Select eLements to work with (in <div class="operations"></div>)
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Add event to each element
// tabs.forEach(tab => tab.addEventListener('click', () => console.log('TAB')));
// NOTE: This is a bad practive because we are making a copy for the event callback function on each element. If we have 1000 elements --> 1000 copies of 1 function --> Slow performance 👎 (already mentioned in Lec187 --> use *Event Delegation* instead)

tabsContainer.addEventListener('click', function(e) {
  // const clicked = e.target; //get the element we click on
  // There is a <span> inside the button, so we use .closest() to get its closest parent with class '.operations__tab'. If it's already the tab we want, then simply return itself
  const clicked = e.target.closest('.operations__tab'); //get the button
  console.log(clicked);

  // Because this click event is attach to the whole tab-container, so we should prevent from clicking on other space outside the button
  // Guard clause: when we don't click on the button, but click on somewhere else in the tab-container, 'clicked' will be null. So when 'clicked' is null, we do nothing and return immediately
  if (!clicked) return;

  // *Activate button: When button 1 is clicked, it becomes active, and all other buttons are inactive
  /// First, we remove active class from all tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

  /// Then, we set active class to the right tab
  clicked.classList.add('operations__tab--active');

  // *Activate tab content: When button 1 is clicked, tab content 1 becomes active, and all other tabs are inactive
  /// According to the button's 'data-tab' attribute to get the id number of the corresponding tab content
  /// 'data-tab' is a data attribute, which always starts with the word 'data', and then follows with '-<name>'. To access it, we use .dataset.<name>
  console.log(clicked.dataset.tab); //'tab' is the name of the data attribute
  /// First, we remove active class from all tabs
  tabsContent.forEach(tab =>
    tab.classList.remove('operations__content--active')
  );
  /// Then, we set active class to the right tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
