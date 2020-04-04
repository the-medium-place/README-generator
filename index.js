
// node package imports
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

//  array of questions (objects)
const questions = [
    {
        type: "input",
        message: "What is your GitHub User ID?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your E-mail Address?",
        name: "email"
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

// ask for user info
inquirer.prompt(questions).then(response => {

    // destructure response object
    const { username, email, title, description, installation, usage, license, contributing, tests } = response;

    // filter contributing response 
    const contributingFunc = () => {

        if (!contributing) {
            fs.appendFile("READMEgenerated.md", `## Contributing:
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)\n`, err => console.log(err));
        } else {
            fs.appendFile("READMEgenerated.md", `## Contributing:
${contributing}\n`, err => console.log(err))
        }
    }

    // api call for github user info
    const apiCall = () => {
        // axios call to github api
        let queryURL = `https://api.github.com/users/${username}`;

        axios.get(queryURL)
            .then(response => {

                // user avatar url
                const { avatar_url, html_url } = response.data;

                // append questions heading / username / user email
                appendFileAsync("READMEgenerated.md", `## Questions:
* GitHub Profile:  [${username}](${html_url})
* Email: <${email}>
\n
![user image](${avatar_url}&s=50)`)

                    .catch(err => !err ? console.log("api success") : console.log(err))

            })
            .catch(error => {
                console.log(error)
            });
    }


    writeFileAsync("READMEgenerated.md", `# ${title}

![License: ${license}](https://img.shields.io/badge/License-${license}-green.svg) 

## Description: 
${description} 

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Testing](#tests)
* [Contributing](#contributing)
* [Questions](#questions)

## Installation: 
${installation}

## Usage: 
${usage}

## Tests: 
${tests}\n\n`)
        .then(contributingFunc())
        .then(apiCall())
        .catch(err => console.log(err));
}).catch(err => !err ? console.log("README Successfully Generated") : console.log(err));




