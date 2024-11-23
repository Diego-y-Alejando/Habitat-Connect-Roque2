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


const getAllHomeVisitsService =async (page,user_request,resident_id,searchData,columns,visitFilter)=>{
    try {
        const whereObj = buildWhereClause(user_request, resident_id, searchData, visitFilter);
        console.log('este es el where',whereObj);
        
        const offset = (page - 1) * 10;
        const {rows , count}= await home_visit.findAndCountAll({
          attributes: columns,
          offset,
          limit: 10,
          where: whereObj,
          order: [['home_visit_id', 'DESC']],
          raw: true
        });
        const totalPages = Math.ceil(count/10)
        
        const newRows =rows.map((visit,index) => {              
            let newObject ={
                ...visit,
            }
            // delete newObject['HomeVisitForApartament']
            return changeObjectNames(newObject,{
                home_visit_id:'visit_id',
                visitors_name:'visitors_name',
                cancel_state:'cancel_state',
                home_visit_state:'visit_state',
            });
         });
         return {
            totalPages,
            count,
            currentPage:page,
            homeVisitList:newRows.length>0 ? newRows: []
        }
      } catch (error) {
        throw (error);
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
        return {visit_id:visit_id,...dataToEdit}
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
const buildWhereClause = (user_request, resident_id, searchData, visitFilter) => {
    
    
    const currentDate =  getCurrentDateAndTime('yyyy-MM-dd')
    if (user_request==='resident') {
      const whereObj = {
        [Op.or]:[ // Use OR operator for multiple search fields
            { visitors_name: { [Op.like]: `%${searchData}%` } },
            { dpi: { [Op.like]: `%${searchData}%` } }
        ],
        id_visit_creator: resident_id,
        visit_date: visitFilter === 'today' ?currentDate : { [Op.gt]:currentDate },
        cancel_state:1
      };
      if (visitFilter === 'today') delete whereObj['cancel_state']

      return whereObj


    }else if (user_request === 'security_user') {
      return {
        [Op.or]: [
          { resident_name: { [Op.like]: `%${searchData}%` } },
        ],
      };
    }
    return {};
};