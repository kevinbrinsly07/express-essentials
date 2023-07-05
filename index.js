import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

// Using the public folder at the root of the project
app.use(express.static("public"));
// Using the images folder at the route /images
app.use("/images", express.static("images"));

//Using express.json and express.urlencoded
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP GET
app.get("/", (req, res) => {
  res.json(data);
});

//HTTP POST - express.json and express.urlencoded
app.post("/item", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// HTTP - Download method
app.get("/download", (req, res) => {
  res.download("images/wallpaper.jpg");
});

// HTTP GET - redirect method
app.get("/redirect", (req, res) => {
  res.redirect("http://www.linkedin.com");
});

// ---------------- Route chaining --------------------

app
  .route("/class")
  .get((req, res) => {
    res.send("Retrieve class info");
    // throw new Error(); throw an error to check custom error function
  })
  .post((req, res) => {
    res.send("Create class info");
  })
  .put((req, res) => {
    res.send("Update class info");
  });

// HTTP GET
// app.get("/class", (req, res) => {
//   res.send("Retrieve class info");
// });

// HTTP POST
// app.post("/class", (req, res) => {
//   res.send("Create class info");
// });

// HTTP PUT
// app.put("/class", (req, res) => {
//   res.send("Update class info");
// });

// ------------------ end Route chaining --------------

// HTTP GET - with next()
app.get(
  "/next",
  (req, res, next) => {
    console.log("the response will be send by the next function");
    next();
  },
  (req, res) => {
    res.send("I just setup a Route with a second callback");
  }
);

// HTTP GET - with Routing Parameters
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const student = data.filter((student) => student.id === studentId);
  res.send(student);
});

// HTTP POST
app.post("/create", (req, res) => {
  res.send("this is a POST request at /create");
});

// HTTP PUT
app.put("/edit", (req, res) => {
  res.send("this is a POST request at /edit");
});

// HTTP DELETE
app.delete("/delete", (req, res) => {
  res.send("this is a DELETE request at /delete");
});

// Custom error handler function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("something is broken!");
});

app.listen(PORT, () => {
  console.log("the server is running on port", PORT);
});
