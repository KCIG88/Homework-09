//file system module
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');
//const generateHTML = require("./generateHTML");



inquirer
  .prompt([{

    type: "input",
    message: "What is your github name?",
    name: "username"
  },
  {
    type: "input",
    message: "What is your favorite color?",
    name: "color"
  }
  ])

  .then(answers => {
    const username = answers.username;
    //const color = answers.color;



    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(response => {
      
const avatar_url = response.data.avatar_url;
const location = response.data.location
const repos = response.data.public_repos
const followers = response.data.followers
const following = response.data.following
const name = response.data.name
const bio = response.data.bio
const htmlUrl = response.data.html_url
const github = response.data.login
const html = `
<html lang="en">
<body>
      <h1>${name}</h1>
      <h1>Github: ${github}</h1>
    <a href=${htmlUrl}><img src=${avatar_url}></img></a>
    <h1>Located: ${location}</h1>
    <h1>Repositories: ${repos}</h1>
    <h1>Followers: ${followers}</h1>
    <h1>Following: ${following}</h1>
    <h1>${bio}</h1>


</body>
</html>
`;
pdf.create(html).toFile('output.pdf', console.log);
      }).catch(console.log)
    })
