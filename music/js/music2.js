const musicDataPath = "/music/music.json";
// const musicDataPath = "";
let musicData = [];
let playlistOrder = []; // Store the order of songs in the playlist
let currentIndex = 0;
let audio;
let isLooping = false;
let isShuffling = false;
let lyrics = [];

// Load JSON data
function loadMusicData() {
    $.getJSON(musicDataPath, function(data) {
        musicData = data.music_data;
        playlistOrder = musicData.map((_, index) => index); // Initialize playlist order
        renderPlaylist(); // Render the playlist items
        loadSong(currentIndex);
        setupButtonListeners();
    });
}

// Render the playlist based on the current order
function renderPlaylist() {
    $('#playlist').empty();
    playlistOrder.forEach((index, i) => {
        const song = musicData[index];
        const playlistItem = $('<div>')
            .addClass('playlist-item')
            .attr('data-index', index);

        const albumArt = $('<img>')
            .attr('src', song.album_img)
            .addClass('album-art');

        const songInfo = $('<div>')
            .addClass('song-info')
            .text(`${song.song_info.Song_Title} - ${song.song_info.Singer}`);

        const moveUp = $('<span>')
            .addClass('move-up')
            .text('👆')
            .toggle(i > 0); // Hide the up arrow if it's the first item

        const moveDown = $('<span>')
            .addClass('move-down')
            .text('👇')
            .toggle(i < playlistOrder.length - 1); // Hide the down arrow if it's the last item
        const removeBtn = $('<span>')
            .addClass('remove-btn')
            .text('✖')
            .attr('data-index', index);

        playlistItem.append(albumArt).append(songInfo).append(moveUp).append(moveDown).append(removeBtn);
        $('#playlist').append(playlistItem);
    });
    setupDragAndDrop(); // Enable drag-and-drop
    setupRemoveButtonListeners(); // Setup remove button listeners
}


// Setup remove button listeners
function setupRemoveButtonListeners() {
    $('.remove-btn').on('click', function() {
        const index = $(this).attr('data-index');
        playlistOrder = playlistOrder.filter(i => i != index);
        renderPlaylist(); // Re-render the playlist
    });
}

// Setup drag-and-drop functionality
function setupDragAndDrop() {
    $('#playlist').sortable({
        update: function(event, ui) {
            const newOrder = $(this).sortable('toArray', { attribute: 'data-index' });
            playlistOrder = newOrder.map(Number); // Update playlist order based on drag-and-drop
        }
    }).disableSelection();
}
// Update loadSong function to use parseAndDisplayLyrics for double language support
function loadSong(index) {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = ""; // Clear previous audio source
    }

    const songData = musicData[playlistOrder[index]];
    $('#album-art').attr('src', songData.album_img); // Set album art from JSON
    $('#song-title').text(songData.song_info.Song_Title);
    $('#singer-name').text(songData.song_info.Singer);
    $('#duration').text(songData.song_time); // Display duration from JSON

    // Load lyrics from 'irc' and 'tlyric' fields
    parseAndDisplayLyrics(songData.irc, songData.tlyric, $('#lyrics-container'));

    setBackgroundColorFromImage(songData.album_img);

    audio = new Audio(songData.Song_MP3);
    setupAudioPlayer(audio);

    audio.play().catch(error => {
        console.error('自动播放失败:', error);
    });
}

// Setup audio player controls
function setupAudioPlayer(audio) {
    $('#progress-bar').off('input change');

    audio.addEventListener('loadedmetadata', function() {
        $('#progress-bar').on('input change', function() {
            if (!audio.duration) return;
            audio.currentTime = ($(this).val() / 100) * audio.duration;
        });
    });

    $('#play-pause').on('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    audio.addEventListener('timeupdate', function() {
        const progress = (audio.currentTime / audio.duration) * 100;
        $('#progress-bar').val(progress);
        $('#current-time').text(formatTime(audio.currentTime));
        syncLyrics(audio.currentTime);
    });

    audio.addEventListener('play', function() {
        $('#play-pause').attr('src', 'https://datawarehouse-7gl81i6ib89c2edd-1314221350.tcloudbaseapp.com/oolong-music/but-icon/暂停_pause-one.svg');
    });

    audio.addEventListener('pause', function() {
        $('#play-pause').attr('src', 'https://datawarehouse-7gl81i6ib89c2edd-1314221350.tcloudbaseapp.com/oolong-music/but-icon/播放_play-one.svg');
    });

    audio.addEventListener('ended', function() {
        if (isLooping) {
            audio.play();
        } else {
            playNextSong();
        }
    });
}

// Function to play the next song
function playNextSong() {
    currentIndex = (currentIndex + 1) % playlistOrder.length;
    loadSong(currentIndex);
}

// Function to play the previous song
function playPreviousSong() {
    currentIndex = (currentIndex - 1 + playlistOrder.length) % playlistOrder.length;
    loadSong(currentIndex);
}

// Sync lyrics with current time
function syncLyrics(currentTime) {
    const lyricLines = $('.lyric-line');
    for (let i = 0; i < lyrics.length; i++) {
        if (currentTime >= lyrics[i].time && (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)) {
            lyricLines.removeClass('active past');
            lyricLines.slice(0, i).addClass('past');
            $(lyricLines[i]).addClass('active').get(0).scrollIntoView({ behavior: 'smooth', block: 'center' });
            break;
        }
    }
}

// Setup button listeners
function setupButtonListeners() {
    $('#previous').on('click', playPreviousSong);
    $('#next').on('click', playNextSong);

    $('#repeat').on('click', function() {
        isLooping = !isLooping;
        $(this).toggleClass('active', isLooping);
    });

    $('#shuffle').on('click', function() {
        isShuffling = !isShuffling;
        $(this).toggleClass('active', isShuffling);
    });

    $('#list').on('click', function() {
        $('#playlist-container').toggleClass('playlist-hidden');
    });

    $('#close-playlist').on('click', function() {
        $('#playlist-container').addClass('playlist-hidden');
    });

    // Handle move up and move down
    $('#playlist').on('click', '.move-up', function() {
        const $item = $(this).closest('.playlist-item');
        const index = parseInt($item.attr('data-index'));
        if (index > 0) {
            swapItems(index, index - 1);
        }
    });

    $('#playlist').on('click', '.move-down', function() {
        const $item = $(this).closest('.playlist-item');
        const index = parseInt($item.attr('data-index'));
        if (index < playlistOrder.length - 1) {
            swapItems(index, index + 1);
        }
    });
}

function swapItems(index1, index2) {
    const temp = playlistOrder[index1];
    playlistOrder[index1] = playlistOrder[index2];
    playlistOrder[index2] = temp;
    renderPlaylist(); // Re-render the playlist to reflect the new order
}

// Parse and display lyrics
function parseAndDisplayLyrics(lyricsText, translatedLyricsText, $lyricsContainer) {
    lyrics = [];
    const lines = lyricsText.split('\n');
    const translatedLines = translatedLyricsText ? translatedLyricsText.split('\n') : [];

    $lyricsContainer.empty();

    lines.forEach((line, index) => {
        const timeRegex = /\[(\d+):(\d+\.\d+)\]/;
        const match = timeRegex.exec(line);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseFloat(match[2]);
            const time = minutes * 60 + seconds;
            const text = line.replace(timeRegex, '').trim();

            // Create a corresponding translated line if available
            const translatedText = translatedLines[index] ? translatedLines[index].replace(timeRegex, '').trim() : '';

            lyrics.push({ time, text, translatedText });

            // Create HTML for both original and translated lyrics
            const $lyricLine = $('<div>').addClass('lyric-line');
            const $originalLyric = $('<div>').addClass('original-lyric').text(text);
            const $translatedLyric = $('<div>').addClass('translated-lyric').text(translatedText);

            $lyricLine.append($originalLyric).append($translatedLyric);
            $lyricsContainer.append($lyricLine);
        }
    });
}

// Format time in MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Set background color from album art
function setBackgroundColorFromImage(imageSrc) {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";

    img.onload = function () {
        const colorThief = new ColorThief();
        const color = colorThief.getColor(img);
        const gradientColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        $('body').css('background', `linear-gradient(135deg, ${gradientColor}, #1a1a2e)`);
    };
}

// Load the first song when the page loads
$(document).ready(loadMusicData);
