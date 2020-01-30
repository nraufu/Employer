import '@babel/polyfill';
import responseHandler from '../helpers/response';
import sendMail from '../helpers/sendMail';
import {query} from '../models/connect';
import queries from '../models/queries';

const employee = {
    async addEmployee(req, res) {
        try {
            const { name, email, national_id, phoneNumber, date_of_birth, position } = req.body;
            const employee = await query(queries.employeeAlreadyExist, [email, national_id, phoneNumber]);
            if(employee.rowCount) return responseHandler(res, 409, {Error: "an Employee with the same email,phoneNumber or national Id already exists"});
            const newEmployee = await query(queries.addEmployee, [req.authorizedManager.email,name,email, national_id, phoneNumber, date_of_birth, position]);
            const newEmployeeInfo = newEmployee.rows[0];
            sendMail(newEmployeeInfo.name, newEmployeeInfo.email, newEmployeeInfo.position);
            return responseHandler(res, 201, { "Success": "Employee created", newEmployeeInfo});  
        } catch (error) {
            responseHandler(res, 500, { "Error": error.message });
        }
    },

    async editEmployee(req, res) {
        try {
            const { name, email, national_id, phoneNumber, date_of_birth, position } = req.body;
            const employee = await query(queries.getEmployee, [req.authorizedManager.email, req.params.id]);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            const updateEmployeInfo = await query(queries.editEmployee, [name, email, national_id, phoneNumber, date_of_birth, position, req.authorizedManager.email, req.params.id]);
            return responseHandler(res, 200, {Success: "employee successfully edited", updateInfo: updateEmployeInfo.rows[0]});
        } catch (error) {
            responseHandler(res, 500, {Error: error.message})
        }
    },

    async activateEmployee(req, res){
        try {
            const employee = await query(queries.activateEmployee, [req.authorizedManager.email, req.params.id, 'active']);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            if(employee.rows[0].status === "active") return responseHandler(res, 200, {Activation: "employee activated successfully", "employee status": employee.rows[0]});
        } catch (error) {
            responseHandler(res, 500, {Error: error.message})
        }
    },

    async suspendEmployee(req, res){
        try {
            const employee = await query(queries.suspendEmployee, [req.authorizedManager.email, req.params.id, 'inactive']);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            if(employee.rows[0].status === "inactive") return responseHandler(res, 200, {Activation: "employee Suspended successfully", "employee status": employee.rows[0]});
        } catch (error) {
            responseHandler(res, 500, {Error: error.message})
        }
    },

    async deleteEmployee(req, res){
        try {
            const employee = await query(queries.deleteEmployee, [req.authorizedManager.email, req.params.id]);
            if(!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            return responseHandler(res, 200, { deleted: "employee removed successfully" });
        } catch (error) {
            responseHandler(res, 500, {Error: error.message});
        }
    },

    async searchEmployee(req, res){
        try {
            const { email, position, name, phoneNumber} = req.body;
            const employee =  await query(queries.searchEmployee, [req.authorizedManager.email, name, position, phoneNumber, email]);
            if (!employee.rowCount) return responseHandler(res, 404, {Error: "Employee Doesn't exist"});
            return responseHandler(res, 200, { search_completed: "employee found", employee: employee});
        } catch (error) {
            responseHandler(res, 500, {Error: error.message});
        }
    }
}

export default employee