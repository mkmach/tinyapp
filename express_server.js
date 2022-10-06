const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080; // default port 8080

app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false})); //body parser



const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// GET /login
app.get('/login', (req, res) => {
  res.render('login');
})

// POST /login
app.post ('login', (req, res) => {
  res.cookie('userID', user.id)

  res.redirect('/login ')
})

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

function generateRandomString() {
  const randString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let results = ''
  for (let i = 0; i < 6; i++) {
    results += randString[Math.floor(Math.random() * randString.length)]
  }
  return results
}


// create a short URL after user inputs a long URL
app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  let newKey = generateRandomString()
  // res.send(newKey);
  urlDatabase[newKey] = req.body.longURL
  res.redirect(`/urls/${newKey}`) 
});

//RENDERS THE URL FORM PAGE FOR USERS TO EDIT 
app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id/delete", (req, res) => {
  const id = req.params.id
  delete urlDatabase[id]
  res.redirect("/urls")
})

//updates Long Url when user input submits edit
app.post("/urls/:id", (req, res) => {
  const id = req.params.id
  urlDatabase[id] = req.body.longURL
  res.redirect("/urls")}
)

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
})


app.get("/u/:id", (req, res) => {
  // console.log("it's working")
  const shortURL = req.params.id;
  // console.log("urlDatabase", urlDatabase)
  // console.log("shortURL", shortURL)
  // console.log("req.params", req.params)
  // console.log("req.params.shortURL", req.params.id)
  if (shortURL) {
    let longURL = urlDatabase[shortURL]
    // console.log("urlDatabase[shortURL]", urlDatabase[shortURL])
    res.redirect(longURL);
  } else {
    res.send("no short URL")
  }
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/hello", (req, res) => {
  const templateVars = { greeting: "Hello World!" };
  res.render("hello_world", templateVars);
});
app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
 });
 
 app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
 });

 