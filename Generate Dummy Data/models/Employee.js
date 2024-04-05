// Here we are creating a employee schema
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    language:String,
    city:String,
    isManager: Boolean,
    createdAt: { type: Date, default: Date.now }
})

const Employee = mongoose.model('Employee',employeeSchema);

module.exports = Employee;