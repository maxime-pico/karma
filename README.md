# Karma Panda

_"Give to each individual the power to support companies that share their values"_

We are a community of Pandas who want to change the world by helping people judge at a glance wether companies are good or bad according to their own values.

To learn more about Karma Panda please contact one of the contributors.

If you wish to see the current production state of this project, please head to [`beta.karma-panda.org`](https://beta.karma-panda.org/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You should have some things already installed on your machine:

- [`docker-compose`](https://docs.docker.com/compose/install/) — This will help you automatically setup the needed containers on your machine. Please note that a prerequisite for docker compose is having [Docker CE](https://docs.docker.com/install/) already installed
- [Node](https://nodejs.org/en/) v10.10.0 or above — This will allow you to run the servers on your machine. The recommended install of node is through [`nvm`](https://github.com/creationix/nvm#installation)
- [`npm`](https://www.npmjs.com/get-npm) or [`yarn`](https://yarnpkg.com/en/) — To install all the dependencies of the project
- [`git`](https://git-scm.com/) — as the code version system

During the rest of the installation instructions we will suppose that you have fullfilled the prerequisites and that you chose to install npm. If you went with npm please replace all later occurences of the command `npm` by `yarn`.

For instance

```
npm install
```

Should be replaced by

```
yarn install
```

If you need help with anything, prerequisits install or actual Install, please contact Green Dirt.

### Installing

To install the development environment on your machine and start running the project locally please start by:

#### Cloning the github repository on your machine:

Open a terminal on your machine and `cd` to the folder where you want to clone the project. Note that the result of the cloning will be a directory as well with "karma" as the default name:

`cd path-to/my-folder-containing-many-projects`

From this directory, run the following command:

`git clone https://github.com/Green-Dirt/karma`

Wait until the cloning is over (this might take some time) and `cd` to the cloned directory:

`cd karma`

#### Installing the dependencies

From the karma directory, install the dependencies needed for the frontend part of the project (this might take some time as well):

```
cd react-ui/
npm i
```

Then move to the server directory and install the dependencies needed for the backend part of the project (...aaaaand you guessed it, it might also take some time!):

```
cd ../server/
npm i
```

#### Creating the environment files

For security reasons, the environment variables are not commited to the github and should be installed individually on each machine. You'll need to create these files and paste inside some dummy variables for the project to work locally.

From the server directory, create a file named .env:

`touch .env`

Then paste inside the following content:

```
JWT_APP_SECRET="development-secret"
DATABASE_ENDPOINT="http://localhost:4466"
PRISMA_SCHEMA_FILENAME="prisma"
PRISMA_MANAGEMENT_API_SECRET="development-secret"
MYSQL_ROOT_PASSWORD="prisma"
```

We have to do the same with the database environment file. `cd` to the database directory inside the server directory:

`cd database/`

From there, create a file named .env:

`touch .env`

Paste inside the following content:

```
PRISMA_MANAGEMENT_API_SECRET=development-secret
MYSQL_ROOT_PASSWORD=prisma
```

#### Starting the containers, the backend server and deploying the Prisma service

Inside the database directory start the docker containers that will host the server and database:

`docker-compose up -d`

Now got back to the server directory and then start the backend server:

```
cd ..
npm start
```

Open a new terminal window and go back to the server directory (if needed):

`cd path-to/my-folder-containing-many-projects/karma/server`

From there globally install the prisma cli and deploy the prisma service taking into acount the environment variables:

```
npm intall -g prisma
prisma deploy -e .env
```

#### Start the frontend server and celebrate

Go to the root directory of the frontend directory and start the frontend server:

```
cd ../react-ui/
npm start
```

At that point, a window from your favorite browser should open at the following URI `http://localhost:3000/` greeting you the companies that were seeded: Total, H&M and Mc Donalds.

If that's the case, celebrate, have a coffee and then get back to obviously saving the world!

## Running the tests - TODO

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment - TODO

Add additional notes about how to deploy this on a live system

## Built With

- Create React App (includes many awesome things)
- Prettier
- Styled Components
- React Router
- Flow
- Graph QL
- Apollo GrapQL
- Prisma
- MySQL
- Docker

For more info on the tech stack, the app/database architecture etc. please check the [wiki](https://github.com/Green-Dirt/karma/wiki)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

The workflow used is [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). The different branches and their use is the following:

- master — Unique and always existing — This is the tested stable code that is in production
- develop — Unique and always existing — This branch is always equivalent or ahead of master by a few commits. These commits are the implementation of the new features that will be released at the next version
- {feature} — Multiple at a time, feature dependent — These branches are created from the develop branch in order to support the work of a developer on a specific feature
- release — Unique existing only during the release code review — This branch is used to "compile" the work done on the develop branch, make sure it's stable, fix the potential issues and finish the documentation. It is instantiated by branching from the develop branch
- hotfix — Potentially Multiple at a time, hopefully none — These branches are bug dependent and made from the master branch and used in extreme cases where a critical bug is in production and needs to be fixed. Use with caution

## Authors

- **Green Dirt** - _Initial work_ - [Green Dirt](https://github.com/Green-Dirt)

See also the list of [contributors](https://github.com/Green-Dirt/karma/contributors) who participated in this project.

## License

This project is licensed under the GNU AGPL v3.0 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Thanks to Billie Thompson - aka [PurpleBooth](https://github.com/PurpleBooth) for her [README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
