document.addEventListener("DOMContentLoaded", function () {

    const albumSelectionPage = document.getElementById("album-selection");
    const musicPlayerPage = document.getElementById("music-player");
    const albumsContainer = document.getElementById("albums-container");
    const homeButton = document.getElementById("home-button");

    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const songTitle = document.getElementById('song-title');
    const cdImage = document.getElementById('cd-image');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeUp = document.getElementById('volume-up');
    const volumeDown = document.getElementById('volume-down');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const progressObj = document.getElementById('progress-object');
    const timeDisplay = document.getElementById('time-display');

    const switchSound = new Audio('assets/audios/switch.m4a');
    switchSound.volume = 0.3;

    let albums = {};
    let currentAlbum = null;
    let currentSongIndex = 0;


    async function loadAlbums() {
        const response = await fetch("albums.json");
        albums = await response.json();

        albumsContainer.innerHTML = Object.keys(albums)
            .map(albumKey => {
                const album = albums[albumKey];
                return `
                <button class="album-button" data-album="${albumKey}">
                    <img src="${album.background}" id="album-cover">
                    <div>${albumKey}</div>
                </button>
            `;
            })
            .join("");

        document.querySelectorAll(".album-button").forEach(button => {
            button.addEventListener("click", function () {
                switchSound.currentTime = 0;
                switchSound.play();
                loadAlbum(this.getAttribute("data-album"));
            });
        });
    }

    function loadAlbum(albumKey) {
        if (!albums[albumKey]) return;

        currentAlbum = albums[albumKey];
        currentSongIndex = 0;


        document.getElementById("stylesheet").href = currentAlbum.stylesheet;
        progressObj.src = currentAlbum.progressObj;
        document.getElementById("prevIcon").src = currentAlbum.prevIcon;
        document.getElementById("playIcon").src = currentAlbum.playIcon;
        document.getElementById("pauseIcon").src = currentAlbum.pauseIcon;
        document.getElementById("nextIcon").src = currentAlbum.nextIcon;
        document.getElementById("volDownIcon").src = currentAlbum.volDownIcon;
        document.getElementById("volUpIcon").src = currentAlbum.volUpIcon;
        document.getElementById("homeIcon").src = currentAlbum.homeIcon;
        updatePlayer();

        albumSelectionPage.style.display = "none";
        musicPlayerPage.style.display = "block";
    }

    function updatePlayer() {
        if (!currentAlbum) return;

        const currentSong = currentAlbum.songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.audio;
        cdImage.src = currentSong.img;

        audioPlayer.load();
    }

    homeButton.addEventListener("click", function () {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            stopSpinning();
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        }

        document.getElementById("stylesheet").href = "styles.css";
        musicPlayerPage.style.display = "none";
        albumSelectionPage.style.display = "block";
    });

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
        currentSongIndex = (currentSongIndex - 1 + currentAlbum.songs.length) % currentAlbum.songs.length;
        updatePlayer();

        audioPlayer.play();
        startSpinning();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    nextButton.addEventListener("click", function () {
        currentSongIndex = (currentSongIndex + 1) % currentAlbum.songs.length;
        updatePlayer();

        audioPlayer.play();
        startSpinning();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    audioPlayer.addEventListener("ended", function () {
        currentSongIndex = (currentSongIndex + 1) % currentAlbum.songs.length;
        updatePlayer();

        audioPlayer.play();
        startSpinning();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    volumeDown.addEventListener("click", () => {
        audioPlayer.volume = Math.max(0, audioPlayer.volume - 0.1);
    });

    volumeUp.addEventListener("click", () => {
        audioPlayer.volume = Math.min(1, audioPlayer.volume + 0.1);
    });

    function updateProgressBar() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;

        progressBar.style.width = `${progress}%`;

        progressObj.style.left = `${progressContainer.clientWidth * (progress / 100) - (progressObj.width / 2)}px`;

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

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            switchSound.currentTime = 0;
            switchSound.play();
        });
    });

    loadAlbums();

});