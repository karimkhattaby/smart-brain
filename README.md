# Smart Brain Web App
Face Detection Web App created with PERN stack.<br>
The hosted version can be found [HERE](https://smart-brain-karim.herokuapp.com/).

## Functionality
Users can register, signin and upload an image (by entering a direct image link),
and the app will display rectangles around all detected faces in the picture.

## Tech Stack
Front-end: React<br>
Back-end: Node.js & Express.js<br>
Database: PostgreSQL<br>

## Frameworks
1. Clarifai API
2. bcrypt-nodejs
3. Knex
4. Pg
5. Tachyons
6. Serve
7. Cors
8. Express
9. Nodemon

## Installation
1. Clone this repo
2. Run `npm install`
3. Change the URL in src/App.js to your own API backend.
4. Run `npm run dev`

## Backend API
API Repo can be found [HERE](https://github.com/karimkhattaby/smart-brain-api)

## Frontend
Browse to http://localhost:3000/, signin/register, and upload an image!

## Usage
1. You can login using these credentials:
- Email: `test@test.com`
- Password: `test123`

Or you can Register using a fake email/password.<br><br>
2. Afterwards, you need to enter a direct image link
(right click on image and click on `Copy Image Address`)

## Notes
1. The Web App uses SSL encryption through HTTPS protocol to transfer input data.
2. Passwords are hashed once received by the backend.
3. Despite 1 and 2, I'd still recommend using a fake/weak password to avoid any potential future attacks.
4. Emails aren't verified, so you can use any email even if it's fake.
5. Entered images URLs are NEVER stored in the database or API logs.

## Troubleshooting
1. If your image isn't working, make sure the image URL points directly to the image file (you might want to right click on the image and click on `Copy Image Address`).<br>
If you are sure about the image, maybe the face detection API reached its 5000 images per month limit.<br>
However, do check your browser console for any potential bad requests or errors, and raise an issue in case you find any.<br><br>
2. Sometimes the server responds slow for signin/register requests, so please be patient.<br>
However, do check your browser console for any potential bad requests or errors, and raise an issue in case you find any.

## Hosted Version
The latest version is deployed and hosted on Heroku. Check it out by clicking [HERE](https://smart-brain-karim.herokuapp.com/).