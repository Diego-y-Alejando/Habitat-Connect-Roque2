const {request , response}= require('express');
const checkDuplicateQueryParams =(req= request, res= response , next)=>{

    const {query} = req;

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
           const value = query[key]
           if (Array.isArray(value)) {
            return res.status(400).json({
                error:'Existe un query param duplicado',
                ok:false
            })
          }
        }
    }
    next();
}
const checkDuplicateBodyParams =(req= request , res = response, next)=>{
    const {body} = req
    const bodyKeys = Object.keys(body);
    const duplicateProperties =  bodyKeys.length != new Set(bodyKeys).size

   if(duplicateProperties){
        return res.status(400).json({
            error:'Existe un param duplicado en el body',
            ok:false
        })
   }
   next()
}

module.exports= {
    checkDuplicateQueryParams,
    checkDuplicateBodyParams
}