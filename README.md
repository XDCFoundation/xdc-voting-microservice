# XDC Voting Microservice

## Usage

This microservice handle API requests to fetch the address group details and creating the address details.

- Add address
- Get address
- Delete address
- Update address
- Get voting percentage
- Get all voters for proposal
- Get total cast votes
- Address search
- Add proposal
- Get proposal list
- Get voters list by proposal
- Get proposal by date
- Get proposal by status
- Get proposal by address
- Get passed proposal
- Get total proposal list
- Get voter list
- Get paginated proposal list
- Get list of addresss
- Get list of white listed address
- Get proposal detail
- Search by addess
- Total votes by voter
- Add email

## Steps for local setup

- clone the repository in your local system
- run `npm install` : To install the dependencies
- run `npm run start` : It will start your server on your local machine
- Configuration : `config/env` directory contains files to define environment specific variables
- Dependencies : Defined under `package.json`
- Database configuration : Defined under `config/dbConnection`
- Deployment instructions : Docker based deployment, Dockerfile is there in parent directory

## About env folder

This folder is having different types of variables like DB url, PORT, microservice url etc.

- **development** : Variables which are used in development environment.
- **local** : Variables which are used for local system.
- **production** : Variables which are used for production environment.
- **test** : Variables which are used for testing purpose.
