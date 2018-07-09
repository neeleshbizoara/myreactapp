

--------------------------------------------------------------
Install concurrently to execute Server and Client Concurrnetly
To do so edit server's package.json 

    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\"  \"npm run client\""

--prefix to navigate anther location

---------------------------------------------------------------
Stumbling when route from Client to Server call to fix this we use Proxy in package.json 
(This is in dev env for productin don't need proxy) 

Why we use proxy 
1. we are using cookies in our app so
2. remove CORS error

-----------------------------------------------------------------

fetch in es2015
example:
function fetchAlbem(){
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(res => res.json())
    .then(json => console.log(json))
};

fetchAlbem();

async and await in es2017
async function fetchAlbem() {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
}
fetchAlbem();

OR

const fetchAlbem = async() => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums');
    const json = await res.json();

    console.log(json);
}
fetchAlbem();

-----------------------------------------------------------------------------
install following in client 
npm install --save redux react-redux react-router-dom

If Class is exporting any component then named that file with uppercae for example App.js in client\src\components
and if that class return functions then it starts with lower case.

----------------------------------------------------------------------------
https://egghead.io/lessons/react-redux-writing-a-todo-list-reducer-adding-a-todo
Important video is 25
createStore
subscribe
dispatch
getState()
combineReducers

React redux has 
a. Provider 
b. connect
Action creator in 

context in react to use pass 

Three principle of redux
1. first principle of Redux - everything that changes in your application, including the data and the UI state, is contained in a single object, we call the state or the state tree. 
2. second principle of Redux - the state is read only. The only way to change the state tree is by dispatching an action. An action is a plain JavaScript object, describing in the minimal way what changed in the application. Whether it is initiated by a network request or by user interaction, any data that gets into the Redux application gets there by actions.


Pure and Impure Function: 
The pure functions are the functions whose returned value depends solely on the values of their arguments.
Pure functions do not have any observable side effects, such as network or database calls. The pure functions just calculate the new value. 

function square(x) {
	return x*x;
}

Also, pure functions do not modify the values passed to them.
function squareAll(items) {
	return items.map(square);
}

impure functions may call the database or the network, they may have side effects, they may operate on the DOM, and they may override the values that you pass to them. This is going to be an important distinction because some of the functions that you're going to write in Redux have to be pure, and you need to be mindful of that.

function square(x){
	updateInDatabase(x);
	return x*x;
}

function squareAll(items) {
	for(let i = 0; i < items.length; i++) {
		items[i] = square(items[i]);
	}
}

3. the third and the last principle of Redux. To describe state mutations, you have to write a function that takes the previous state of the app, the action being dispatched, and returns the next state of the app. This function has to be pure. This function is called the "Reducer."

OR 

To describe state mutations write a function called the reducer.

Reducer

a. is a Pure function (i.e. always returns same value given same arguments)
b. takes two arguments: current state of application, action to be dispatched
c. returns the next state of the application
d. Must return current state for undefined actions. (use default switch statement)

Typically, implement the reducer as a switch statement, organized according to the action types. Any other variables that need to be declared/changed will be passed in along in the action object.



Example:

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
​
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}
​
import { combineReducers, createStore } from 'redux'
const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)

https://www.sohamkamani.com/blog/2017/03/31/react-redux-connect-explained/

----------------------------------------------------------------------------------------
We are using Material css for desining 
We are not using Material-UI fro designing because to edit it or customize it we need to exit JavaScript file which will be more deficult.

run install npm install --save materialize-css@next in client project

Note: 
1. in import statment we need to add .css extension as webpack assumes if there is no extension then its js file
2. in import if we haven't mention relative path for example 'import materializeCSS from 'materialize-css/dist/css/materialize.min.css';'
  webpack assumes this packade is from npm/node_module
  import materializeCSS from 'materialize-css/dist/css/materialize.min.css'; materializeCSS nt assigne any thing from css so we can remove 
  ' materializeCSS from ' the above statment.

----------------------------------------------------------------------------------------------------------------

Next we need to install following in client 
npm install --save axios redux-thunk 

-------------------------------------------------
What is the diff between ComponentDidMount and ComponentWillMount

-------------------------------------------------
React router has provided Link tag Purpose for this tag is "Navigate to a diffrent route rendered by React router"
where a tag is used "Navigate to a completely diffrent HTML document"

-------------------------------------------------

In front end we are using 2015 modules which user 'import' and 'export default' keywords.
where as backend uses commonjs module here we use 'require()'.
So we can put some condition before using require on the other hand we can not use any condition brfore require().
that's the resion we are not using import keys in frontend as in backend.

To add keys in frontend: 
https://github.com/wmonk/create-react-app-typescript/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables


We are going to use https://stripe.com/ for payment 

We are going to insatll React Stripe Checkout Component in our frontend application that is client.
To do that run "npm install --save react-stripe-checkout" in client project.

-------------------------------------------------------------------------------

We need to install stripe on backend to do that run 'npm install --save stripe' in Server.
Documentation is avalible on : https://stripe.com/docs/api/node#charge_object

"npm install --save body-parser" run this in server to make post request for stripe

-----------------------------------------------------------------------------

We are going to deploy server and client bout on heroku, here we need to build production assets after dependencies are installed.

Ref. https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process

To do so write following line in servers package.json 
"heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --perfix client && npm run build --prefix client"

---------------------------------------------------------------------------------

Run following command to push your code on heroku "git push heroku master"

To see logs of heroku run "heroku logs" in your terminal.

To open your application run "heroku open" command in your terminal.
