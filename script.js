const startBtn = document.getElementById("startBtn");
const music = document.getElementById("music");

const welcome = document.getElementById("welcome");
const cakeSection = document.getElementById("cakeSection");
const letterSection = document.getElementById("letterSection");
const gallerySection = document.getElementById("gallerySection");
const endingSection = document.getElementById("endingSection");

const typedText = document.getElementById("typedText");

const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");

createBalloons();

startBtn.addEventListener("click", async () => {

  music.play();

  welcome.classList.add("hidden");
  cakeSection.classList.remove("hidden");

  startMic();
});

secretBtn.addEventListener("click", () => {
  secretMessage.classList.remove("hidden");
});

function createBalloons(){

  const container = document.getElementById("balloons");

  for(let i=0;i<25;i++){

    const balloon=document.createElement("div");

    balloon.className="balloon";
    balloon.innerHTML="🎈";

    balloon.style.left=Math.random()*100+"%";

    balloon.style.animationDuration=
      8+Math.random()*8+"s";

    balloon.style.animationDelay=
      Math.random()*5+"s";

    container.appendChild(balloon);
  }
}

async function startMic(){

  try{

    const stream =
      await navigator.mediaDevices.getUserMedia({
        audio:true
      });

    const context =
      new AudioContext();

    const analyser =
      context.createAnalyser();

    const source =
      context.createMediaStreamSource(stream);

    source.connect(analyser);

    const data =
      new Uint8Array(
        analyser.frequencyBinCount
      );

    let completed=false;

    function check(){

      analyser.getByteFrequencyData(data);

      const volume =
        data.reduce((a,b)=>a+b,0)
        / data.length;

      if(volume > 40 && !completed){

        completed=true;

        document
          .querySelectorAll(".flame")
          .forEach(flame=>{
            flame.style.display="none";
          });

        confetti({
          particleCount:250,
          spread:180
        });

        setTimeout(showLetter,1500);
      }

      requestAnimationFrame(check);
    }

    check();

  }catch(err){

    alert(
      "Please allow microphone access."
    );
  }
}

function showLetter(){

  cakeSection.classList.add("hidden");
  letterSection.classList.remove("hidden");

  const letter = `Dear Lei,

Happy Birthday ❤️

Before anything else, I hope you know how proud I am of you.

Life hasn't always been easy, and there have been moments that tested your strength in ways most people will never fully understand.

Yet despite everything you have endured, you are still the Lei that I know — kind, genuine, caring, funny, and capable of bringing warmth to the people around you.

I admire your resilience more than you realize.

Thank you for the memories we've shared, the conversations we've had, and the countless little moments that made ordinary days special.

You deserve good things.

You deserve people who appreciate you.

You deserve every reason to smile today.

And no matter where life takes you, I will always be cheering for you.

Happy Birthday, Lei. 🎂✨

Love,

Your Best Friend ❤️`;

  let index = 0;

  const timer = setInterval(()=>{

    typedText.textContent += letter[index];

    index++;

    if(index >= letter.length){

      clearInterval(timer);

      setTimeout(showGallery,2500);
    }

  },30);
}

function showGallery(){

  letterSection.classList.add("hidden");
  gallerySection.classList.remove("hidden");

  setTimeout(()=>{
    gallerySection.classList.add("hidden");
    endingSection.classList.remove("hidden");
  },12000);
}
