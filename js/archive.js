// archive.js - Handle search and filter functionality
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".search-button");
    const topicFilter = document.getElementById("topic-filter");
    const yearFilter = document.getElementById("year-filter");
    const monthFilter = document.getElementById("month-filter");

    searchButton.addEventListener("click", function () {
        // Get the filter values
        const topic = topicFilter.value;
        const year = yearFilter.value;
        const month = monthFilter.value;

        // Here you can implement the search functionality, like making an API call to fetch filtered news

        console.log("Search with filters:", { topic, year, month });
    });

    // Example: Handling pagination (in practice, this would trigger fetching new page of news)
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    prevButton.addEventListener("click", function () {
        console.log("Go to previous page of news");
    });

    nextButton.addEventListener("click", function () {
        console.log("Go to next page of news");
    });
});


