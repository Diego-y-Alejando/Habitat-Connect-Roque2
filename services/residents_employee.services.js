const residents_employee = require('../models/residents_employee.model');
const resident_employee_relationships = require ('../models/resident_employee_relationships.model.js');
const createEmployeForResidentsService = async(employeeData)=>{
    const {name, lastname,dpi,phone_number,occupation_list}= employeeData

    try {
        const [data,created]=await residents_employee.findOrCreate({
            where:{
                dpi:dpi,
                phone_number:phone_number
            },
            defaults:{
                name:name,
                lastname:lastname,
                occupation_list
            }
        })
        if (!created) throw new Error('No se pudo crear el empleado')
        return {
            msg:'Se ha creado el empleado',
            data
        }
    } catch (error) {

        throw error.message
    }
}
const getResidentsEmployeeService = async (page)=>{
    try {

        const offset = (parseInt(page) - 1) * 10;
        const {rows,count} =await residents_employee.findAndCountAll({
            attributes: ["maid_id",'name','phone_number','occupation_list'],
            offset,
            limit: 10,
            order: [['maid_id', 'DESC']],
        });
        if (rows.length<=0) throw new Error('No hay empleados') 
        const totalPages = Math.ceil(count/10)
 
        return {
            totalPages,
            count,
            currentPage:page,
            employeesList:rows
        }
    } catch (error) {
        throw error.message
    }
}
const getResidentEmployeeDetailService = async(maid_id, columns)=>{
    try {
        const maid_info = await residents_employee.findOne({
            where:{
                maid_id:maid_id
            },
            attributes:columns
        })
        if (!maid_id) throw new Error('No existe el empleado');


        return maid_info
    } catch (error) {
        throw error.message
    }
}
const getMyEmployeesService = async (resident_id,page)=>{
    try {
        const offset = (parseInt(page) - 1) * 10;
        const {rows , count} = await resident_employee_relationships.findAndCountAll({
            offset,
            limit: 10,
      
            where:{
                id_resident_boss:resident_id
            },
            attributes:['id_employe_of_resident'],
            include:[
                {
                    model:residents_employee,
                    as:'relationshipWhitEmploye',
                    foreignKey:'id_employe_of_resident',
                    attributes:['maid_id','name','phone_number','occupation_list'],
                    order: [['name', 'ASC']],
                }
            ]
        });
        const totalPages = Math.ceil(count/10)
        const newRows = rows.map((employe)=>{
            const newObject={
                ...employe.get()['relationshipWhitEmploye'].get()

            }
            delete newObject['relationshipWhitEmploye']
            return newObject
        })
        if (rows.length<=0) throw new Error('No hay empleados') 
            return {
                totalPages,
                count,
                currentPage:page,
                employeesList:newRows
        }
    } catch (error) {
        throw error
    }
}
module.exports={
    createEmployeForResidentsService,
    getResidentsEmployeeService,
    getResidentEmployeeDetailService,
    getMyEmployeesService
}