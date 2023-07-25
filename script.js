
const canvas = document.createElement("canvas");
const $ = canvas.getContext('2d');
const body = document.body;
body.appendChild(canvas);

const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
const plus = document.getElementById("plus");


let width = canvas.width = body.style.width = window.innerWidth;
let height = canvas.height = body.style.height =  window.innerHeight;
let check = 0;


function reformat() {
  width = canvas.width = body.style.width = window.innerWidth;
  height = canvas.height = body.style.height =  window.innerHeight;
}

function setup() {

  setTimeout(function() {
        
        toggle.style.background="rgba(255, 255, 255, 0.5)";
        toggle.style.transition="5s";
  }, 250);

  setTimeout(function() {
        
        toggle.style.boxShadow = "0px 0px 100px 1px #fff";
        toggle.style.transition="3s";
  }, 1000);
  
  toggle.addEventListener("click", () => {

    if(check==0){
      menu.style.transform="scale(3)";
      plus.style.transition="0.7s";
      plus.style.transform="rotate(225deg)";
      check=1;
      toggle.style.boxShadow = "0px 0px 10px 1px #fff";
      toggle.style.transition="0.7s";

    }
    else{
      menu.style.transform="scale(0)";
      plus.style.transform="rotate(0deg)";
      check=0;
      toggle.style.boxShadow = "0px 0px 100px 1px #fff";
      toggle.style.transition="0.7s";
    }
  });


  window.addEventListener("resize", reformat);

}

setup();
