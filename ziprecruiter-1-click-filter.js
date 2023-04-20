// ==UserScript==
// @name         ZipRecruiter 1-Click Filter
// @version      0.1.1
// @description  Adds a button to hide all jobs that are not 1-Click apply on ZipRecruiter. Purely Educational: Using this may be against Ziprecruiter's terms and conditions. See LICENSE for more info.
// @author       github.com/originates
// @match        https://www.ziprecruiter.com/jobs-search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Use localStorage to store and retrieve the filter state and the excluded keywords
    let filterOn = localStorage.getItem("filterOn") === "true" || false;
    let excludeJobTitle = localStorage.getItem("excludeJobTitle") ? localStorage.getItem("excludeJobTitle").split(",") : [];
    let minQualification = localStorage.getItem("minQualification") || "poor";
    let inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.placeholder = "Enter keywords to exclude (separated by commas)";
    inputBox.style.cssText = "position: fixed; right: 175px; bottom: 12px; z-index: 9999; width: 375px";
    inputBox.value = excludeJobTitle.join(","); // Set the input value to the stored keywords
    document.body.appendChild(inputBox);

    let selectBox = document.createElement("select");
    selectBox.style.cssText = "position: fixed; right: 450px; bottom: 35px; z-index: 9999; width: 100px";
    selectBox.innerHTML = `<option value="poor">Poor</option><option value="fair">Fair</option><option value="good">Good</option><option value="great">Great</option>`;
    selectBox.value = minQualification;
    document.body.appendChild(selectBox);

    inputBox.addEventListener("change", function() {
        let input = inputBox.value;
        // Replace ", " with ","
        input = input.replace(/, /g, ",");
        // Split the input by ","
        excludeJobTitle = input.split(",");
        // Save the keywords to localStorage
        localStorage.setItem("excludeJobTitle", input);
        // run filter after updating excluded words
        filterJobs();
    });

    selectBox.addEventListener("change", function() {
        minQualification = selectBox.value;
        localStorage.setItem("minQualification", minQualification);
        filterJobs();
    });

    function filterJobs() {
        // Get the current URL
        let url = window.location.href;

        // Get all the job elements on the page
        let jobs = document.querySelectorAll(".job_content");

        for (let job of jobs) {
            // Get the quick apply button of the job
            let button = job.querySelector(".quick_apply_btn");

            // Get the qualification grade badge of the job
            let badge = job.querySelector(".qualification_grade_badge");

            // Get the job title of the job
            let title = job.querySelector(".title").textContent;

            // This code hides a job element if the filter is on and the job does not meet the criteria
            if (filterOn) {
                // Check if the job has a button with quick apply option
                let hasQuickApply = button && button.dataset.quickApply === "one_click";
                // Check if the job has a badge with a good, fair or great qualification grade
                let hasGoodBadge = badge && ["poor", "fair", "good", "great"].indexOf(badge.dataset.qualificationGrade) >= ["poor", "fair", "good", "great"].indexOf(minQualification);
                // Check if the job title contains any of the excluded words
                let hasExcludedTitle = excludeJobTitle.some(word => title.includes(word));
                // Hide the job if any of the conditions are false
                if (!hasQuickApply || !hasGoodBadge || hasExcludedTitle) {
                    job.style.display = "none";
                    // get the parent element of the job element
                    let article = job.parentElement;
                    // check if the parent element is an article
                    if (article.tagName === "ARTICLE") {
                        // hide the article element
                        article.style.display = "none";
                    }
                }
                // Unhide the job if it was previously hidden but now meets the conditions
                else if (job.style.display === "none" && hasQuickApply && hasGoodBadge && !hasExcludedTitle) {
                    job.style.display = "";
                    let article = job.parentElement;
                    // check if the parent element is an article
                    if (article.tagName === "ARTICLE") {
                        // hide the article element
                        article.style.display = "";
                    }
                }
            }


            // If the filter is off and the job is hidden, show it
            if (!filterOn && job.style.display === "none") {
                job.style.display = "";
                let article = job.parentElement;
                // check if the parent element is an article
                if (article.tagName === "ARTICLE") {
                // hide the article element
                    article.style.display = "";
                }
            }
        }
    }

    // Create a circle element to indicate the filter status
    let circle = document.createElement("div");
    circle.style.cssText = `position: fixed; right: 145px; bottom: 17px; z-index: 9999;
    width: 10px; height: 10px; border-radius: 50%; background-color: ${filterOn ? "green" : "red"}`;

    // Create a button element to toggle the filter
    let filterButton = document.createElement("button");
    filterButton.textContent = "1-Click Filter";
    filterButton.style.cssText = "position: fixed; right: 50px; bottom: 10px; z-index: 9999";

    // Append the circle and the button to the body
    document.body.append(circle, filterButton);

    // Show/Hide inputBox, selectBox, and excluded words based on the filter status
    inputBox.style.display = filterOn ? "" : "none";
    selectBox.style.display = filterOn ? "" : "none";
    if (filterOn) filterJobs();


    // Add a click event listener to the button
    filterButton.addEventListener("click", function() {
        // Toggle the filter flag
        filterOn = !filterOn;
        // Store the filter flag in localStorage
        localStorage.setItem("filterOn", filterOn);
        // Run the filter function
        filterJobs();

        // Change the circle color based on the filter flag
        if (filterOn) {
            circle.style.backgroundColor = "green";
            // display inputBox
            inputBox.style.display = "";
            selectBox.style.display = "";
        }
        else {
            circle.style.backgroundColor = "red";
            inputBox.style.display = "none";
            selectBox.style.display = "none";
        }
    });

    // Get the div with data-jobs-list attribute
    let jobsListDiv = document.querySelector("[data-jobs-list]");

    // Create a mutation observer to detect changes in the div
    let observer = new MutationObserver(function(mutations) {
        // Run the filter function for each mutation
        mutations.forEach(function(mutation) {
            filterJobs();
        });
    });

    // Set the observer options to observe child list changes
    let observerOptions = {
        childList: true
    };

    // Start observing the div with the observer options
    observer.observe(jobsListDiv, observerOptions);
})();
