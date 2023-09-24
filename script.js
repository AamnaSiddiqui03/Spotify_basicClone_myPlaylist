console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Saudebaazi - Aakarosh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" , duration: "05:55"},
    {songName: "Chahun main ya na - Arjit singh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" , duration: "04:01"},
    {songName: "Saranga Dariya - Sai pallavi", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "04:00"},
    {songName: "Roke na ruke naina", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" , duration: "04:39"},
    {songName: "Daaru Badnaam", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "04:01"},
    {songName: "Ye Tune Kya Kiya [Slowed-Reverb]", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "06:23"},
    {songName: "Pretty Woman", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "05:30"},
    {songName: "Heeriye- Jasleen Royal", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" , duration: "03:19"},
    {songName: "Behti hawa se tha woh", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" , duration: "05:14"},
    {songName: "Mere Humsafar - ost", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "05:52"},
    {songName: "Baarishein - Anuv Jain", filePath: "songs/11.mp3", coverPath: "covers/10.jpg",duration: "03:28"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.querySelectorAll('.durationstamp')[0].innerText= songs[i].duration;
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlays();
        gif.style.opacity = 0;

    }
})


// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    // console.log(progress); 
    myProgressBar.value = progress;

    if(myProgressBar.value>=100){
        if(songIndex>=9){
            songIndex = 0
        }
        else{
            songIndex += 1;
        }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    
})



myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
       console.log(e.target)
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        
        if(audioElement.paused || audioElement.currentTime<=0 || songIndex!=sind){
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
      
        audioElement.currentTime = 0;
        
        audioElement.play();
        gif.style.opacity = 1;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        sind=songIndex;
        }

      else{
        audioElement.pause();
     
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-play-circle');
        e.target.classList.remove('fa-pause-circle');
        gif.style.opacity = 0;
   
        
      }
      
       
        


        
        
        
       

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})