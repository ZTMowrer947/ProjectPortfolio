# ProjectPortfolio
Treehouse FSJS Techdegree Unit 6 Project

## Project Description
This project is concerned with creating a portfolio to show off the five previous projects of the Techdegree.

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
