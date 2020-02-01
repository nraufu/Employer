![GitHub](https://img.shields.io/github/license/nraufu/Employer)
[![Build Status](https://travis-ci.org/nraufu/Employer.svg?branch=develop)](https://travis-ci.org/nraufu/Employer)
[![Coverage Status](https://coveralls.io/repos/github/nraufu/Employer/badge.svg?branch=develop)](https://coveralls.io/github/nraufu/Employer?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/f49d15a2139cfdda9afe/maintainability)](https://codeclimate.com/github/nraufu/Employer/maintainability)

# Employer

Employer is a management system used by manager in an organization to keep track of their employees;

# features

- Manager can create an account.
- Manager can sign in.
- Manager can add a new employee.
- Manager can edit an employee.
- Manager can remove an employee.
- Manager can suspend or activate an employee.

## Technologies

* [NodeJS](https://nodejs.org/) - JavaScript Runtime Environment
* [ExpressJs](https://expressjs.com/) - A Minimal  Web Application Framework
* [PostgreSQL](https://postgresql.org) - a free and open-source relational database management system

## Getting Started

 ### Prerequisites

 Ensure you have NodeJS installed on your computer by entering  `node -v ` on your terminal. If you don't have NodeJS installed go to the [NodeJS Website](https://nodejs.org/en/download/), and follow the download instructions
 
### Installation

Clone the app
* ``` git clone https://github.com/nraufu/employer.git```

Install all the packages
* ``` npm install ```

Run the server
*  ``` npm start ```

## Testing
Run Test case
* ```npm run test```

Test Api 
* [Postman](https://getpostman.com/)



## Working Routes

|	Endpoint	            | Functionality            |
|---------------------------|:---------------------:   |
|PUT /employees/:id/activate| activate employee        |   
|PUT /employees/:id/suspend | suspend employee         |   
|PUT /employees/:id         | edit employee            |
|POST /employees/:id        | search Employees based on|
|                           | name, email or position  |
|POST /employees            | add employee             |
|DELETE /employees/:Id      | Remove an employee       |
|POST /auth/signup          | Manager Register         |
|POST /auth/login           | Manager Login            |

### Author

[NIYONZI Raufu](https://github.com/nraufu/)