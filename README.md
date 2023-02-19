<h1 align="center">
  GoStars - Tournament Platform
</h1>

<p align="center">
  <a href="#about-gostars">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#getting-started">Getting Started</a>
  •
  <a href="#pages">Pages</a>
  •
  <a href="#server">Server</a>
  •
  <a href="#contact">Contacts</a>
</p>

About GoStars
-----------
[GoStars](https://gitlab.12devs.com/training/2023_trainee/gostars_frontend) is a tournament platform that displays the
current results and schedules of future professional CS:GO matches. This application is built on NextJS and has a server
on NestJS.

Features
-----------

The GoStars application provides several unique advantages that set it apart from its competitors:

- **Modern and responsive layout:** The application has a clean, modern design that looks great on any device.


- **Current schedule of CS:GO matches and results:** The application provides up-to-date information on all CS:GO
  matches, including schedules and results.


- **Internationalization:** The application supports multiple languages, making it accessible to users around the world.


- **Adaptive UI for each type of match:** The application's UI adapts to the specific type of match being viewed,
  whether it's a best-of-three, best-of-five or a single elimination match.

We believe that these features make the GoStars application the best choice for anyone looking to stay up-to-date on the
latest CS:GO matches and results!

Getting Started
-----------

Before starting the installation process, make sure you have Node.js and NPM installed on your machine.

- Open the terminal and run the following commands

```bash
$ git clone https://gitlab.12devs.com/training/2023_trainee/gostars_frontend

$ cd gostars_frontend

$ yarn install
```

- Wait for all the dependencies to be installed
- Type `yarn start` or `yarn dev` to start the app
- Navigate to http://localhost:3000/ in your browser

Pages
-----------
The application has several pages:

- **Results**

  Displays the latest results of all the matches.


- **Matches**

  Displays the schedule of upcoming matches.


- **Match**

  Displays detailed information about a particular match, including the teams, maps, and recording of the match.


- **Event**

  Displays brief information about the tournament and all the matches related to the event.

Server
-----------

The GoStars application is powered by a NestJS server, which provides a robust and scalable backend for serving data to
the frontend. The server is designed to handle large volumes of traffic and data, ensuring that the application can
scale to meet the needs of users as it grows.

The server provides a RESTful API that allows the frontend to easily retrieve data on matches and tournaments. The API
is designed to be flexible and easy to use, making it simple to add new features and functionality to the application.

You can find the code and documentation on the project's
[GitLab repository](https://gitlab.12devs.com/training/2023_trainee/bausiuk_gostars_backend).

Contact
-----------
If you have any questions or concerns about the project, please contact us at visterovegor@gmail.com