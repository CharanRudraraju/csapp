# nodejs-template

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

A `POST /square` endpoint is implemented here to solve an example challenge [Calculate Square](https://calculate-square.herokuapp.com/instructions).
You can use a similar approach as the example to implement endpoints for other challenges. Note the endpoint name required for each challenge.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed. 

```sh
$ git clone https://gitlab.com/CodeITSuisseTemplates/nodejs-template.git # or clone your own fork
$ cd nodejs-template
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

If you run the following `curl` command to send a request to your app, you should be able to see in your logs something like the example below.

```sh
$ curl -d '{ "input": 2 }' -H 'Content-Type: application/json' http://localhost:5000/square
```

```
Request: POST /square at ...
Request Body:
{
	"input": 2
}
Response Body:
4
Response: 200 0.275 ms 
```

## Deploying to Heroku

Make sure you have [Heroku CLI](https://cli.heroku.com/) installed and run this in the project folder.

```
$ heroku create
$ git push heroku main
$ heroku open
```

**or**

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
