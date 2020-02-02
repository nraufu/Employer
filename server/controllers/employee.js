import '@babel/polyfill';
import responseHandler from '../helpers/response';
import nodemailer from 'nodemailer';
import {query} from '../models/connect';
import queries from '../models/queries';

class Employee {
    static async addEmployee(req, res) {
        try {
            const { name, email, national_id, phoneNumber, date_of_birth, position } = req.body;
            const employee = await query(queries.employeeAlreadyExist, [email, national_id, phoneNumber]);
            if(employee.rowCount) return responseHandler(res, 409, {Error: "an Employee with the same email,phoneNumber or national Id already exists"});
            const newEmployee = await query(queries.addEmployee, [req.authorizedManager.email,name,email, national_id, phoneNumber, date_of_birth, position]);
            const newEmployeeInfo = newEmployee.rows[0];
            let transporter = nodemailer.createTransport({host: "smtp.mailspons.com",port: 587, secure: false, auth: {user: '64df3262e765428780b80fdf266daafb', pass: 'fdcd986e70c842329747012132878660'}, tls: {rejectUnauthorized: false}});
            await transporter.sendMail({from: '"Company Inc" <company@example.com>', to: `${email}`, subject: "Admission ✔", html: `<b>Dear ${name}</b> <p>We are to glad to inform you got the offer for the position of ${position} in Our company</p>`});
            return responseHandler(res, 201, { "Success": "Employee created", newEmployeeInfo});  
        } catch (error) {
            return responseHandler(res, 500, { "Error": error.message });
        }
    }

    static async editEmployee(req, res) {
        try {
            const { name, email, national_id, phoneNumber, date_of_birth, position } = req.body;
            const employee = await query(queries.getEmployee, [req.authorizedManager.email, req.params.id]);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            const updateEmployeInfo = await query(queries.editEmployee, [name, email, national_id, phoneNumber, date_of_birth, position, req.authorizedManager.email, req.params.id]);
            return responseHandler(res, 200, {Success: "employee successfully edited", updateInfo: updateEmployeInfo.rows[0]});
        } catch (error) {
            return responseHandler(res, 500, {Error: error.message})
        }
    }

    static async activateEmployee(req, res){
        try {
            const employee = await query(queries.activateEmployee, [req.authorizedManager.email, req.params.id, 'active']);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            if(employee.rows[0].status === "active") return responseHandler(res, 200, {Activation: "employee activated successfully", "employee status": employee.rows[0]});
        } catch (error) {
            return responseHandler(res, 500, {Error: error.message})
        }
    }

    static async suspendEmployee(req, res){
        try {
            const employee = await query(queries.suspendEmployee, [req.authorizedManager.email, req.params.id, 'inactive']);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            if(employee.rows[0].status === "inactive") return responseHandler(res, 200, {Activation: "employee Suspended successfully", "employee status": employee.rows[0]});
        } catch (error) {
            return responseHandler(res, 500, {Error: error.message})
        }
    }

    static async deleteEmployee(req, res){
        try {
            const employee = await query(queries.deleteEmployee, [req.authorizedManager.email, req.params.id]);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            return responseHandler(res, 200, { deleted: "employee removed successfully" });
        } catch (error) {
            return responseHandler(res, 500, {Error: error.message});
        }
    }

    static async searchEmployee(req, res){
        try {
            const { email, position, name, phoneNumber} = req.body;
            const employee =  await query(queries.searchEmployee, [position, name, email, phoneNumber]);
            if (!employee.rowCount) return responseHandler(res, 404, {Error: "Employee not found"});
            return responseHandler(res, 200, { search_completed: "employee found", employee: employee.rows});
        } catch (error) {
            return responseHandler(res, 500, {Error: error.message});
        }
    }
}

export default Employee;