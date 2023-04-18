/ ==UserScript==
// @name         ZipRecruiter 1-Click Filter
// @version      0.1
// @description  Adds a button to hide all jobs that are not 1-Click apply on ZipRecruiter. Purely Educational: Using this may be against Ziprecruiter's terms and conditions. See LICENSE for more info.
// @author       github.com/originates
// @match        https://www.ziprecruiter.com/*
// @grant        none
// ==/UserScript==


// This script filters the jobs on ZipRecruiter based on some criteria
(function() {
    'use strict';

    let filterOn = false; // A flag to indicate whether the filter is on or off

    function filterJobs() {

        let url = window.location.href; // Get the current URL
        let regex = /^https:\/\/www\.ziprecruiter\.com\/jobs-search\?search=.+$/; // A regular expression to match the search page

        if (!regex.test(url)) {
            return; // If the URL is not a search page, do nothing
        }

        let jobs = document.querySelectorAll(".job_content"); // Get all the job elements on the page


        for (let job of jobs) {

            let button = job.querySelector(".quick_apply_btn"); // Get the quick apply button of the job

            let badge = job.querySelector(".qualification_grade_badge"); // Get the qualification grade badge of the job

            // If the filter is on and the job does not have a one-click apply button or a good/fair/great qualification grade, hide it
            if (filterOn && (!button || button.dataset.quickApply !== "one_click" || !badge || !["good", "fair", "great"].includes(badge.dataset.qualificationGrade))) {
                job.style.display = "none";
            }

            // If the filter is off and the job is hidden, show it
            if (!filterOn && job.style.display === "none") {
                job.style.display = "";
            }
        }
    }

    let circle = document.createElement("div"); // Create a circle element to indicate the filter status
    circle.style.position = "fixed"; // Position it fixed on the bottom right corner
    circle.style.right = "135px";
    circle.style.bottom = "17px";
    circle.style.zIndex = "9999";
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "red"; // Default color is red

    document.body.appendChild(circle); // Append it to the body

    let filterButton = document.createElement("button"); // Create a button element to toggle the filter
    filterButton.textContent = "Filter Jobs"; // Set its text content
    filterButton.style.position = "fixed"; // Position it fixed on the bottom right corner
    filterButton.style.right = "50px";
    filterButton.style.bottom = "10px";
    filterButton.style.zIndex = "9999";

    document.body.appendChild(filterButton); // Append it to the body


    filterButton.addEventListener("click", function() {
        filterOn = !filterOn; // Toggle the filter flag
        filterJobs(); // Call the filter function

        if (filterOn) {
            circle.style.backgroundColor = "green"; // Change the circle color to green if the filter is on
        }
        else {
            circle.style.backgroundColor = "red"; // Change the circle color to red if the filter is off
        }
    });
})();
