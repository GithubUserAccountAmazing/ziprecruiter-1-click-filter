/ ==UserScript==
// @name         ZipRecruiter 1-Click Filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to hide all jobs that are not 1-Click apply on ZipRecruiter. Purely Educational: Using this may be against Ziprecruiter's terms and conditions. See LICENSE for more info.
// @author       Originates
// @match        https://www.ziprecruiter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Define a function that selects and hides job elements based on the button class, data attribute, and qualification grade
    function filterJobs() {
        // Check if the current URL matches the pattern https://www.ziprecruiter.com/jobs-search?search=[USER SEARCH QUERY]
        let url = window.location.href;
        let regex = /^https:\/\/www\.ziprecruiter\.com\/jobs-search\?search=.+$/;

        // If the URL does not match, return from the function
        if (!regex.test(url)) {
            return;
        }

        // Select all job elements that have a class of "job_content"
        let jobs = document.querySelectorAll(".job_content");

        // Loop through each job element
        for (let job of jobs) {
            // Check if the job element contains a button with a class of "quick_apply_btn" and a data-quick-apply attribute of "one_click"
            let button = job.querySelector(".quick_apply_btn");

            // Check if the job element contains a div with a class of "qualification_grade_badge" and a data-qualification-grade attribute of "good", "fair", or "great"
            let badge = job.querySelector(".qualification_grade_badge");

            // If the button or the badge does not exist or does not meet the criteria, hide the job element
            if (!button || button.dataset.quickApply !== "one_click" || !badge || !["good", "fair", "great"].includes(badge.dataset.qualificationGrade)) {
                job.style.display = "none";
            }
        }
    }

    // Create a button element that will trigger the filterJobs function when clicked
    let filterButton = document.createElement("button");
    filterButton.textContent = "Filter Jobs";
    filterButton.style.position = "fixed";
    filterButton.style.left = "575px";
    filterButton.style.bottom = "10px";
    filterButton.style.zIndex = "9999";

    // Append the button element to the body of the document
    document.body.appendChild(filterButton);

    // Add an event listener to the button element that calls the filterJobs function when clicked
    filterButton.addEventListener("click", filterJobs);
})();
