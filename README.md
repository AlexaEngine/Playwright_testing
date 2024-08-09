Playwright Testing Project
Project Overview
This repository contains a Playwright project that verifies the first 100 articles on the Hacker News "newest" page are sorted from newest to oldest. The script automates the process of navigating to the page, loading the articles, and checking their order.

Project Structure
plaintext
Copy code
Playwright_testing/
│
├── index.js              # Main script file to perform the task
├── tests/
│   └── hackerNews.spec.js # Playwright test case for validating the article order
├── playwright.config.js  # Configuration file for Playwright
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Lockfile for npm dependencies
└── README.md             # Project documentation (this file)
Prerequisites
To run this project, you need to have the following installed:

Node.js (version 12 or later)
npm (comes with Node.js)
Setup Instructions
Clone the Repository:

bash
Copy code
git clone https://github.com/AlexaEngine/Playwright_testing.git
cd Playwright_testing
Install Dependencies:

Install the required dependencies using npm:

bash
Copy code
npm install
Run the Script:

You can run the main script using Node.js:

bash
Copy code
node index.js
Run the Tests:

Alternatively, if you want to run the test cases using Playwright's test runner:

bash
Copy code
npx playwright test
Script Explanation
index.js: This script automates the process of navigating to the Hacker News "newest" page (https://news.ycombinator.com/newest), loading the articles, and validating their order. It uses Playwright to interact with the browser and extract the necessary data.

hackerNews.spec.js: This file contains a Playwright test that replicates the functionality of the main script but is structured as a test case for easier integration into a testing pipeline.

Configuration
playwright.config.js: This file contains the configuration for running Playwright tests, including settings for different browsers and environments.
Troubleshooting
If you encounter any issues while running the script or tests, ensure that you have installed all dependencies correctly and that your environment meets the prerequisites. You can refer to the official Playwright documentation for additional help.

