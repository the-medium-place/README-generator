
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
    }
]).then(response => {
    // console.log(response);

    let apiQueryUrl = "https://api.github.com/users/" + response.username;

    axios.get(apiQueryUrl)
        .then(response => {

            // user avatar url
            let userPic = response.data.avatar_url;

            console.log(response.data.login);
            console.log(userPic);

        })
        .catch(error => {

            console.log(error);
        });


})


// let apiQueryUrl = "https://api.github.com/users/the-medium-place";

// axios.get('https://api.github.com/users/the-medium-place')
//     .then(response => {

//         let userPic = response.data.avatar_url;

//     })
//     .catch(error => {

//         console.log(error);
//     });


