const sample = {
    validManager: {
        fullName: "manager",
        email: "manager1@gmail.com",
        national_id: "1199604578654120",
        phoneNumber: "0788005542",
        date_of_birth: "16/04/1995",
        password: "Manager1"
    },
    invalidManager: {
        fullName: "manager",
        email:"manager@gmail"
    },
    wrongPassword: {
        email: "manager1@gmail.com",
        password: "manager1" 
    },
    unknownUser: {
        email: "manager@gmail.com",
        password:"manager"
    },
    validEmployee: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "1234567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1996",
		status: "inactive",
		position: "developer"
    },
    invalidToken: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXIyQGdtYWlsLmNvbSIsImlhdCI6MTU3ODk0OTQzNiwiZXhwIjoxNTc5MDM1ODM2fQ.1Cy0BbMlJNEKHMGKpiOPYdMkNR7Ar4HNyk3QMfuN11k"
    },
    editEmployee: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "1234567891234568",
		phoneNumber: "0784542121",
		date_of_birth: "01/02/1986",
		status: "inactive",
		position: "Technician"
    },
    invalidEmployeeData: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "123456789123",
		phoneNumber: "078454212",
		date_of_birth: "01/02/19860",
		status: "inactive",
		position: "Technician"
    },
    signUpValidation1: {
        fullName: "manager",
        email: "manager1@gmail",
        national_id: "1199604578654120",
        phoneNumber: "0788005542",
        date_of_birth: "16/04/1995",
        password: "Manager1"
    },
    signUpValidation2: {
        fullName: "manager",
        email: "manager1@gmail.com",
        national_id: "119960457865412",
        phoneNumber: "0788005542",
        date_of_birth: "16/04/1995",
        password: "Manager1"
    },
    signUpValidation3: {
        fullName: "manager",
        email: "manager1@gmail.com",
        national_id: "1199604578654120",
        phoneNumber: "078800554",
        date_of_birth: "16/04/1995",
        password: "Manager1"
    },    
    signUpValidation4: {
        fullName: "manager",
        email: "manager1@gmail.com",
        national_id: "1199604578654120",
        phoneNumber: "0788005542",
        date_of_birth: "16/04/1995",
        password: "manager"
    },    
    signUpValidation5: {
        fullName: "manager",
        email: "manager1@gmail.com",
        national_id: "1199604578654120",
        phoneNumber: "0788005541",
        date_of_birth: "16/04/1900",
        password: "Manager1"
    },
    signUpValidation6: {
        fullName: " ",
        email: "manager1@gmail.com",
        national_id: "1199604578654120",
        phoneNumber: "0788005541",
        date_of_birth: "16/04/1998",
        password: "Manager1"
    },
    signInValidation1: {
        email: "manager@email",
        password: "Password1"
    },
    signInValidation2: {
        email: "manager@email.com",
        password: "passwor"
    },
    employeeValidation1: {
        name: " ",
		email: "manager@gmail.com",
		national_id: "1234567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1996",
		status: "inactive",
		position: "developer"
    },
    employeeValidation2: {
        name: "fred",
		email: "manager@gmail",
		national_id: "1234567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1996",
		status: "inactive",
		position: "developer"
    },
    employeeValidation3: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "14567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1996",
		status: "inactive",
		position: "developer"
    },
    employeeValidation4: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "1234567891234567",
		phoneNumber: "07542120",
		date_of_birth: "01/02/1996",
		status: "inactive",
		position: "developer"
    },
    employeeValidation5: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "1234567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1800",
		status: "inactive",
		position: "developer"
    },
    employeeValidation6: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "1234567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1996",
		status: " ",
		position: "developer"
    },
    employeeValidation7: {
        name: "fred",
		email: "manager@gmail.com",
		national_id: "1234567891234567",
		phoneNumber: "0784542120",
		date_of_birth: "01/02/1996",
		status: "inactive",
		position: " "
    },

}
export default sample;