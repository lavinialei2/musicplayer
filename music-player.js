document.addEventListener("DOMContentLoaded", function () {

    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const songTitle = document.getElementById('song-title');
    const cdImage = document.getElementById('cd-image');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const progressObj = document.getElementById('progress-object');
    const timeDisplay = document.getElementById('time-display');

    let currentSongIndex = 0;

    const songs = [
        { title: "1 - deep sea pastures", audio: "./assets/audios/deepSeaPastures.mp3", img: "./assets/cds/ponyoBubble.png" },
        { title: "21 - a night of shooting stars", audio: "./assets/audios/aNightOfShootingStars.mp3", img: "./assets/cds/ponyoWaves.png" },
        { title: "36 - ponyo on the cliff by the sea", audio: "./assets/audios/ponyoOnTheCliffByTheSea.mp3", img: "./assets/cds/ponyoSosuke.png" },
    ];

    function updatePlayer() {
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.audio;
        cdImage.src = currentSong.img;

        audioPlayer.load();
    }

    function formatTime(time) {
        if (!time) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    let rotation = 0;
    let spinningInterval = null;

    function startSpinning() {
        if (!spinningInterval) {
            spinningInterval = setInterval(() => {
                rotation += 0.5;
                cdImage.style.transform = `rotate(${rotation}deg)`;
            }, 20);
        }
    }

    function stopSpinning() {
        clearInterval(spinningInterval);
        spinningInterval = null;
    }

    playPauseButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            startSpinning();
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
        }
        else {
            audioPlayer.pause();
            stopSpinning();
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        }
    });

    prevButton.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();

        audioPlayer.play();
        startSpinning();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    nextButton.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();

        audioPlayer.play();
        startSpinning();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    audioPlayer.addEventListener("ended", function () {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();

        audioPlayer.play();
        startSpinning();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    function updateProgressBar() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
        progressObj.style.left = `${progressContainer.clientWidth * (progress / 100) - 45}px`;
        timeDisplay.textContent = `${formatTime(audioPlayer.currentTime)}\/${formatTime(audioPlayer.duration)}`;
    }

    audioPlayer.addEventListener('timeupdate', updateProgressBar);

    progressContainer.addEventListener('click', (event) => {
        const clickX = event.offsetX;
        const progressWidth = progressContainer.clientWidth;
        const newTime = (clickX / progressWidth) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
        updateProgressBar();
    });

    const switchSound = new Audio('/Users/lavinialei/musicplayer/assets/audios/switch.m4a');
    switchSound.volume = 0.3;

    document.querySelectorAll('.controls button').forEach(button => {
        button.addEventListener('click', () => {
            switchSound.currentTime = 0;
            switchSound.play();
        });
    });


    updatePlayer();

});