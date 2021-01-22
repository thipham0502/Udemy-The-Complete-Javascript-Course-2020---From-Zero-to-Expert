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
const h1 = document.querySelector('h1');
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

  h1.removeEventListener('mouseenter', alert_h1);
};
h1.addEventListener('mouseenter', alert_h1);
///
setTimeout();
