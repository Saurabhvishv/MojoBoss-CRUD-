const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const employeeModel = require('../model/employee.js')
const middleware = require('../middleware/middleware.js')
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true;
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isValidAge = function (age) {
    if (age > 17)
        return true
}

const isValidPassword = function (password) {
    if (password.length > 7 && password.length < 16)
        return true
}

//  API 1 Register Employee
const registerEmployee = async function (req, res) {

    try {
        const requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, Message: "please provide employee details in body" })
        }

        let { name, age, email, password, department } = requestBody //destructuring

        if (!isValid(name)) {
            return res.status(400).send({ status: false, Message: "Please provide name" })
        }

        if (!isValid(age)) {
            return res.status(400).send({ status: false, Message: "Please provide age" })
        }

        if (!isValidAge(age)) {
            return res.status(400).send({ status: false, Message: "age of employee is greater than 17." })
        }

        if (!isValid(email)) {
            return res.status(400).send({ status: false, Message: "Please provide email" })
        }

        let Email = email.split(" ").join('')

        const isEmailAlready = await employeeModel.findOne({ email: Email })

        if (isEmailAlready) {
            return res.status(400).send({ status: false, Message: `${Email} is already used` })
        }
        if (!((emailRegex).test(Email))) {
            return res.status(400).send({ status: false, Message: "email is not valid, write in correct format" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, Message: "Please provide password" })
        }

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, Message: "length of password should be 8-15 char." })
        }

        if (!isValid(department)) {
            return res.status(400).send({ status: false, Message: "Please provide department" })
        }

        const encryptedPass = await bcrypt.hash(password, 10)
        const employeeData = { name, age, email, password: encryptedPass, department }
        const createEmployee = await employeeModel.create(employeeData)
        return res.status(201).send({ status: true, Message: "Employee registered successfully", data: createEmployee })
    } catch (error) {
        return res.status(500).send({ status: false, Message: error.message })
    }
}

// API 2 Login Employee
const loginEmployee = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, Message: "Please provide login credentials" })
        }

        const { email, password } = requestBody; //destructuring

        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })

        }

        if (!((emailRegex).test(email))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: `Password is required` })

        }

        const Employee = await employeeModel.findOne({ email });

        if (!Employee) {
            return res.status(404).send({ status: false, Message: `No employee found with ${email}` })
        }

        const matchPassword = await bcrypt.compareSync(password, Employee.password) //matching original and encrypted

        if (!matchPassword) {
            return res.status(401).send({ status: false, message: 'Password Incorrect' })
        }

        const token = await jwt.sign({
            employeeId: Employee._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
        }, 'crud')

        return res.status(200).send({ status: true, message: `employee login successfull`, data: { token, employeeId: Employee._id } });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// API 3.1 get all Employees Details
const getEmployee = async function (req, res) {
    try {

        const employee = await employeeModel.find()

        return res.status(200).send({ status: true, Message: "Details fetch successfully", data: employee })

    } catch (error) {

        return res.status(500).send({ status: false, message: error.message });
    }
}

// API 3.2 get all Employees Details by Id
const getEmployeeById = async function (req, res) {
    try {
        const employeeId = req.params.employeeId
        const tokenId = req.employeeId

        if (!isValidObjectId(employeeId)) {
            return res.status(400).send({ status: false, Message: "Please provide valid employee id" })
        }
        if (employeeId == tokenId) {
            const employee = await employeeModel.findOne({ _id: employeeId, isDeleted: false })
            if (!(employee)) {
                return res.status(404).send({ status: false, msg: "No employee found with this Id" })
            }
        return res.status(200).send({ status: true, Message: "Details fetch successfully", data: employee })
        } else {
            return res.status(401).send({ status: false, Message: "You are not authorized to fetch details of this user!!!" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// API 4 update empoyee details
const updateEmployee = async function(req, res) {

    try {
        const employeeId = req.params.employeeId;
        const requestBody = req.body;
        const decodedId = req.employeeId;

        if (employeeId == decodedId) {
            if (!isValidRequestBody(requestBody)) {
                return res.status(200).send({ Message: "No data updated, details are unchanged" })
            }
            
            let { name, age, email, department } = requestBody //destructuring

            const employeeFind = await employeeModel.findById(employeeId)

            if (name) {
                if (!isValid(name)) {
                    res.status(400).send({ status: false, Message: "Provide a valid name" })
                }
                employeeFind['name'] = name
            }

            if (age) {
                if (!isValid(age)) {
                    res.status(400).send({ status: false, Message: "Provide a valid age" })
                }
                employeeFind['age'] = age
            }

            if (email) {
                if (!(emailRegex).test(email)) {
                    return res.status(400).send({ status: false, message: " Provide a valid email address" })
                }
                const isEmailAlreadyUsed = await employeeModel.findOne({ email: email });
                if (isEmailAlreadyUsed) {
                    return res.status(400).send({ status: false, message: `${email} email address is already registered` })
                }
                employeeFind['email'] = email
            }

            if (department) {
                if (!isValid(department)) {
                    res.status(400).send({ status: false, Message: "Provide a valid department" })
                }
                employeeFind['department'] = department
            }

            const updatedData = await employeeFind.save()
            return res.status(200).send({ status: true, Message: "Data Updated Successfully", data: updatedData })
        } else {
            res.status(401).send({ status: false, Message: "You are not authorzied to update this employee profile" })
        }

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

// API 5 delete empoyee 
const deleteEmployee = async function(req, res) {
    try {
        const employeeId = req.params.employeeId;
        const decodedId = req.employeeId;

        if (employeeId == decodedId) {
        if (!isValidObjectId(employeeId)) {
            return res.status(400).send({ status: false, Message: "Please provide valid employee id" })
        }
        const employee = await employeeModel.findOne({ _id: employeeId, isDeleted: false })
        if (!(employee)) {
            return res.status(404).send({ status: false, msg: "No employee found with this Id" })
        }
        const deletedData = await employeeModel.findOneAndUpdate({ _id: employeeId }, { isDeleted: true, deletedAt: new Date() }, { new: true })
        return res.status(200).send({ status: true, msg: "Employee Deleted", data: deletedData })
    } else {
        res.status(401).send({ status: false, Message: "You are not authorzied to update this employee profile" })
    }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports = { registerEmployee, loginEmployee, getEmployee, getEmployeeById, updateEmployee, deleteEmployee }