const {response, request}= require('express')

const {
    createHomeVisitService,
    checkHomeVisitService,
    getAllHomeVisitsService,
    searchHomeVistisService,
    undoCheckHomeService,
    getHomeVisitService,
    editHomeVisitService,
    cancelHomeVisitService,
    undoCancelHomeVisitService,
}= require('../services/homeVisit.services');
const {Sequelize,Op}=require('sequelize')
const {
    getCurrentDateAndTime,
    changeObjectNames
}= require('../helpers/helpers');
    
const createHomeVisitController = async (req = request , res = response )=>{
    const {resident_name,visitors_name,dpi,visit_date}= req.body;
    try {
        // req.resident_id es añadido ala request desde que se recibe el token del resident e
        const {dataValues} = await createHomeVisitService({
            'resident_name': resident_name.trim(),
            'visitors_name':visitors_name.trim(),
            'dpi':dpi,
            'visit_date':visit_date,
            'id_visit_creator':req.resident_id,
            'home_visit_state':'0',
            'cancel_state':1
        });
        return res.status(200).json({
            msg:'Se ha creado la visita doméstica',
            ok:true,
            visitData:{
                visit_id:dataValues.home_visit_id,
                visitors_name:dataValues.visitors_name,
                dpi: dataValues.dpi,
                visit_date:visit_date,
                visit_state:dataValues.home_visit_state,
                cancel_state:'1'
            }
        })
            
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        });
    }
}
const editHomeVisitController =async(req = request , res = response)=>{
    const visit_id = req.params.visit_id
    try{
      const dataUpdated = await editHomeVisitService(visit_id,req.resident_id,req.body);
      return res.status(200).json({
        msg:'Has actualizado tu visita',
        dataUpdated,
        ok:true
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
        const dateTime = getCurrentDateAndTime()
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
    
        const newStausHomeVisit = await checkHomeVisitService(checkHomeVisitData,visit_id)
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
const getAllHomeVisitForResidentController = async (req = request , res = response )=>{
    const page=parseInt(req.query.page)
    const searchData = req.query.searchData ||''
    const visitFilter = req.query.visitFilter
    
    try {
       const {homeVisitList,totalPages,currentPage,count} = await getAllHomeVisitsService(page,'resident',req.resident_id,searchData,['home_visit_id', 'visitors_name','home_visit_state','cancel_state'],visitFilter)
        if (totalPages==0) {
            return res.status(200).json({
                msg:'No tienes visitas domésticas ',
                'home-visits':[],
                ok:true,
                totalPages

            })
        }
        else if (currentPage === totalPages) {
            return res.status(200).json({
                'home-visits':homeVisitList,
                msg:'No tienes más visitas',
                ok:true,
                count:count,
                currentPage:page,
                totalPages

            });
        }
        return res.status(200).json({
            'home-visits':homeVisitList,
            count:count,
            currentPage:page,
            ok:true,
            totalPages
        });
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:'false'
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
const cancelHomeVisitController =async(req = request , res = response)=>{
    const visit_id = req.params.visit_id
    try {
        const cancelHomeVisit = await cancelHomeVisitService(visit_id,req.resident_id);
        
        return res.status(200).json({
            msg:cancelHomeVisit,
            cancel_state:0,
            ok:true
        })
        
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const undoCancelHomeVisitController =async(req = request , res = response)=>{
    const visit_id = req.params.visit_id
    try {
        const undoCancel = await undoCancelHomeVisitService(visit_id,req.resident_id);
        return res.status(200).json({
            msg:undoCancel,
            prevState:1,
            ok:true
        })
        
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:false
        })
    }
}
const getHomeVisitController= async(req= request, res = response)=>{
    const visit_id = req.params.visit_id
    try {
        const homeVisitResult = await getHomeVisitService(visit_id,req.resident_id,['resident_name','dpi','visit_date'])
        return res.status(200).json({
            visit:homeVisitResult,
            ok:true
        })
    } catch (error) {
        return res.status(404).json({
            error:error.message,
            ok:'false'
        })
    }
}
module.exports={
    createHomeVisitController,
    checkHomeVisitController,
    getAllHomeVisitForResidentController,
    undoCheckHomeVisitController,
    editHomeVisitController,
    cancelHomeVisitController,
    undoCancelHomeVisitController,
    getHomeVisitController
}
