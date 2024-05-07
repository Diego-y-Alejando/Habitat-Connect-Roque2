const home_visit = require('../../models/homeVisit.model');
const apartament = require('../../models/apartament.model')
const {Sequelize,Op}=require('sequelize')

const createHomeVisitService =async (homeVisitData)=>{
    try {
       return await home_visit.create(homeVisitData);
    } catch (error) {
        throw new Error(error)
    }
}

const checkHomeVistiService = async(checkHomeVisitData,home_visit_id)=>{
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
const getAllHomeVisitsService =async (page,searchData)=>{
    try {
       
        const whereForSearch =  {
            [Op.or]: [
              { visitors_name: { [Op.like]: `%${searchData}%` } }, 
              { dpi: { [Op.like]: `%${searchData}%` } } ,
              {resident_name: { [Op.like]: `%${searchData}%` }}
            ]
          }
        const offset = (page - 1) * 10;
        return  await home_visit.findAndCountAll({
            attributes: ['home_visit_id', 'visitors_name', 'dpi',  'home_visit_state' ],
            offset,
            limit: 10,
            where: searchData? whereForSearch :{},
            order: [['home_visit_id', 'DESC']],
            include:[{
                model:apartament,
                as:'HomeVisitForApartament',
                where:{
                    apartament_id:Sequelize.col('id_apartament_visit')
                },
                attributes:['apartament_number']
            }]
        });

    } catch (error) {
        throw new Error(error)
    }
}
const searchHomeVistisService =async(searchData,page)=>{
    try {
        const offset = (page - 1) * 10;
        return  await home_visit.findAndCountAll({
            where: {
              [Op.or]: [
                { visitors_name: { [Op.like]: `%${searchData}%` } }, 
                { dpi: { [Op.like]: `%${searchData}%` } } ,
                {resident_name: { [Op.like]: `%${searchData}%` }}
              ]
            },
            attributes: ['home_visit_id', 'visitors_name', 'dpi',  'home_visit_state' ],
            limit: 10,
            order: [['home_visit_id', 'DESC']],
            include:[{
                model:apartament,
                as:'HomeVisitForApartament',
                where:{
                    apartament_id:Sequelize.col('id_apartament_visit')
                },
                attributes:['apartament_number']
            }]
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
        throw new Error(error)
    }
}
module.exports={
    createHomeVisitService,
    checkHomeVistiService,
    getAllHomeVisitsService,
    searchHomeVistisService,
    undoCheckHomeService
}