const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const { resolveSoa } = require("dns");

const employeeArray = [];
let yesNO = ["yes", "no"];

function createManager() {
    inquirer.prompt([ 
        {
        name: "name", 
        message: "What is Manager's name?", 
        type: "input",
        },

        {
        name: "ID", 
        message: "What is Manager's ID Number?", 
        type: "input",
        },

        {
        name: "Email", 
        message: "What is Manager's E-Mail Address?", 
        type: "input",
        },
        
        {
        name: "Office_Number", 
        message: "What is Manager's Office Number?", 
        type: "input",
        },
 ])
 .then((response) => {
         console.log(response);

         let manager = new Manager(response.name, response.email, response.id, response.Office_Number);
         employeeArray.push(manager);
         addNewMember();
         console.log(addNewMember);
     })
}
createManager();

function createIntern() {
    inquirer.prompt([ {
        name: "name",
        message: "What is the intern's name?",
        type: "input",
    },
    {
        name: "ID",
        message: "What is the intern's ID Number?",
        type: "input",
    },
    {
        name: "Email",
        message: "What is the intern's Email Address?",
        type: "input",
    },
    {
        name: "School",
        message: "What school does the intern attend?",
        type: "input",
    },
]).then((response) => {
        console.log(response);

        let intern = new Intern(response.name, response.Email, response.ID, response.school);
        employeeArray.push(intern);
        addNewMember();

    },

function createEngineer() {
    inquirer.prompt ([ {
        name: "name",
        message: "What is the engineer's name?",
        type: "input",
    },
    {
        name: "ID",
        message: "What is the engineer's ID number?",
        type: "input",
    },
    {
        name: "email",
        message: "What is the engineer's emial?",
        type: "input",
    },
    {
        name: "github",
        message: "What is the engineer's GitHub name?",
        type: "input",
    },


    ]).then((response) => {
            console.log(response);

            let engineer = new Engineer(response.name, response.email, response.ID, response.github);
            employeeArray.push(engineer);
            addNewMember();
        })
},

function addNewMember() {
    inquirer.prompt([ { 
        name: "add", 
        message: "Do you want to add more employees?", 
        choices: "yesNo", 
        type: "list", 
    }

    ]).then((response) => {
            console.log(response);
            if (response.add === "yes") {
                employeeType();
            } else {
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR);
                }
                fs.writeFile(outputPath, render(employeeArray), function (error, data) {
                    if (error)
                        throw error;
                    console.log("Your Employee Summary has been created!");
                });
            }
        })
})}

function employeeType() {
    inquirer.prompt([
        { name: "employee_type", message: "What type of employee?", choices: empType, type: "list" }

    ]).then((response) => {
            console.log(response);

            switch (response.employee_type) {
                case "Intern":
                    createIntern();
                    break;
                case "Manager":
                    createManager();
                    break;
                case "Engineer":
                    createEngineer();
                    break;
                default:
                    return;
            }
        })
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
