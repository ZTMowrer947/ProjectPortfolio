# ProjectPortfolio
Treehouse FSJS Techdegree Unit 6 Project

## Project Description
This project is concerned with creating a portfolio to show off the five previous projects of the Techdegree.

## Downloading and Running
Clone the repository and run npm's start script in the resulting directory.
```
git clone https://github.com/ZTMowrer947/ProjectPortfolio
cd ProjectPortfolio
npm start
```

This will run the app in development mode, and upon changing code in the backend, the app will automatically restart to apply the changes.

The app can also be run in production mode, where the app doesn't restart on changes and the stack traces of errors are hidden (for security reasons).

Running the app in production mode is done by following the above instructions, but replacing `npm start` with `npm run start:production`.

Once you have the app running, it will tell you on which port it is running on. Simply go to `localhost:<port>`, replacing `<port>` with the provided port number.

## Technologies used
- [Node.js backend](https://nodejs.org)
- [Pug view engine](https://pugjs.org)
- [Express web framework](https://expressjs.com)

## Project Criteria
### Requirements being met
#### App initialization and dependencies
- The node_modules folder is not included in the repo, as it is present in the .gitignore file.
- Running `npm install` downloads all dependencies for the app.
- Running `node .` serves the app.

#### Project Data
- The `data.json` file is present.
- The `data.json` file a `projects` properties set to an array of five objects, each containing the following properties:
    - `id`
    - `project_name`
    - `description`
    - `live_link`
    - `github_link`
    - `image_urls`

#### Routes
- The following routers render the appropriate pages:
    - `/` - Home page
    - `/about` - About page
    - `/projects` route, includes an `id` parameter
- There is a `static` route to serve static assets from the `public` folder.

#### Templates
- The following Pug templates are present:
    - `layout`
    - `index`
    - `about`
    - `project`

- Templates have all the required information as exemplified in the provided HTML and mockup files:
    - name
    - titles
    - descriptions
    - project descriptions
    - project images
    - links
- The starter comments have been removed from the templates.

#### Errors
- App logs out user friendly error messages when the app is pointed to non-existent routes.

#### Layout, CSS, and styles
- Final project's layout and positioning matches the mockups and HTML files.

### Requirements being exceeded
#### App initialization and dependencies
- Running `npm start` serves the app.

#### Templates
- An `error` Pug template is present.

#### Errors
- when the app is directed to a non-existent route, the app displays a user friendly error in the browser, including the following:
    - `error.message`
    - `error.status`
    - `error.stack`
        - Note: The stack message only appears when the app is running in development mode.

#### Layout, CSS, and styles
- The following items have been customized:
    - background color (sidebar and mobile navbar are now firebrick red)
    - color (to supplement the background color change, text is lighter in sidebar and navbar)
    - text shadow (Main page headers now have a gray shadow)
    - added logo (present in sidebar and navbar)

### Other things of note
- A favicon has been added for browser tabs and bookmarks.