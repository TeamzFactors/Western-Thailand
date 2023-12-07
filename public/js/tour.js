// navbar
var menuHolder = document.getElementById('menuHolder')
var siteBrand = document.getElementById('siteBrand')
function menuToggle(){
  if(menuHolder.className === "drawMenu") menuHolder.className = ""
  else menuHolder.className = "drawMenu"
}
if(window.innerWidth < 426) siteBrand.innerHTML = "MAS"
window.onresize = function(){
  if(window.innerWidth < 420) siteBrand.innerHTML = "MAS"
  else siteBrand.innerHTML = "TIEWTOK"
}

// ------------------------------------------------------------------------------------------

// 3D Box
const nodes = [].slice.call(document.querySelectorAll('li'), 0);
const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
const classNames = ['in', 'out'].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));

const getDirectionKey = (ev, node) => {
  const { width, height, top, left } = node.getBoundingClientRect();
  const l = ev.pageX - (left + window.pageXOffset);
  const t = ev.pageY - (top + window.pageYOffset);
  const x = l - width / 2 * (width > height ? height / width : 1);
  const y = t - height / 2 * (height > width ? width / height : 1);
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

class Item {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('mouseover', ev => this.update(ev, 'in'));
    this.element.addEventListener('mouseout', ev => this.update(ev, 'out'));
  }

  update(ev, prefix) {
    this.element.classList.remove(...classNames);
    this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
  }}


nodes.forEach(node => new Item(node));

// ------------------------------------------------------------------------------------------

// Map
const card = document.querySelector('.map-card-container');
const cardBody = card.querySelector('.card-body');

card.addEventListener('click', () => {
  cardBody.classList.toggle('closed')
})

const cards = document.querySelectorAll('.map2');

cards.forEach(card => {
  const cardBody = card.querySelector('.card-body');

  card.addEventListener('click', () => {
    cardBody.classList.toggle('closed');
  });
});

// ------------------------------------------------------------------------------------------

// // Like Count Kan
// function updateClickCount(placeId) {
//   fetch('/updateClickCount', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ placeId })
//   })
//   .then(response => {
//     if (response.ok) {
//       console.log('Click count updated successfully!');
//       return response.json();
//     } else {
//       throw new Error('Failed to update click count');
//     }
//   })
//   .then(data => {
//     // นำข้อมูล clickCount ที่ได้รับมาแสดงในหน้าเว็บ
//     console.log('Click count:', data.clickCount); // เพิ่มเป็นการแสดงผลทาง console สำหรับตรวจสอบเท่านั้น สามารถเปลี่ยนเป็นการแสดงผลที่หน้าเว็บได้ตามต้องการ

//     alert('👍🏻' + data.clickCount);
//   })
//   .catch(error => {
//     console.error('Error updating click count:', error);
//   });

// }


// Like Count
function updateClickCount(placeId) {
  fetch('/updateClickCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ placeId })
  })
  .then(response => {
    if (response.ok) {
      console.log('Click count updated successfully!');
      return response.json();
    } else {
      throw new Error('Failed to update click count');
    }
  })
  .then(data => {
    const showLikeElement = document.querySelector(`#showLike${placeId}`);
    if (showLikeElement) {
      showLikeElement.innerHTML = `👍🏻 ${data.clickCount}`;
    } else {
      console.error(`Element with id "showLike${placeId}" not found`);
    }
  })
  .catch(error => {
    console.error('Error updating click count:', error);
  });

}


// เพิ่ม event listener บน element หลักที่ครอบทุกปุ่ม
document.addEventListener('click', function(event) {
  // ตรวจสอบว่าปุ่มที่คลิกอยู่เป็นปุ่ม Like หรือไม่
  if (event.target.matches('#like-button1')) {
    updateClickCount(1);
  } else if (event.target.matches('#like-button2')) {
    updateClickCount(2);
  } else if (event.target.matches('#like-button3')) {
    updateClickCount(3);
  } else if (event.target.matches('#like-button4')) {
    updateClickCount(4);
  } else if (event.target.matches('#like-button5')) {
    updateClickCount(5);
  } else if (event.target.matches('#like-button6')) {
    updateClickCount(6);
  } else if (event.target.matches('#like-button7')) {
    updateClickCount(7);
  } else if (event.target.matches('#like-button8')) {
    updateClickCount(8);
  } else if (event.target.matches('#like-button9')) {
    updateClickCount(9);
  } else if (event.target.matches('#like-button10')) {
    updateClickCount(10);
  } else if (event.target.matches('#like-button11')) {
    updateClickCount(11);
  } else if (event.target.matches('#like-button12')) {
    updateClickCount(12);
  } else if (event.target.matches('#like-button13')) {
    updateClickCount(13);
  } else if (event.target.matches('#like-button14')) {
    updateClickCount(14);
  } else if (event.target.matches('#like-button15')) {
    updateClickCount(15);
  } else if (event.target.matches('#like-button16')) {
    updateClickCount(16);
  } else if (event.target.matches('#like-button17')) {
    updateClickCount(17);
  } else if (event.target.matches('#like-button18')) {
    updateClickCount(18);
  } else if (event.target.matches('#like-button19')) {
    updateClickCount(19);
  } else if (event.target.matches('#like-button20')) {
    updateClickCount(20);
  } else if (event.target.matches('#like-button21')) {
    updateClickCount(21);
  } else if (event.target.matches('#like-button22')) {
    updateClickCount(22);
  } else if (event.target.matches('#like-button23')) {
    updateClickCount(23);
  } else if (event.target.matches('#like-button24')) {
    updateClickCount(24);
  } else if (event.target.matches('#like-button25')) {
    updateClickCount(25);
  } else if (event.target.matches('#like-button26')) {
    updateClickCount(26);
  } else if (event.target.matches('#like-button27')) {
    updateClickCount(27);
  } else if (event.target.matches('#like-button28')) {
    updateClickCount(28);
  } else if (event.target.matches('#like-button29')) {
    updateClickCount(29);
  } else if (event.target.matches('#like-button30')) {
    updateClickCount(30);
  } else if (event.target.matches('#like-button31')) {
    updateClickCount(31);
  } else if (event.target.matches('#like-button32')) {
    updateClickCount(32);
  } else if (event.target.matches('#like-button33')) {
    updateClickCount(33);
  } else if (event.target.matches('#like-button34')) {
    updateClickCount(34);
  } else if (event.target.matches('#like-button35')) {
    updateClickCount(35);
  } else if (event.target.matches('#like-button36')) {
    updateClickCount(36);
  } else if (event.target.matches('#like-button37')) {
    updateClickCount(37);
  } else if (event.target.matches('#like-button38')) {
    updateClickCount(38);
  } else if (event.target.matches('#like-button39')) {
    updateClickCount(39);
  } else if (event.target.matches('#like-button40')) {
    updateClickCount(40);
  } else if (event.target.matches('#like-button41')) {
    updateClickCount(41);
  } else if (event.target.matches('#like-button42')) {
    updateClickCount(42);
  } else if (event.target.matches('#like-button43')) {
    updateClickCount(43);
  } else if (event.target.matches('#like-button44')) {
    updateClickCount(44);
  } else if (event.target.matches('#like-button45')) {
    updateClickCount(45);
  } else if (event.target.matches('#like-button46')) {
    updateClickCount(46);
  } else if (event.target.matches('#like-button47')) {
    updateClickCount(47);
  } else if (event.target.matches('#like-button48')) {
    updateClickCount(48);
  } else if (event.target.matches('#like-button49')) {
    updateClickCount(49);
  } else if (event.target.matches('#like-button50')) {
    updateClickCount(50);
  }
});

// ------------------------------------------------------------------------------------------

// Feedback Form 
  // connect Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaTvwRZqbFtxpSgBqCke1rK1elOxDodTM",
  authDomain: "tourist-attraction-80139.firebaseapp.com",
  projectId: "tourist-attraction-80139",
  storageBucket: "tourist-attraction-80139.appspot.com",
  messagingSenderId: "854932461956",
  appId: "1:854932461956:web:118182f225e73e7cc125d1",
  measurementId: "G-2S4YH9BYMP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form each Province
function submitForm(formId, collectionName) {

  const currentURL = window.location.pathname;

  // กำหนด formId และ collectionName ตาม URL
  if (currentURL === '/travel_Tak') {
    formId = 'addFormTak';
    collectionName = 'FeedbackTak';
  } else if (currentURL === '/travel_Kan') {
    formId = 'addFormKan';
    collectionName = 'FeedbackKan';
  } else if (currentURL === '/travel_Rat') {
    formId = 'addFormRat';
    collectionName = 'FeedbackRat';
  } else if (currentURL === '/travel_Prac') {
    formId = 'addFormPrac';
    collectionName = 'FeedbackPrac';
  } else if (currentURL === '/travel_Phet') {
    formId = 'addFormPhet';
    collectionName = 'FeedbackPhet';
  }
  console.log(formId, collectionName)

  const form = document.getElementById(formId);
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = form.fb.value.trim();
    const selectedOption = document.querySelector('input[name="options"]:checked');
    const selectedEmotion = selectedOption ? selectedOption.value : null;
    const currentTime = new Date();
    const timestamp = currentTime.toISOString();

    if (message === "") {
      alert("Please enter a message before submitting.");
    } else {
      addDoc(collection(db, collectionName), {
        message: message,
        emotion: selectedEmotion,
        time: timestamp
      });

      // reset after submit
      form.fb.value = "";
      if (selectedOption) {
        selectedOption.checked = false;
      }

    console.log(collectionName + ": ", message, selectedEmotion, timestamp);

      alert("Thank you for your feedback!!\nWe'll create more content soon.");
    }

  });
}
submitForm("", "");

// ------------------------------------------------------------------------------------------

// Reset Button (Feedback)
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", function (event) {
  const selectedOption = document.querySelector('input[name="options"]:checked');
  if (selectedOption) {
    selectedOption.checked = false;
  }
});

// ------------------------------------------------------------------------------------------

// Back to Top
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
