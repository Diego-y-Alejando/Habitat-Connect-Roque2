const home_visit = require('../models/homeVisit.model');
const {Sequelize,Op}=require('sequelize')
const {
    getCurrentDateAndTime,
    changeObjectNames
}= require('../helpers/helpers');
const createHomeVisitService =async (homeVisitData)=>{
    try {
       return await home_visit.create(homeVisitData);
    } catch (error) {
        throw new Error(error)
    }
}
const checkHomeVisitService = async(checkHomeVisitData,home_visit_id)=>{
    try {
        return await home_visit.update(checkHomeVisitData,{
            where:{
                home_visit_id:home_visit_id
            }
        });
     } catch (error) {
         throw new Error(error)
     }
}
const getAllHomeVisitsService =async (page,user_request,resident_id,dateForSearch,searchData,columns,upCommingVisits)=>{
    try {
       let whereObj={}
        if (user_request ='resident_request') {
            if (upCommingVisits==='2') {
                whereObj= {
                    id_visit_creator:resident_id,
                    visit_date:{
                       [Op.gte] :dateForSearch
                    },
                    [Op.or]: [
                        { visitors_name: { [Op.like]: `%${searchData}%` } }, 
                        { dpi: { [Op.like]: `%${searchData}%` } } ,
                    ]
                }
            }else{
                whereObj= {
                    id_visit_creator:resident_id,
                    visit_date:dateForSearch,
                    [Op.or]: [
                        { visitors_name: { [Op.like]: `%${searchData}%` } }, 
                        { dpi: { [Op.like]: `%${searchData}%` } } ,
                    ]
                }
            }
           
        }else if(user_request='security_user'){
            whereObj={
                visit_date:dateForSearch,
                [Op.or]: [
                    { visitors_name: { [Op.like]: `%${searchData}%` } }, 
                    { resident_name: { [Op.like]: `%${searchData}%` } }, 
                    { dpi: { [Op.like]: `%${searchData}%` } } ,
                ]
            }
        }
        const offset = (page - 1) * 10;
        return  await home_visit.findAndCountAll({
            attributes: columns,
            offset,
            limit: 10,
            where:whereObj,
            order: [['home_visit_id', 'DESC']],
        });

    } catch (error) {
        throw new Error(error)
    }
}
const undoCheckHomeService = async(home_visit_id,prevHomeVisitData)=>{
    try {
        return await home_visit.update(prevHomeVisitData,{
            where:{
                home_visit_id:home_visit_id
            }
        });
    } catch (error) {
        throw error
    }
}
const getHomeVisitService = async(visit_id,resident_id,columns)=>{
    try {
        const {dataValues} = await home_visit.findOne({
            where:{
                home_visit_id:visit_id,
                id_visit_creator:resident_id
            },
            attributes:columns
        })
        return dataValues
    } catch (error) {
        throw error
    }
}
const editHomeVisitService = async(visit_id,resident_id,dataToEdit)=>{
    try {
        const  [updatedHomeVisit] = await home_visit.update(dataToEdit,{
            where:{
                home_visit_id:visit_id,
                id_visit_creator:resident_id,
                cancel_state:1
            }
        })
        if (updatedHomeVisit<=0) {
            throw new Error('No se ha podido actualizar la visita')
        }
        return 'Has actualizado la visita'
    } catch (error) {
        throw error
    }
}
const cancelHomeVisitService =async(visit_id,resident_id)=>{
    try {
        const  [updatedHomeVisit] = await home_visit.update({
            cancel_state:0
        },{
            where:{
                home_visit_id:visit_id,
                id_visit_creator:resident_id,
            }
        })
        if (updatedHomeVisit<0) {
            throw new Error('No se ha podido cancelar la visita')
        }
        return 'Has cancelado la visita '
    } catch (error) {
        throw error
    }
}
const undoCancelHomeVisitService =async(visit_id,resident_id)=>{
    try {
        const  [updatedHomeVisit] = await home_visit.update({
            cancel_state:1
        },{
            where:{
                home_visit_id:visit_id,
                id_visit_creator:resident_id,
            }
        })
        if (updatedHomeVisit<0) {
            throw new Error('No se ha podido deshacer la cancelación')
        }
        return 'Has deshecho la cancelación'
    } catch (error) {
        throw error
    }
}
module.exports={
    createHomeVisitService,
    checkHomeVisitService,
    getAllHomeVisitsService,
    undoCheckHomeService,
    getHomeVisitService,
    editHomeVisitService,
    cancelHomeVisitService,
    undoCancelHomeVisitService
}