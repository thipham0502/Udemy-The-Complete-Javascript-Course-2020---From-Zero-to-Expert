!function(){function e(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return n(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}var t=[{owner:"Jonas Schmedtmann",movements:[200,455.23,-306.5,25e3,-642.21,-133.9,79.97,1300],movementsSorted:[],interestRate:1.2,pin:1111,movementsDates:["2019-11-18T21:31:17.178Z","2019-12-23T07:42:02.383Z","2020-01-28T09:15:04.904Z","2020-04-01T10:17:24.185Z","2021-01-08T14:11:59.604Z","2021-01-09T17:01:17.194Z","2021-01-10T23:36:17.929Z","2021-01-11T10:51:36.790Z"],movementsDatesSorted:[],currency:"EUR",locale:"pt-PT"},{owner:"Jessica Davis",movements:[5e3,3400,-150,-790,-3210,-1e3,8500,-30],movementsSorted:[],interestRate:1.5,pin:2222,movementsDates:["2019-11-01T13:15:33.035Z","2019-11-30T09:48:16.867Z","2019-12-25T06:04:23.907Z","2020-01-25T14:18:46.235Z","2020-02-05T16:33:06.386Z","2020-04-10T14:43:26.374Z","2020-06-25T18:49:59.371Z","2020-07-26T12:01:20.894Z"],movementsDatesSorted:[],currency:"USD",locale:"en-US"},{owner:"Steven Thomas Williams",movements:[200,-200,340,-300,-20,50,400,-460],movementsSorted:[],interestRate:.7,pin:3333,movementsDates:["2019-12-01T13:15:33.035Z","2019-11-30T09:48:16.867Z","2019-12-15T06:04:23.907Z","2020-01-11T03:28:46.235Z","2020-03-05T16:23:06.386Z","2020-04-10T14:43:26.374Z","2020-06-25T15:49:59.371Z","2020-07-06T12:01:20.894Z"],movementsDatesSorted:[],currency:"VND",locale:"vi-VN"},{owner:"Sarah Smith",movements:[430,1e3,700,50,90],movementsSorted:[],interestRate:1,pin:4444,movementsDates:["2019-12-01T13:15:33.035Z","2019-11-30T09:48:16.867Z","2019-12-15T06:04:23.907Z","2020-01-11T03:28:46.235Z","2020-03-05T16:23:06.386Z","2020-04-10T14:43:26.374Z","2020-06-25T15:49:59.371Z","2020-07-06T12:01:20.894Z"],movementsDatesSorted:[],currency:"USD",locale:"en-GB"}],o=document.querySelector(".welcome"),r=document.querySelector(".date"),c=document.querySelector(".balance__value"),l=document.querySelector(".summary__value--in"),a=document.querySelector(".summary__value--out"),u=document.querySelector(".summary__value--interest"),s=document.querySelector(".timer"),m=document.querySelector(".app"),i=document.querySelector(".movements"),v=document.querySelector(".login__btn"),f=document.querySelector(".form__btn--transfer"),d=document.querySelector(".form__btn--loan"),g=document.querySelector(".form__btn--close"),y=document.querySelector(".btn--sort"),p=document.querySelector(".login__input--user"),_=document.querySelector(".login__input--pin"),S=document.querySelector(".form__input--to"),T=document.querySelector(".form__input--amount"),h=document.querySelector(".form__input--loan-amount"),b=document.querySelector(".form__input--user"),D=document.querySelector(".form__input--pin"),w=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];i.innerHTML="";var t,o,r=[];if(n){for(var c=0;c<A.movements.length;c++)r.push({movement:A.movements[c],date:A.movementsDates[c]});r.sort((function(e,n){return e.movement-n.movement}));for(var l=0;l<r.length;l++)A.movementsSorted[l]=r[l].movement,A.movementsDatesSorted[l]=r[l].date;t=A.movementsSorted,o=A.movementsDatesSorted}else t=A.movements,o=A.movementsDates;t.forEach((function(n,t){var r=n>0?"deposit":"withdrawal",c=(Math.floor(h.value),Z(new Date(o[t]),e.locale)),l=L(n,e.locale,e.currency),a='\n            <div class="movements__row">\n\t\t\t\t<div class="movements__type movements__type--'.concat(r,'">').concat(t+1," ").concat(r,'</div>\n\t\t\t\t<div class="movements__date">').concat(c,'</div>\n                <div class="movements__value">').concat(l,"</div>\n            </div>");i.insertAdjacentHTML("afterbegin",a)}))};function Z(e,n){var t,o,r=(t=new Date,o=e,Math.round(Math.abs(o-t)/864e5));return console.log("daysPassed = ".concat(r)),0===r?"Today":1===r?"Yesterday":r<=7?"".concat(r," days ago"):new Intl.DateTimeFormat(n).format(e)}function L(e,n,t){var o={style:"currency",currency:t};return new Intl.NumberFormat(n,o).format(e)}console.log("----------Lec148----------");var q=function(e){var n="";return e.toLowerCase().split(" ").forEach((function(e){n+=e[0]})),n};console.log(q("Steven Thomas Williams")),q=function(e){return e.toLowerCase().split(" ").map((function(e){return e[0]})).join("")},console.log(q("Steven Thomas Williams")),q=function(e){return e.toLowerCase().split(" ").map((function(e){return e[0]})).join("")},console.log(q("Steven Thomas Williams")),(q=function(e){e.forEach((function(e){e.username=e.owner.toLowerCase().split(" ").map((function(e){return e[0]})).join("")}))})(t),console.log(t),console.log("----------Lec150----------");console.log("----------Lec152----------");var C=function(e){w(e),function(e){e.balance=e.movements.reduce((function(e,n){return e+n}),0),c.textContent=L(e.balance,e.locale,e.currency)}(e),function(e){console.log("___Incomes___");var n=e.movements.filter((function(e){return e>0})).reduce((function(e,n){return console.log("".concat(e," + ").concat(n," = ").concat(e+n)),e+n}),0);l.textContent=L(n,e.locale,e.currency),console.log("___Outcomes___");var t=e.movements.filter((function(e){return e<0})).reduce((function(e,n){return console.log("".concat(e," + ").concat(n," = ").concat(e+n)),e+n}),0);a.textContent=L(Math.abs(t),e.locale,e.currency),console.log("___Interests___");var o=e.movements.filter((function(e){return e>0})).map((function(n){return n*e.interestRate/100})).filter((function(e,n,t){return console.log(t),e>=1})).reduce((function(e,n){return e+n}),0);u.textContent=L(o,e.locale,e.currency),console.log(n,t,o)}(e)};console.log("----------Lec154----------"),console.log(t);var I,A,E,x=t.find((function(e){return"Jessica Davis"===e.owner}));console.log(x);for(var k=0,M=t;k<M.length;k++){var O=M[k];if("Jessica Davis"===O.owner){I=O;break}}console.log(I),console.log("----------Lec155----------");var R=function(){var e=300,n=function(){var n=String(Math.trunc(e/60)).padStart(2,0),r=String(e%60).padStart(2,0);s.textContent="".concat(n,":").concat(r),e<0&&(clearInterval(t),o.textContent="Log in to get started",m.style.opacity=0),e--};n();var t=setInterval(n,1e3);return t};v.addEventListener("click",(function(e){if(e.preventDefault(),A=t.find((function(e){return e.username===p.value&&e.pin===Number(_.value)}))){m.style.opacity=100,o.textContent="Welcome back, ".concat(A.owner.split(" ")[0],"!");var n=A.locale;console.log("My locale: ".concat(n));var c=new Date;r.textContent=new Intl.DateTimeFormat(n,{weekday:"short",day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"numeric"}).format(c),p.value=_.value="",p.blur(),_.blur(),E&&clearInterval(E),E=R(),C(A)}else m.style.opacity=0,o.textContent="Wrong username or password!";console.log(p.value,_.value,A)})),console.log("----------Lec156----------"),f.addEventListener("click",(function(e){e.preventDefault();var n=Number(T.value),o=t.find((function(e){return e.username===S.value}));console.log(n,o),n>0&&o&&n<=A.balance&&o.username!==A.username?(console.log("Doing the transfer..."),A.movements.push(-n),o.movements.push(n),A.movementsDates.push((new Date).toISOString()),o.movementsDates.push((new Date).toISOString()),C(A),T.value=S.value="",T.blur(),S.blur(),clearInterval(E),E=R()):console.log("NOT VALID AMOUNT OR RECEIVER!")})),console.log("----------Lec157----------"),g.addEventListener("click",(function(e){if(e.preventDefault(),console.log(b.value,A.username,D.value,A.pin),b.value===A.username&&D.value==A.pin){var n=t.findIndex((function(e){return e.username===A.username&&e.pin===A.pin}));t.splice(n,1),console.log(t),b.value=D.value="",b.blur(),D.blur(),m.style.opacity=0,o.textContent="Log in to get started"}else console.log("Wrong Confirmation Information! Can't close this account!")})),console.log("----------Lec158----------"),d.addEventListener("click",(function(e){e.preventDefault(),console.log("----------Lec167----------");var n=Math.floor(h.value);n>0&&A.movements.some((function(e){return e>=.1*n}))?(console.log("3 seconds left..."),setTimeout((function(){return console.log("2 seconds left...")}),1e3),setTimeout((function(){return console.log("1 seconds left...")}),2e3),setTimeout((function(){A.movements.push(n),A.movementsDates.push((new Date).toISOString()),C(A),h.value="",h.blur(),clearInterval(E),E=R()}),3e3),setTimeout((function(){return console.log("Loan successfully!")}),3e3)):console.log("You cannot request this amount of loan!")})),console.log("----------Lec159----------");var N=t.map((function(e){return e.movements}));console.log(N);var j=N.flat();console.log(j);var U=j.reduce((function(e,n){return e+n}),0);console.log(U);var W=t.map((function(e){return e.movements})).flat().reduce((function(e,n){return e+n}),0);console.log(W);var J=t.flatMap((function(e){return e.movements})).reduce((function(e,n){return e+n}),0);console.log(J),console.log("----------Lec160----------");var V=!1;y.addEventListener("click",(function(e){e.preventDefault(),w(A,!V),V=!V})),console.log("----------Lec161----------"),c.addEventListener("click",(function(){console.log("Return values of .querySelectorAll()"),console.log(document.querySelectorAll(".movements__value"));var n=Array.from(document.querySelectorAll(".movements__value"),(function(e){return Number(e.textContent.replace("€",""))}));console.log("movementsUI"),console.log(n);var t=e(document.querySelectorAll(".movements__value")).map((function(e){return Number(e.textContent.replace("€",""))}));console.log("movementsUI2"),console.log(t);var o=n.reduce((function(e,n){return e+n}));console.log("Sum of all movements:"),console.log(o)})),console.log("----------Lec168----------"),document.querySelector(".logo").addEventListener("click",(function(){console.log("----------Clicked----------"),e(document.querySelectorAll(".movements__row")).forEach((function(e,n){n%2==0&&(e.style.backgroundColor="yellow")}))}))}();
//# sourceMappingURL=scriptProject.b5e35b38.js.map
