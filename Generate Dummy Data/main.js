// // Generate a dummmy data in this format in a collection called Employees in a db called company

// // This should be the schema
// // {
// //     name: "Pappu",
// //     salary: 450000,
// //     language:"Python",
// //     city:"america",
// //     isManager: true
// // }

// // Generate 10 such records when a button called generate data is clicked
// // Create an express app with mongoose to achieve it
// // Every time the button is clicked , you should clear the collection
// const express = require('express');
// const mongoose = require('mongoose');
// const Employee = require('./models/Employee');
// const app = express();
// const port = 3000;

// mongoose.connect("mongodb://localhost:27017/company");

// app.set("view engine", "ejs");

// const getRandom = (arr)=>{
//     let rno = Math.floor(Math.random()*(arr.length - 1));
//     return arr[rno];
// }

// app.get('/', (req, res) => {
//     res.render("index", { foo: "Jai Shree Ram 🚩" });
// })

// app.get('/generate', async (req, res) => {

//     // Deleting the data
//     await Employee.deleteMany({});
//     // Generate random data

//     let randomNames = ["Ravi","Laddu","Sheela","Munni"];
//     let randomLang = ["C++","Java","C#","JavaScript"];
//     let randomCities = ["Raipur","Mumbai","Gurgaon","Rampur"];
//     for (let index = 0; index < 10; index++) {
//         let e = await Employee.create({                        //directly await lga skte hai hum
//             name: getRandom(randomNames),
//             salary: Math.floor(Math.random()*84000),
//             language: getRandom(randomLang),
//             city:  getRandom(randomCities),
//             isManager: Math.random()>0.5? true:false,
//         })
//         console.log(e);
//     }

// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })



// ___________OR____________

// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();
const port = 3000;

// Set up EJS as view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/company', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema for Employees collection
const employeeSchema = new mongoose.Schema({
  name: String,
  salary: Number,
  language: String,
  city: String,
  isManager: Boolean
});

// Create model for Employees collection
const Employee = mongoose.model('Employee', employeeSchema);

// Define route to generate dummy data and clear collection
app.get('/generate-data', async (req, res) => {
    try {
      // Clear the collection
      await Employee.deleteMany({});
      
      // Generate dummy data
      const dummyData = [];
      for (let i = 0; i < 10; i++) {
        dummyData.push({
          name: `Employee${i}`,
          salary: Math.floor(Math.random() * 1000000) + 50000, // Random salary between 50000 and 1050000
          language: "Python",
          city: "America",
          isManager: true
        });
      }
      
      
      // Insert dummy data into collection
      await Employee.insertMany(dummyData);
  
      // Send JSON response
      res.json({ message: 'Dummy data generated and collection cleared successfully.' });
    } catch (error) {
      console.error('Error generating dummy data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Define route to serve the index page
app.get('/', (req, res) => {
  res.render('index', { message: '' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
