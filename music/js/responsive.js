document.addEventListener('DOMContentLoaded', function() {
    const lyricsContainer = document.getElementById('lyrics-container');
    const lyrics = [
        "From ZYHORG Music",
    ];

    let currentLine = 0;

    function displayNextLine() {
        if (currentLine < lyrics.length) {
            const lineElement = document.createElement('div');
            lineElement.className = 'lyric-line';
            lineElement.textContent = lyrics[currentLine];
            lyricsContainer.appendChild(lineElement);
            currentLine++;
        }
    }

    // Call displayNextLine every 2 seconds (adjust as needed)
    setInterval(displayNextLine, 2000);
});
