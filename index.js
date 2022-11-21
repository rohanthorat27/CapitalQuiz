function game()
{
var clicked=false;
var timer;
var sec;

fetch('capitals.json').then(response => {
    return response.json();
  }).then(data => {

    var wrong=false; 
    var capitalArray=[];                                      //Capital Array
    var countryArray=[] ;                                      //Country Array
    var correctOption;                                        //Correct index in arrays
    var score=0;          
    var highScore=0;
    var unique=[];                                            //to ensure no country appears twice
    var uniqueOptions=[];                                     //to ensure every option is different
    
    function randomGenerator()                                //to choose 4 random countries and a correct answer
    {
        do{                                                   
        for(i=0; i<4; i++)
        {
            do{
            var n=Math.floor(Math.random()*197);
            capitalArray[i]=data[n].city;
            countryArray[i]=data[n].country;
            }while(uniqueOptions.includes(n));
            uniqueOptions.push(n);
        }
        uniqueOptions=[];
        correctOption=Math.floor(Math.random()*4);
        }while(unique.includes(countryArray[correctOption]));
        unique.push(countryArray[correctOption]);
        if(unique.length==197)
        {
          unique=[];
        }
    }

    function audioCorrect()
    {
      var audio = new Audio('audios/Bing-sound.mp3');
      audio.play();
    }

    function audioWrong()
    {
      var audio1 = new Audio('audios/Error-sound-effect.mp3');
      audio1.play();
    }

    function startGame()
    {
      randomGenerator();
      document.addEventListener('click', function(){
        if(!clicked)
        {
          setTimer();
        }
        clicked=true;
        if(wrong==false)
        {
          document.querySelector("#question").textContent=countryArray[correctOption];
        }
        for(i=0; i<4; i++)
        { 
            document.querySelectorAll(".box")[i].textContent=capitalArray[i];
            if(wrong==false)
            {
              document.querySelectorAll(".box").forEach(el=>el.classList.remove("hide"));
            }
        }
      })
      document.addEventListener('keypress', function(){
        if(!clicked)
        {
          setTimer();
        }
        clicked=true;
        if(wrong==false)
        {
          document.querySelector("#question").textContent=countryArray[correctOption];
        }
        for(i=0; i<4; i++)
        { 
            document.querySelectorAll(".box")[i].textContent=capitalArray[i];
            if(wrong==false)
            {
              document.querySelectorAll(".box").forEach(el=>el.classList.remove("hide"));
            }
        }
      })
    }

    function rightAnswer()
    {
      document.getElementById('timer').innerHTML='10';
      randomGenerator();
      if(clicked)
      {
        clearInterval(timer);
        setTimer();
      }
      if(wrong==false)
      {
        document.querySelector("#question").textContent=countryArray[correctOption];
      }
      for(i=0; i<4; i++)
       { 
          document.querySelectorAll(".box")[i].textContent=capitalArray[i];
       }
       document.querySelectorAll(".box").forEach(el=>el.classList.remove("hide"));
       document.querySelector("#play").classList.add("hide");
    }

    function checkHighScore()
    {
      if(score>highScore)
      {
        document.querySelector("#highScore").textContent="High Score: "+score;
        highScore=score;
      }
    }

    function wrongAnswer()
    {
      clearInterval(timer);
      wrong=true;
      document.querySelector("#correctAnswer").classList.remove("hide");
      document.querySelector("#question").classList.add("wrong");
      document.querySelector("#correctAnswer").textContent='The Correct Answer is '+capitalArray[correctOption]+'!';
      checkHighScore();
      document.querySelector("#question").textContent='Wrong Answer!';
      document.querySelectorAll(".box").forEach(el=>el.classList.add("hide"));
      document.querySelector("#play").classList.remove("hide");
      document.querySelector("#play").addEventListener('click', function(){
        wrong=false;
        document.querySelector("#correctAnswer").classList.add("hide");
        document.querySelector("#question").classList.remove("wrong");
        score=0;
        document.querySelector("#score").textContent="Score: "+score;
        rightAnswer();
      });
    }

    function timeExceeded()
    {
      wrongAnswer();
      audioWrong();
      document.querySelector("#question").textContent='Time Exceeded!';
    }

    function setTimer(){
      sec = 9;
      document.getElementById('timer').classList.remove("wrong");
      clicked=true;
          timer = setInterval(function(){
          document.getElementById('timer').innerHTML=sec;
          sec--;
          if(sec<3)
          {
            document.getElementById('timer').classList.add("wrong");
          }
          if (sec < -1) {
              clearInterval(timer);
              document.getElementById('timer').innerHTML='0';
              timeExceeded();
          }
      }, 1000);
    }    

    function gameFinished()
    {
      wrong=true;
      clearInterval(timer);
      document.querySelector("#question").textContent='Congratulations! You Won!';
      document.querySelector("#score").textContent="Score: 197";
      document.querySelectorAll(".box").forEach(el=>el.classList.add("hide"));
      document.querySelector("#play").classList.remove("hide");
      document.querySelector("#play").addEventListener('click', function(){
        wrong=false;
        score=0;
        highScore=197;
        document.querySelector("#score").textContent="Score: "+score;
        document.querySelector("#highScore").textContent="High Score: "+highScore;
        rightAnswer();
      });
    }

    function chooseAnswer()
    {
      startGame();
      document.querySelectorAll(".box").forEach(item=>{
        item.addEventListener('click', function(e)
        {
          if(e.target.textContent==capitalArray[correctOption])  
          {
            audioCorrect();
            score++;
            rightAnswer();
            if(score==197)
            {
              gameFinished();
            }
          }
          else
          {
            audioWrong();
            wrongAnswer();
          }
          document.querySelector("#score").textContent="Score: "+score;
        })
      })
    }

    chooseAnswer();

  }).catch(err => {
    alert('Error');
  });
}

game();

  