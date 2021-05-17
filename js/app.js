'use strict';
let askUser=Number(prompt("Please put the number of items do you want to pick"));

let attempts = 0;

let maxAttepts=askUser;
let attempEl=document.getElementById('attempts');

let busMall=[];
let busImagesNames = [];
let busClicks = [];
let busViews = [];
let newImg=[];
function busMallimg(busmallName){
    this.busmallName=busmallName.split('.')[0];
    this.busmallsource='img/'+busmallName;
    this.clicks=0;
    this.views=0;
  
    busMall.push(this);
    busImagesNames.push(this.busmallName);

    
}

let busImg=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg'];

for(let i=0;i<busImg.length;i++){

    new busMallimg(busImg[i]);
}
function displayImg(){
    return Math.floor(Math.random()*busMall.length)
}


let liftImg=document.getElementById('leftImg');
let middleImg=document.getElementById('middleImg');
let rightImg=document.getElementById('rightImg');

let   leftImgIndex;
let   middleImgIndex;
let   rightImgIndex;
function renderImg() {
    leftImgIndex = displayImg();
    middleImgIndex=displayImg();
    rightImgIndex = displayImg();

    while (leftImgIndex === rightImgIndex || leftImgIndex===middleImgIndex || rightImgIndex===middleImgIndex || newImg[0]=== leftImgIndex || newImg[1]===leftImgIndex || newImg[2]===leftImgIndex || newImg[0]=== rightImgIndex ||newImg[1]=== rightImgIndex ||newImg[2]=== rightImgIndex || newImg[0]=== middleImgIndex||newImg[1]=== middleImgIndex||newImg[2]=== middleImgIndex ) {
        leftImgIndex = displayImg();
        middleImgIndex=displayImg();
        rightImgIndex = displayImg();
    }
    liftImg.setAttribute('src',busMall[leftImgIndex].busmallsource);
    liftImg.setAttribute('title', busMall[leftImgIndex].busmallsource);
    busMall[leftImgIndex].views++;

    middleImg.setAttribute('src',busMall[middleImgIndex].busmallsource);
    middleImg.setAttribute('title', busMall[middleImgIndex].busmallsource);
    busMall[middleImgIndex].views++;

    rightImg.setAttribute('src',busMall[rightImgIndex].busmallsource);
    rightImg.setAttribute('title', busMall[rightImgIndex].busmallsource);
    busMall[rightImgIndex].views++;
    attempEl.textContent=attempts;
    
    newImg[0]=leftImgIndex;
    newImg[1]=rightImgIndex;
    newImg[2]=middleImgIndex;

}
renderImg();
liftImg.addEventListener('click', handelClicks);
middleImg.addEventListener('click', handelClicks);
rightImg.addEventListener('click', handelClicks);

function handelClicks(event){
    attempts++;
    if (attempts<=maxAttepts){
    if (event.target.id === 'leftImg') {
        busMall[leftImgIndex].clicks++;}
    else if (event.target.id === 'middleImg') {
        busMall[middleImgIndex].clicks++;
    }else if (event.target.id === 'rightImg') {
        busMall[rightImgIndex].clicks++;
    }

    renderImg();
}else {
  /*  let ulEl = document.getElementById('results');
    let liEl;
    for (let i = 0; i < busMall.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${busMall[i].busmallName} has ${busMall[i].views} views and has ${busMall[i].clicks} clicks.`
    }*/
    liftImg.removeEventListener('click', handelClicks);
    middleImg.removeEventListener('click', handelClicks);
    rightImg.removeEventListener('click', handelClicks);
   
}

}
function myFunction() {
    
    let ulEl = document.getElementById('results');
    let liEl;
    for (let i = 0; i < busMall.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${busMall[i].busmallName} has ${busMall[i].views} views and has ${busMall[i].clicks} clicks.`
        busClicks.push(busMall[i].clicks);
        busViews.push(busMall[i].views);
    } chartRender();
  }

  function chartRender() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busImagesNames,
            datasets: [{
                label: '# of Clicks',
                data: busClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 3
            }, {
                label: '# of Views',
                data: busViews,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
