const {response, request}= require('express')

const {
    createHomeVisitService,
    checkHomeVistiService,
    getAllHomeVisitsService,
    searchHomeVistisService,
    undoCheckHomeService
}= require('../../services/securityServices/homeVisit.services');

const {
    formatDateAndHour,
    changeObjectNames
}= require('../../helpers/helpers');

const createHomeVisitController = async (req = request , res = response )=>{
    const {apartament_id,resident_name,visitors_name,dpi}= req.body;

    try {
        const {dataValues} = await createHomeVisitService({
            'resident_name': resident_name.trim(),
            'visitors_name':visitors_name.trim(),
            'dpi':dpi,
            'id_apartament_visit':apartament_id,
            'id_visit_creator':req.id_creator,
            'home_visit_state':'0'
        });
        
        return res.status(200).json({
            msg:'Se ha creado la visita doméstica',
            ok:true,
            visitData:{
                visit_id:dataValues.home_visit_id,
                data_name:dataValues.visitors_name,
                dpi: dataValues.dpi,
                data_state:dataValues.home_visit_state
            }
        })
            
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        });
    }
}
const checkHomeVisitController = async (req = request , res = response )=>{
    const {visit_id,visit_status} = req.body

    try {
        const dateTime = formatDateAndHour()
        let checkHomeVisitData={
            home_visit_state: visit_status
        }
        let message=''
        if (visit_status==1) {
            checkHomeVisitData.start_visit_time=dateTime 
            message='Entrada'
        }else if (visit_status==2) {
            checkHomeVisitData.end_visit_time=dateTime
            message='Salida'
        }
    
        const newStausHomeVisit = await checkHomeVistiService(checkHomeVisitData,visit_id)
        if (newStausHomeVisit<1) {
            throw new Error(`No se ha podido registrar la ${message} de la visita`)
        }
        return res.status(200).json({
            ok:true,
            msg:message,
            newStatus:visit_status
        })
     
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getHomeVisitisControllers = async (req = request , res = response )=>{
    const page=parseInt(req.query.page)
    const searchData = req.query.searchData
    try {

       const result = await getAllHomeVisitsService(page,searchData)
       const totalPages = Math.ceil(result.count/10)

        if (result.rows.length===0) {
            return res.status(200).json({
                msg:'Ya no hay mas visitas domésticas ',
                lastPage:page,
                allRows:[],
                ok:true,
                totalPages
            })
        }
        // cambia de nombre a los registros y elimina la propiedad homeVisitForApartament para hacer una sola propiedad c
        const newRows =result.rows.map(({dataValues}) => {         
            let newObject ={
                ...dataValues,
                'data_apartament_number':dataValues['HomeVisitForApartament'].apartament_number
            }
            delete newObject['HomeVisitForApartament']
            return changeObjectNames(newObject,{
                home_visit_id:'visit_id',
                visitors_name:'data_name',
                dpi:'dpi',
                home_visit_state:'data_state',
                data_apartament_number:'data_apartament_number'
            });
        });
        return res.status(200).json({
            allRows:newRows,
            count:result.count,
            currentPage:page,
            ok:true,
            totalPages
        })
     
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}

const searchHomeVistisController =async (req = request , res = response)=>{
    const searchData = req.query.searchData
    const page = parseInt(req.query.page)

    try {
        const searchedResult = await searchHomeVistisService(searchData,page);
        if (searchedResult.rows.length===0) {
            return res.status(200).json({
                msg:'Ya no hay mas visitas domésticas ',
                lastPage:page,
                ok:true
            })
        }
        const newRows =searchedResult.rows.map(({dataValues}) => {         
            let newObject ={
                ...dataValues,
                'data_apartament_number':dataValues['HomeVisitForApartament'].apartament_number
            }
            delete newObject['HomeVisitForApartament']
            return changeObjectNames(newObject,{
                home_visit_id:'visit_id',
                visitors_name:'data_name',
                dpi:'dpi',
                home_visit_state:'data_state',
                data_apartament_number:'data_apartament_number'
            });
        });
        return res.status(200).json({
            searchedResult:newRows,
            ok:true,
            currentPage:page,
            count: searchedResult.count
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const undoCheckHomeVisitController = async(req = request , res = response)=>{
    const {visit_id,prevState}= req.body
    try {
        let undoData = {
            home_visit_state:prevState
        } 
        if (prevState==0) {
            undoData.start_visit_time=null
        }else if(prevState==1){
            undoData.end_visit_time=null
        }
        const undoHomeVisit = await undoCheckHomeService(visit_id,undoData)
        if (undoHomeVisit<1)throw new Error(`No se pudo deshacer la ultima acción`)
        return res.status(200).json({
            msg:'Haz deshecho la última accion ',
            ok:true,
            prevState:prevState
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
module.exports={
    createHomeVisitController,
    checkHomeVisitController,
    getHomeVisitisControllers,
    searchHomeVistisController,
    undoCheckHomeVisitController
}
