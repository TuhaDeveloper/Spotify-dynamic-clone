console.log('wellcome spotify music');

//initailize the variables
let songIndex = 1;
let audioElement = new Audio('song/1.m4a');
let masterPlay = document.getElementById('masterPlay');
let progress = document.getElementById('progress');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songTime = document.querySelector('.timesTap');
let playId = document.querySelector('i');
let songs = [
    { songName: 'this is one song', filePath: 'song/1.m4a', coverPath: "covers/1.jpg" },
    { songName: 'this is two song', filePath: 'song/2.m4a', coverPath: "covers/2.jpg" },
    { songName: 'this is three song', filePath: 'song/3.m4a', coverPath: "covers/3.jpg" },
];

songItem.forEach((element, i) => {
    console.log(element, i)
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        makeallplay();
    };

    progress.addEventListener('timeupdate', () => {
        console.log('timeupdate')
    })


})

//update to event
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');

    //update seekbar
    progressnew = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    progress.value = progressnew;
    // console.log('progress time=' + progressnew)

})

progress.addEventListener('change', () => {
    run = audioElement.currentTime = progress.value * audioElement.duration / 100;
    // console.log('progress run =' + run)
})

const makeallplay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeallplay();
        let songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        let foundsrc = audioElement.src = `song/${songIndex}.m4a`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')


    })
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 3) {
        songIndex = 1;
    } else {
        songIndex += 1;
    };
    audioElement.src = `song/${songIndex}.m4a`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})


document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) {
        songIndex = 3;
    } else {
        songIndex -= 1;
    };
    audioElement.src = `song/${songIndex}.m4a`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
})


