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

    let filterOn = false;

    function filterJobs() {

        let url = window.location.href;
        let regex = /^https:\/\/www\.ziprecruiter\.com\/jobs-search\?search=.+$/;

        if (!regex.test(url)) {
            return;
        }

        // Select all job elements that have a class of "job_content"
        let jobs = document.querySelectorAll(".job_content");


        for (let job of jobs) {

            let button = job.querySelector(".quick_apply_btn");

            let badge = job.querySelector(".qualification_grade_badge");

            // If the filter is on and the button or the badge does not exist or does not meet the criteria, hide the job element
            if (filterOn && (!button || button.dataset.quickApply !== "one_click" || !badge || !["good", "fair", "great"].includes(badge.dataset.qualificationGrade))) {
                job.style.display = "none";
            }

            // If the filter is off and the job element is hidden, show it again
            if (!filterOn && job.style.display === "none") {
                job.style.display = "";
            }
        }
    }

    // Create a circle element to indicate the filter state
    let circle = document.createElement("div");
    circle.style.position = "fixed";
    circle.style.left = "635px";
    circle.style.bottom = "17px";
    circle.style.zIndex = "9999";
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "red"; // Default color is red

    // Append the circle element to the body of the document
    document.body.appendChild(circle);

    let filterButton = document.createElement("button");
    filterButton.textContent = "1-Click Filter";
    filterButton.style.position = "fixed";
    filterButton.style.left = "650px";
    filterButton.style.bottom = "10px";
    filterButton.style.zIndex = "9999";

    // Append the button element to the body of the document
    document.body.appendChild(filterButton);

    // Add an event listener to the button element that calls the filterJobs function and switches the filter state and the circle color when clicked
    filterButton.addEventListener("click", function() {
        filterOn = !filterOn;
        filterJobs();
        // If the filter is on, change the circle color to green
        if (filterOn) {
            circle.style.backgroundColor = "green";
        }
        // If the filter is off, change the circle color to red
        else {
            circle.style.backgroundColor = "red";
        }
    });
})();
