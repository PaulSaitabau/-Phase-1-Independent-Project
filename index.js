document.addEventListener('DOMContentLoaded', () => {
      //DOM elements
    const memeImg = document.getElementById("meme-img");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const randomBtn = document.getElementById("random-btn");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const downloadBtn = document.getElementById("download-btn");

    // Initialize memeIndex to 0
  let memeIndex = 0;
   // Initialize memeData as an empty array
   let memeData = [];

    // Fetch meme templates from the Imgflip API
    fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(data => {
            memeData = data.data.memes;
            displayMeme(memeIndex);
        });

    // Function to display meme by index
    function displayMeme(index) {
        const meme = memeData[index];
        memeImg.src = meme.url;
    }

    // Event listener for previous button
    prevBtn.addEventListener('click', () => {
        memeIndex = (memeIndex - 1 + memeData.length) % memeData.length;
        displayMeme(memeIndex);
    });

    // Event listener for next button
    nextBtn.addEventListener('click', () => {
        memeIndex = (memeIndex + 1) % memeData.length;
        displayMeme(memeIndex);
    });

    // Event listener for random button
    randomBtn.addEventListener('click', () => {
        memeIndex = Math.floor(Math.random() * memeData.length);
        displayMeme(memeIndex);
    });

    // Event listener for download button
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = memeImg.src;
        link.download = 'meme.jpg'; // You can change the filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    // Event listener for search button
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const foundIndex = memeData.findIndex(meme => meme.name.toLowerCase().includes(searchTerm));
        if (foundIndex !== -1) {
            memeIndex = foundIndex;
            displayMeme(memeIndex);
        } else {
            alert('Meme not found!');
        }
    });
});