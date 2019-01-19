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
It's as easy as 1,2,3!

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
    - The requirements state that the app should be served through `app.js`, but this helps seperate the serving portion of the app from the setup portion.

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
- The starter comments have been removed from the templates

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
        - Note: The stack message only appears when the app is running in development mode (when the NODE_ENV environment variable is not present or set to "development")

#### Layout, CSS, and styles
- The following items have been customized:
    - background color (sidebar and mobile navbar are now firebrick red)
    - color (to supplement the background color change, text is lighter in sidebar and navbar)
    - text shadow (Main page headers now have a gray shadow)
    - added logo (present in sidebar and navbar)

### Other things of note
- A favicon has been added for browser tabs and bookmarks.
- The `data.json` file is structured slightly differently for the image URLs than stated in the requirements, but it still generally conforms to it. Specifically, the `image_urls` property on each project is an object with the following keys:
    - `landing`: path to landing image
    - `gallery`: array of paths for gallery images