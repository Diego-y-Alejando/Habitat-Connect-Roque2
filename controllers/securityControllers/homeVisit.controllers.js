const {response, request}= require('express')

const {
    createHomeVisitService,
    checkHomeVistiService,
    getAllHomeVisitsService,
    searchHomeVistisService,
    undoCheckHomeService
}= require('../../services/securityServices/homeVisit.services');

const {
    formatDateAndHour
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
                msg:'Has creao una visita  doméstica',
                ok:true,
                homeVisitData:{
                        visit_id:dataValues.home_visit_id,
                        visitors_name:dataValues.visitors_name,
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
    try {
       const result = await getAllHomeVisitsService(page)
        if (result.rows.length===0) {
            return res.status(200).json({
                msg:'Ya no hay mas visitas domésticas ',
                lastPage:page,
                ok:true
            })
        }
        return res.status(200).json({
            result,
            ok:true
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
    try {
        const homeVisitSearch = await searchHomeVistisService(searchData);
        return res.status(200).json({
            searchedResult:homeVisitSearch,
            ok:true
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
