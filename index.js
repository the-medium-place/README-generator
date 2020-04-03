
// node package imports
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

require('dotenv').config();

const questions = [
    {
        type: "input",
        message: "What is your GitHub User ID?",
        name: "username"
    },
    {
        type: "input",
        message: "Project Title:",
        name: "title"
    },
    {
        type: "input",
        message: "Short Project Description:",
        name: "description"
    },
    {
        type: "input",
        message: "Installation Instructions: ",
        name: "installation"
    },
    {
        type: "input",
        message: "Instructions for Use: ",
        name: "usage"
    },
    {
        type: "input",
        message: "Licensing Info (badge): ",
        name: "license"
    },
    {
        type: "input",
        message: "Contributing Info (Leave BLANK for Contributor Covenant): ",
        name: "contributing"
    },
    {
        type: "input",
        message: "Testing Info:",
        name: "tests"
    }
]

const GITHUB_KEY = process.env.GITHUB_KEY;

// ask for user info
inquirer.prompt(questions).then(response => {

    // destructure response object
    const { username, title, description, installation, usage, license, contributing, tests } = response;

    // filter contributing response 
    const contributingFunc = () => {

        if (!contributing) {
            fs.appendFile("READMEtest.md", `## Contributing: \n[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)\n\n`, err => !err ? console.log("contributor convenant badge loaded successfully") : console.log(err));
        } else {
            fs.appendFile("READMEtest.md", `## Contributing: \n ${contributing}\n\n`, err => !err ? console.log("contributing info loaded successfully") : console.log(err))
        }
    }

    // api call for github user info
    const apiCall = () => {
        // axios call to github api
        let queryURL = `https://api.github.com/users/${username}`;

        axios.get(queryURL)
            .then(response => {

                // user avatar url
                const { avatar_url, html_url, email } = response.data;

                // append questions heading / username / user email
                appendFileAsync("READMEtest.md", `## Questions: \n* ${username}\n* Email: ${email}\n \n`)

                // append link to user github bio
                .then(appendFileAsync("READMEtest.md", `* [GitHub Profile](${html_url})\n\n`))

                // append user avatar
                .then(appendFileAsync("READMEtest.md", `![user image](${avatar_url}&s=40)\n\n`))
                .catch(err => !err ? console.log("api success"): console.log(err))

            })
            .catch(error => {console.log("STOP HERE:\n", error)
        });
    }



    writeFileAsync("READMEtest.md", `# ${title}\n \n`)
        .then(appendFileAsync("READMEtest.md", `## License: \n![License: ${license}](https://img.shields.io/badge/License-${license}-green.svg) \n \n`))
        .then(appendFileAsync("READMEtest.md", `## Description: \n${description} \n \n`))
        .then(appendFileAsync("READMEtest.md", `## Table of Contents\n* [Installation](#installation)\n* [Usage](#usage)\n* [Contributing](#contributing)\n* [Testing](#tests)\n* [Questions](#questions)\n\n`))
        .then(appendFileAsync("READMEtest.md", `## Installation: \n${installation} \n \n`))
        .then(contributingFunc())
        .then(appendFileAsync("READMEtest.md", `## Usage: \n${usage}\n\n`))
        .then(appendFileAsync("READMEtest.md", `## Tests: \n${tests}\n\n`))
        .then(apiCall())
        .catch(err => !err ? console.log("success!!") : console.log(err));




}).catch(err => console.log(err))



