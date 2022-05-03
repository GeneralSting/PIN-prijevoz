const slider = document.querySelector(".slider");               //slider
const nextBtn = document.querySelector(".next-btn");           
const prevBtn = document.querySelector(".prev-btn");
const slides = document.querySelectorAll(".slide");             //slike
const slideIcons = document.querySelectorAll(".slide-icon");    //div elementi koji postaju aktivni
const numberOfSlides = slides.length;
var slideNumber = 0;

//image slider next button
nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });                                                          //AKTIVNOST->SLAJD SE PRIKAZUJE
                                                               //kada element dobije klasu active on preuzima radnje iz css za klasu active
  slideNumber++;

  if(slideNumber > (numberOfSlides - 1)){
    slideNumber = 0;
  }

  slides[slideNumber].classList.add("active");                //dodavanje slici, slajdu aktivnost,
  slideIcons[slideNumber].classList.add("active");            //dodavanje div elementu aktivnost,
});

//image slider previous button
prevBtn.addEventListener("click", () => {                      //obrnuto od gornjeg primjera
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIcons.forEach((slideIcon) => {
    slideIcon.classList.remove("active");
  });

  slideNumber--;

  if(slideNumber < 0){
    slideNumber = numberOfSlides - 1;
  }

  slides[slideNumber].classList.add("active");
  slideIcons[slideNumber].classList.add("active");
});

//image slider autoplay
var playSlider;

var repeater = () => {
  playSlider = setInterval(function(){
    slides.forEach((slide) => {
      slide.classList.remove("active");           //micanje aktivnosti kako slajdu proteklo vrijeme
    });
    slideIcons.forEach((slideIcon) => {
      slideIcon.classList.remove("active");
    });

    slideNumber++;

    if(slideNumber > (numberOfSlides - 1)){
      slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");          //davanje slajdu aktivnost koja ce trajati 6 sekundi, zatim ce se i njemu oduzeti.
    slideIcons[slideNumber].classList.add("active");
  }, 6000);
}
repeater();

//stop the image slider autoplay on mouseover
slider.addEventListener("mouseover", () => {
  clearInterval(playSlider);
});

//start the image slider autoplay again on mouseout
slider.addEventListener("mouseout", () => {
  repeater();
});
