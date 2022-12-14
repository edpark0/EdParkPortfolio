window.addEventListener("resize", resizeToggleMenu);
window.addEventListener("DOMContentLoaded", resizeToggleMenu);
document.querySelector("#mobile-menu").addEventListener('click', toggleMenu);

const menu = document.querySelector('#menu-body');

function toggleMenu() {
    if(menu.classList.contains('hide')) {
        menu.classList.remove('hide');
        menu.classList.add('clearfix');
    } else {
        menu.classList.add('hide');
        menu.classList.remove('clearfix');
    }
}

function resizeToggleMenu() {
    if (window.innerWidth >= 700) {
        menu.classList.remove("hide");
        menu.classList.remove('clearfix');
    } else {
        menu.classList.add("hide");
    }
}

function validateSubmission() {
  const isRecaptchaChecked = (grecaptcha.getResponse()) ? true : false;
  const reCaptchaPrompt = document.querySelector('#recaptchaRequired');

  if (isRecaptchaChecked) { 
    // alert("VALIDATION RETURNED TRUE");
    reCaptchaPrompt.style.display = "none";
    return true;
  } else {
    // alert("VALIDATION RETURNED FALSE");
    reCaptchaPrompt.style.display = "inline-block";
    reCaptchaPrompt.textContent = "*Please complete reCAPTCHA*";
    return false;
  }
}

const introPhrases = ['Hello! My name is Ed.',
                    'Welcome to the site!', 
                    'Have an awesome day!'];
const introPhraseCount = introPhrases.length;
const introSkipMax = 20;
const introSpeed = 65;
let introSubstring = "";
let introPhraseCounter = 0;
let introSubstringIndex = 0;
//true => typing animation; false => backspacing animation
let introIsTyping = true;
let introSkipCounter = 0;

function typingIntro() {
  setInterval(function () {
    if (introIsTyping) {
      if (introSubstringIndex >= introPhrases[introPhraseCounter].length) {
        //this is to delay backspace animation so users can read text
        introSkipCounter++;

        if (introSkipCounter === introSkipMax) {
          introIsTyping = false;
          introSkipCounter = 0;
        }
      }
    }
    else {
      if (introSubstringIndex === 0) {
        introIsTyping = true;
        introPhraseCounter++;

        //Reset to first phrase in array
        if (introPhraseCounter >= introPhraseCount) {
          introPhraseCounter = 0;
        }
      }
    }

    introSubstring = introPhrases[introPhraseCounter].substr(0, introSubstringIndex);

    if (introSkipCounter === 0) {
      introIsTyping ? introSubstringIndex++ : introSubstringIndex--;
    }
    
    $('.typing-words').text(introSubstring);
  }, introSpeed);
};

$(document).ready(function () {
  typingIntro();
});
