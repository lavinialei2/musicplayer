document.addEventListener("DOMContentLoaded", function() {

    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const songTitle = document.getElementById('song-title');
    const cdImage = document.getElementById('cd-image');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.getElementById('progress-bar');
    const valueDisplay = document.getElementById('value-display');
    
    let currentSongIndex = 0;

    const songs = [
        {title: "1 - deep sea pastures", audio: "/Users/lavinialei/musicplayer/assets/audios/deepSeaPastures.mp3", img: "/Users/lavinialei/musicplayer/assets/cds/ponyoSosuke.png"},
        {title: "21 - a night of shooting stars", audio: "/Users/lavinialei/musicplayer/assets/audios/aNightOfShootingStars.mp3", img: "/Users/lavinialei/musicplayer/assets/cds/ponyoSosuke.png"},
        {title: "36 - ponyo on the cliff by the sea", audio: "/Users/lavinialei/musicplayer/assets/audios/ponyoOnTheCliffByTheSea.mp3", img: "/Users/lavinialei/musicplayer/assets/cds/ponyoSosuke.png"},
    ];

    function updatePlayer(){
        const currentSong = songs[currentSongIndex];
        songTitle.innerText = currentSong.title;
        audioSource.src = currentSong.audio;
        cdImage.src = currentSong.img;

        audioPlayer.load();
        // progressBar.value = 0;

    }

    playPauseButton.addEventListener("click", function() {
        if(audioPlayer.paused){
            audioPlayer.play();
            playIcon.style.display = "none";
            pauseIcon.style.display = "block";
        }
        else{
            audioPlayer.pause();
            playIcon.style.display = "block";
            pauseIcon.style.display = "none";
        }
    });

    prevButton.addEventListener("click", function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();

        audioPlayer.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });

    nextButton.addEventListener("click", function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();

        audioPlayer.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    });


    // audioPlayer.addEventListener("timeupdate", function() {
    //     if(audioPlayer.duration){
    //         const progress = (audioPlayer.currentTime / audioPlayer.totalTime);
    //         progressBar.value = progress;
    //         valueDisplay.textContent = 'Value: ${Math.floor(progress)}'; //tbd
    //     }
    // });


    // Todo this
    // progressBar.addEventListener("input", function() {
    //     const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    //     audioPlayer.currentTime = seekTime;
    // });
    
    updatePlayer();

});