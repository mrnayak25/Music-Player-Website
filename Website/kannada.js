let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRDHxxkCXyNZ9BdJhDlZKpOkLu2FZHmh8",
    authDomain: "auth-form-2eb89.firebaseapp.com",
    databaseURL: "https://auth-form-2eb89-default-rtdb.firebaseio.com",
    projectId: "auth-form-2eb89",
    storageBucket: "auth-form-2eb89.appspot.com",
    messagingSenderId: "532774111499",
    appId: "1:532774111499:web:de3f1759a2fbf70c27ba0e"
  };
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.database();


// Function to initialize the audio element with the first song
function initializeAudioElement(songIndex) {
    audioElement.src = songs[songIndex].musicUrl;
    masterSongName.innerText = songs[songIndex].title;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Event listener for play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Display songs from Firebase
let songs = [];  // Define an array to store song data

// Display songs from Firebase
function displaySongs() {
    const songsRef = db.ref('music');

    songsRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const songData = childSnapshot.val();
            songs.push(songData);  // Add the song data to the array

            const songItem = document.createElement('div');
            songItem.classList.add('songItem');
            songItem.innerHTML = `
                <img src="${songData.imageUrl}" alt="${songData.title}">
                <span class="songName">${songData.title}</span>
                <span class="songlistplay">
                    <span class="timestamp">${songData.category} <i id="${childSnapshot.key}" class="far songItemPlay fa-play-circle"></i></span>
                </span>
            `;

            songItem.addEventListener('click', () => {
                makeAllPlays();
                songIndex = parseInt(childSnapshot.key);
                initializeAudioElement(songIndex);
            });

            // Add click event listener to play the song when the play button is clicked
            const playButton = songItem.querySelector('.songItemPlay');
            playButton.addEventListener('click', () => {
                makeAllPlays();
                songIndex = parseInt(childSnapshot.key);
                initializeAudioElement(songIndex);
            });

            songItems.push(songItem);
            document.getElementById('songItemContainer').appendChild(songItem);
        });
    });
}

// Call the function to display songs when the page loads
displaySongs();

// Function to initialize the audio element with the first song
function initializeAudioElement(songIndex) {
    audioElement.src = songs[songIndex].musicUrl;  // Set the correct URL from Firebase
    masterSongName.innerText = songs[songIndex].title;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

// let songs = [
//     {songName: "Neene Modalu Neene Kone  Kiss  Viraat, Sreeleela  A P Arjun  Adi Hari  Shreya Ghoshal", filePath: "kannada songs\Neene Modalu Neene Kone .mp3", coverPath: "covers/1.jpg"},
//     {songName: "Kantara - Singara Siriye Vijay PrakashAnanya Bhat Ajaneesh Loknath Rishab ShettyHombale Films", filePath: "Singara Siriye.mp3", coverPath: "covers/2.jpg"},
//     {songName: "Sapta Sagaradaache Ello - Title Track  Rakshit Shetty  Rukmini  Hemanth M Rao Charan Raj  Kapil", filePath: "Sapta Sagaradaache Ellol.mp3", coverPath: "covers/3.jpg"},
//     {songName: "Belakina Kavithe Video Song  Banaras Kannada  Zaid Khan  Sonal Monteiro  B.Ajaneesh Loknath", filePath: "Belakina Kavithe .mp3", coverPath: "covers/4.jpg"},
//     {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
//     {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
//     {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
//     {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
//     {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
//     {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
// ]

// songItems.forEach((element, i)=>{ 
//     element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
//     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
// })
 


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
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

function changeImg(){
    const carou=document.querySelector(".wrapper");
    const firstImg=carou.firstElementChild;
    carou.removeChild(firstImg);
    carou.appendChild(firstImg);
}
setInterval(changeImg,2000);