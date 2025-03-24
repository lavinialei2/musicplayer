document.addEventListener("DOMContentLoaded", function() {

    let playPauseButton = document.getElementById("play-pause");
    let progressBar = document.getElementById("progress-bar");
    let valueDisplay = document.getElementById("value-display");

    function updatePlayer(){
        const currentSong = songs[currentSongIndex];
        songTitle.textContent = currentSong.title;
        audioSource.src = currentSong.file;
        CDImage.src = currentSong.img;

        audioPlayer.load();
        progressBar.value = 0;
    }

    playPauseButton.addEventListener("click", function() {
        if(audioPlayer.paused){
            audioPlayer.play();
            playPauseButton.style.backgroundImage = "url/('../assets/pause.png')";
        }
        else{
            audioPlayer.pause();
            playPauseButton.style.backgroundImage = "url/('../assets/play.png')";
        }
    });

    // Event listener for previous song button
    document.getElementById("prev").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        updatePlayer();
        audioPlayer.play();
        playPauseButton.style.backgroundImage = "url('../assets/pause.png')";
    });

    // Event listener for next song button
    document.getElementById("next").addEventListener("click", function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        updatePlayer();
        audioPlayer.play();
        playPauseButton.style.backgroundImage = "url('../assets/pause.png')";
    });

    // Event listener to update progress bar as the song plays
    audioPlayer.addEventListener("timeupdate", function() {
        if(audioPlayer.duration){
            const progress = (audioPlayer.currentTime / audioPlayer.totalTime);
            progressBar.value = progress;
            valueDisplay.textContent = 'Value: ${Math.floor(progress)}'; //tbd
        }
    });

    // Event listener for progress bar (seek)
    progressBar.addEventListener("input", function() {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

});