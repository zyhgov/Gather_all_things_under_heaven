$(document).ready(function() {
    let jsonData = [];
    let displayedCount = 0;
    const itemsPerPage = 9;

    // Function to display results with pagination
    function displayResults(results) {
        const resultsContainer = $('#results');
        const noResultsMessage = $('#no-results');
        const loadMoreButton = $('#load-more-btn');
        const loadMoreContainer = $('#load-more-container');

        if (results.length > 0) {
            noResultsMessage.hide();
            loadMoreContainer.show();

            // Clear previous results
            resultsContainer.empty();

            // Update global jsonData and reset displayed count
            jsonData = results;
            displayedCount = 0;

            // Display initial set of results
            showNextItems();
        } else {
            resultsContainer.empty();
            noResultsMessage.show();
            loadMoreContainer.hide();
        }
    }

    // Function to show next set of items
    function showNextItems() {
        const resultsContainer = $('#results');
        const loadMoreButton = $('#load-more-btn');

        for (let i = displayedCount; i < Math.min(displayedCount + itemsPerPage, jsonData.length); i++) {
            const result = jsonData[i];
            const filePath = result.main_domain + '/' + result.path.map(part => part.name).join('/') + '/' + result.content.file;
            const fileName = result.content.file;

            const resultItem = $('<div>').addClass('result-item');

            const title = $('<div>').addClass('result-title').text(fileName);
            resultItem.append(title);

            const tagsContainer = $('<div>').addClass('result-tags');
            result.path.slice(1).forEach(part => { // Exclude the first directory "ChinaTextbook-master"
                const tag = $('<span>').addClass('result-tag').text(part.name);
                switch (part.name) {
                    case '初中':
                    case '高中':
                    case '小学':
                        tag.addClass('tag-education-stage');
                        break;
                    case '人文地理':
                    case '体育与健康':
                    case '俄语':
                    case '信息技术':
                    case '化学':
                    case '历史':
                    case '地理':
                    case '地理图册':
                    case '思想政治':
                    case '数学':
                    case '日语':
                    case '概率论':
                    case '物理':
                    case '生物学':
                    case '离散数学':
                    case '科学':
                    case '线性代数':
                    case '美术':
                    case '艺术':
                    case '英语':
                    case '语文':
                    case '语文·书法练习指导':
                    case '通用技术':
                    case '道德与法治':
                    case '音乐':
                    case '高等数学':
                        tag.addClass('tag-subject');
                        break;
                    default:
                        if (part.name.includes('-')) {
                            tag.addClass('tag-publisher');
                        } else if (/\d+/.test(part.name)) {
                            tag.addClass('tag-grade');
                        }
                        break;
                }
                tagsContainer.append(tag);
            });

            resultItem.append(tagsContainer);

            // Add view button
            const viewButton = $(
                '<button class="Documents-btn">' +
                '  <span class="folderContainer">' +
                '    <svg class="fileBack" width="146" height="113" viewBox="0 0 146 113" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '      <path d="M0 4C0 1.79086 1.79086 0 4 0H50.3802C51.8285 0 53.2056 0.627965 54.1553 1.72142L64.3303 13.4371C65.2799 14.5306 66.657 15.1585 68.1053 15.1585H141.509C143.718 15.1585 145.509 16.9494 145.509 19.1585V109C145.509 111.209 143.718 113 141.509 113H3.99999C1.79085 113 0 111.209 0 109V4Z" fill="url(#paint0_linear_117_4)"></path>' +
                '      <defs>' +
                '        <linearGradient id="paint0_linear_117_4" x1="0" y1="0" x2="72.93" y2="95.4804" gradientUnits="userSpaceOnUse"><stop stop-color="#8F88C2"></stop><stop offset="1" stop-color="#5C52A2"></stop></linearGradient>' +
                '      </defs>' +
                '    </svg>' +
                '    <svg class="filePage" width="88" height="99" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '      <rect width="88" height="99" fill="url(#paint0_linear_117_6)"></rect>' +
                '      <defs>' +
                '        <linearGradient id="paint0_linear_117_6" x1="0" y1="0" x2="81" y2="160.5" gradientUnits="userSpaceOnUse"><stop stop-color="white"></stop><stop offset="1" stop-color="#686868"></stop></linearGradient>' +
                '      </defs>' +
                '    </svg>' +
                '    <svg class="fileFront" width="160" height="79" viewBox="0 0 160 79" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '      <path d="M0.29306 12.2478C0.133905 9.38186 2.41499 6.97059 5.28537 6.97059H30.419H58.1902C59.5751 6.97059 60.9288 6.55982 62.0802 5.79025L68.977 1.18034C70.1283 0.410771 71.482 0 72.8669 0H77H155.462C157.87 0 159.733 2.1129 159.43 4.50232L150.443 75.5023C150.19 77.5013 148.489 79 146.474 79H7.78403C5.66106 79 3.9079 77.3415 3.79019 75.2218L0.29306 12.2478Z" fill="url(#paint0_linear_117_5)"></path>' +
                '      <defs>' +
                '        <linearGradient id="paint0_linear_117_5" x1="38.7619" y1="8.71323" x2="66.9106" y2="82.8317" gradientUnits="userSpaceOnUse"><stop stop-color="#C3BBFF"></stop><stop offset="1" stop-color="#51469A"></stop></linearGradient>' +
                '      </defs>' +
                '    </svg>' +
                '  </span>' +
                '  <p class="text">查看文件内容</p>' +
                '</button>'
            ).click(() => {
                window.open(`pdf-viewer.html?url=${encodeURIComponent(filePath)}&title=${encodeURIComponent(fileName)}`, '_blank');
            });
            resultItem.append(viewButton);

            resultsContainer.append(resultItem);
        }

        displayedCount += itemsPerPage;

        // Hide load more button if all items are displayed
        if (displayedCount >= jsonData.length) {
            loadMoreButton.hide();
        } else {
            loadMoreButton.show();
        }
    }

    // Load JSON data from local server
    $.getJSON('/asset/data/parsed_hierarchical_structure.json', function(data) {
        jsonData = data;

        // Extract unique values for each category
        const uniqueCategories = {
            education_stage: new Set(),
            subject: new Set(),
            publisher: new Set(),
            grade: new Set()
        };

        jsonData.forEach(item => {
            item.path.slice(1).forEach((part, index) => { // Exclude the first directory "ChinaTextbook-master"
                if (index === 0) {
                    uniqueCategories.education_stage.add(part.name);
                } else if (index === 1) {
                    uniqueCategories.subject.add(part.name);
                } else if (index === 2) {
                    uniqueCategories.publisher.add(part.name);
                } else if (index === 3) {
                    uniqueCategories.grade.add(part.name);
                }
            });
        });

        // Populate select options
        function populateSelectOptions(selectId, options) {
            options.forEach(option => {
                $(selectId).append(`<option value="${option}">${option}</option>`);
            });
        }

        populateSelectOptions('#education-stage-select', Array.from(uniqueCategories.education_stage));
        populateSelectOptions('#subject-select', Array.from(uniqueCategories.subject));
        populateSelectOptions('#publisher-select', Array.from(uniqueCategories.publisher));
        populateSelectOptions('#grade-select', Array.from(uniqueCategories.grade));

        // Function to update results based on search criteria
        function updateResults() {
            const searchTerm = $('#search-input').val().toLowerCase();
            const educationStage = $('#education-stage-select').val();
            const subject = $('#subject-select').val();
            const publisher = $('#publisher-select').val();
            const grade = $('#grade-select').val();

            const filteredData = jsonData.filter(item => {
                const fileName = item.content.file.toLowerCase();
                const pathNames = item.path.map(part => part.name.toLowerCase()).join(' ');

                const matchesSearchTerm = searchTerm === '' || fileName.includes(searchTerm) || pathNames.includes(searchTerm);
                const matchesEducationStage = educationStage === '' || item.path.some(part => part.name === educationStage);
                const matchesSubject = subject === '' || item.path.some(part => part.name === subject);
                const matchesPublisher = publisher === '' || item.path.some(part => part.name === publisher);
                const matchesGrade = grade === '' || item.path.some(part => part.name === grade);

                return matchesSearchTerm && matchesEducationStage && matchesSubject && matchesPublisher && matchesGrade;
            });

            displayResults(filteredData);
        }

        // Event listeners for search inputs
        $('#search-input, #education-stage-select, #subject-select, #publisher-select, #grade-select').on('change keyup', updateResults);

        // Initial update of results
        updateResults();

        // Load more button click event
        $('#load-more-btn').on('click', showNextItems);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Failed to load JSON data:", textStatus, errorThrown);
    });
});