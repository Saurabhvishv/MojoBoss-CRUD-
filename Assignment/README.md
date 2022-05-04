Create a NodeJS application and perform the task below

Table name should be employee

Q1) Create Api to register a employee (Parameters:-name,age,email,password,department)
//post localhost:3000/register
{
    "status": true,
    "Message": "Employee registered successfully",
    "data": {
        "name": "Tanisk Vishwakarma",
        "age": 24,
        "email": "tanisk@gmail.com",
        "password": "$2b$10$1QGgtInuFydwsdK6irtT7e/jYB/pmWCUC8uCXVYRQIf36aCllksI.",
        "department": "Sales",
        "isDeleted": false,
        "_id": "6272052fee5a5ad65304a69e",
        "createdAt": "2022-05-04T04:46:39.615Z",
        "updatedAt": "2022-05-04T04:46:39.615Z",
        "__v": 0
    }
}

Q2) Create Api to login the employee
//post localhost:3000/login
{
    "status": true,
    "message": "employee login successfull",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiNjI3MjA1MmZlZTVhNWFkNjUzMDRhNjllIiwiaWF0IjoxNjUxNjQwNzM4LCJleHAiOjE2NTE2ODM5Mzh9.SxezLXhK6BSL6mEiyZAWM9Jz-iJ0-ASYl52CaDl8kBM",
        "employeeId": "6272052fee5a5ad65304a69e"
    }
}

Q3) Create Api to fetch all the employee in employee table
//get localhost:3000/fetch
{
    "status": true,
    "Message": "Details fetch successfully",
    "data": [
        {
            "_id": "6271f9d83a3e52d6d5e97b5d",
            "name": "Saurabh Vishwakarma",
            "age": 24,
            "email": "saurabh@707gmail.com",
            "password": "$2b$10$lQD2UDkaKe8aVAa1GS6pA.QGmi/FBHGPgGGH4tVNMDbr4Gl2l9nN6",
            "department": "Incometax",
            "isDeleted": false,
            "createdAt": "2022-05-04T03:58:16.070Z",
            "updatedAt": "2022-05-04T03:58:16.070Z",
            "__v": 0
        },
        {
            "_id": "6272052fee5a5ad65304a69e",
            "name": "Tanisk Sharma",
            "age": 26,
            "email": "tannu@gmail.com",
            "password": "$2b$10$1QGgtInuFydwsdK6irtT7e/jYB/pmWCUC8uCXVYRQIf36aCllksI.",
            "department": "Sales",
            "isDeleted": true,
            "createdAt": "2022-05-04T04:46:39.615Z",
            "updatedAt": "2022-05-04T07:05:31.848Z",
            "__v": 0
        }
    ]
}


//fecth data by authentication
// get localhost:3000/fetch/6272052fee5a5ad65304a69e
{
    "status": true,
    "Message": "Details fetch successfully",
    "data": [
        {
            "_id": "6271f9d83a3e52d6d5e97b5d",
            "name": "Saurabh Vishwakarma",
            "age": 24,
            "email": "saurabh@707gmail.com",
            "password": "$2b$10$lQD2UDkaKe8aVAa1GS6pA.QGmi/FBHGPgGGH4tVNMDbr4Gl2l9nN6",
            "department": "Incometax",
            "isDeleted": false,
            "createdAt": "2022-05-04T03:58:16.070Z",
            "updatedAt": "2022-05-04T03:58:16.070Z",
            "__v": 0
        }
}

Q4) Create Api to update employee profile
//put localhost:3000/update/6272052fee5a5ad65304a69e
{
    "status": true,
    "Message": "Data Updated Successfully",
    "data": {
        "_id": "6272052fee5a5ad65304a69e",
        "name": "Tanisk Sharma",
        "age": 26,
        "email": "tannu@gmail.com",
        "password": "$2b$10$1QGgtInuFydwsdK6irtT7e/jYB/pmWCUC8uCXVYRQIf36aCllksI.",
        "department": "Sales",
        "isDeleted": false,
        "createdAt": "2022-05-04T04:46:39.615Z",
        "updatedAt": "2022-05-04T06:49:17.162Z",
        "__v": 0
    }
}

Q5) Create Api to delete a user

//delete  localhost:3000/delete/6272052fee5a5ad65304a69e
{
    "status": true,
    "msg": "Employee Deleted",
    "data": {
        "_id": "6272052fee5a5ad65304a69e",
        "name": "Tanisk Sharma",
        "age": 26,
        "email": "tannu@gmail.com",
        "password": "$2b$10$1QGgtInuFydwsdK6irtT7e/jYB/pmWCUC8uCXVYRQIf36aCllksI.",
        "department": "Sales",
        "isDeleted": true,
        "createdAt": "2022-05-04T04:46:39.615Z",
        "updatedAt": "2022-05-04T07:05:31.848Z",
        "__v": 0
    }
}