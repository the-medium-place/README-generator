
// node package imports
const inquirer = require("inquirer");
const fs = require("fs");
const axios = require('axios');


// ask for user info
inquirer.prompt([
    {
        type: "input",
        message: "What is your GitHub User ID?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your project Title?",
        name: "title"
    },
    {
        type: "input",
        message: "Short Project Description:",
        name: "description"
    },
    {
        type: "input",
        message: "Any Installation Requirements?",
        name: "installation"
    },
    {
        type: "input",
        message: "Usage Stuff?",
        name: "usage"
    },
    {
        type: "input",
        message: "Licensing Stuff",
        name: "license"
    },
    {
        type: "input",
        message: "Contributing Stuff",
        name: "contributing"
    },
    {
        type: "input",
        message: "Tests Stuff",
        name: "tests"
    },
    {
        type: "input",
        message: "Questions Stuff",
        name: "questions"
    }

]).then(response => {
    console.log(response);

    let queryURL = "https://api.github.com/users/" + response.username;

    axios.get(queryURL)
        .then(response => {

            // user avatar url
            let userPic = response.data.avatar_url;

            console.log(response.data.login);
            console.log(userPic);
            fs.appendFile("READMEtest.md", `![user image](${userPic})\n`, err => console.log(err));

        })
        .catch(error => {

            console.log(error);
        });

    fs.appendFile("READMEtest.md", `# ${response.title}\\n\\n\\n`, err => console.log(err));
    fs.appendFile("READMEtest.md", `${response.description}\\n\\n`, err => console.log(err));
    fs.appendFile("READMEtest.md", `${response.username}\\n\\n`, err => console.log(err));
    


})


// let apiQueryUrl = "https://api.github.com/users/the-medium-place";

// axios.get('https://api.github.com/users/the-medium-place')
//     .then(response => {

//         let userPic = response.data.avatar_url;

//     })
//     .catch(error => {

//         console.log(error);
//     });


