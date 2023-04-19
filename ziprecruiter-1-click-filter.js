// ==UserScript==
// @name         ZipRecruiter 1-Click Filter
// @version      0.1
// @description  Adds a button to hide all jobs that are not 1-Click apply on ZipRecruiter. Purely Educational: Using this may be against Ziprecruiter's terms and conditions. See LICENSE for more info.
// @author       github.com/originates
// @match        https://www.ziprecruiter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let filterOn = false; // A flag to indicate whether the filter is on or off

    // Allows you to select against key words in the job title: modify/add keywords you don't want to see.
    // Example: let excludeJobTitle = ["Sales", "Sale"];
    let excludeJobTitle=[];

    function filterJobs() {
        // Get the current URL
        let url = window.location.href;
        // A regular expression to match the search page
        let regex = /^https:\/\/www\.ziprecruiter\.com\/jobs-search\?search=.+$/;

        if (!regex.test(url)) {
            return; // If the URL is not a search page, do nothing
        }

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
                let hasGoodBadge = badge && ["good", "fair", "great"].includes(badge.dataset.qualificationGrade);
                // Check if the job title contains any of the excluded words
                let hasExcludedTitle = excludeJobTitle.some(word => title.includes(word));
                // Hide the job if any of the conditions are false
                if (!hasQuickApply || !hasGoodBadge || hasExcludedTitle) {
                    job.style.display = "none";
                }
            }

            // If the filter is off and the job is hidden, show it
            if (!filterOn && job.style.display === "none") {
                job.style.display = "";
            }
        }
    }

    // Create a circle element to indicate the filter status
    let circle = document.createElement("div");
    circle.style.position = "fixed"; // Position it fixed on the bottom right corner
    circle.style.right = "145px";
    circle.style.bottom = "17px";
    circle.style.zIndex = "9999";
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "red"; // Default color is red

    // Append it to the body
    document.body.appendChild(circle);
    // Create a button element
    let filterButton = document.createElement("button");
    filterButton.textContent = "1-Click Filter";
    filterButton.style.position = "fixed";
    filterButton.style.right = "50px";
    filterButton.style.bottom = "10px";
    filterButton.style.zIndex = "9999";

    // Append the button to the body
    document.body.appendChild(filterButton);

    // Add a click event listener to the button
    filterButton.addEventListener("click", function() {
        // Toggle the filter flag
        filterOn = !filterOn;
        // Run the filter function
        filterJobs();

        // Change the circle color based on the filter flag
        if (filterOn) {
            circle.style.backgroundColor = "green";
        }
        else {
            circle.style.backgroundColor = "red";
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
