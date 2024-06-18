const jwt = require('jsonwebtoken');
const regex=/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/
const  {findData,getCurrentDateAndTime} = require('../helpers/helpers');
const validateName = (name ,size) => {
    if (!name) {
      throw new Error('El nombre es obligatorio')
    } else if (!regex.test(name)) {
      throw new Error('El nombre sólo puede contener letras y espacios')
    }else if(name.trim().length>size){
      throw new Error(`El nombre se exede de ${size} caracteres puedes colocar unicamente dos nombres` )
    }
}
const validateLastName = (lastName,size) => {
    if (!lastName) {
      throw new Error('El apellido es obligatorio')
    } else if (!regex.test(lastName)) {
      throw new Error('El apellido sólo puede contener letras y espacios')
    }else if(lastName.trim().length>size){
      throw new Error('El apellido se exede de 55 caracteres ')
    }
}
  
const validateDpi = (dpi) => {
    const regexDpi= /^[0-9-]+$/
    if (!dpi) {
      throw new Error('El DPI es obligatorio')
    } else if (!regexDpi.test(dpi)) {
      throw new Error('El DPI sólo puede contener números y guiones')
    }else if(dpi.trim().length>15){
      throw new Error('El dpi se exede de 15 caracteres revisa que este correcto ')
    }
  }
  
const validatePhoneNumber = (phone) => {
    const regexPhone= /^\d{4}-\d{4}$/
    if (!phone) {
      throw new Error('El numero de teléfono  es obligatorio')
    } else if (!regexPhone.test(phone)) {
      throw new Error('El numero de  teléfono  debe tener el siguiente formato XXXX-XXXX')
    }else if(phone.trim().length>14){
      throw new Error('El numero de  teléfono se exede de 14 caracteres revisa que este correcto ')
    }
  }

const validationPath=(path,regexPath)=>{
    if (!path) {
      throw new Error('el path que enviaste viene vacío')
    }
    else if(!regexPath.test(path)){
      throw new Error(`el path ${path} no es el correcto, revisa el path`) 
    }else if(path.trim().length>200){
      throw new Error('el path es demasiado largo porfavor revisa el path algo anda mal')
    }
  }
const bodyVerification=(object,allowProperties)=>{
  if (!object || typeof object !== 'object' || Object.keys(object).length==0) {
      throw new Error(`el objeto ${object} no es valido o viene vacio`) 
  }
    else if (!Object.keys(object).every(property => allowProperties.includes(property))) {
      throw new Error('Contiene propiedades no válidas');
    }
}
const validationEmail=(email)=>{
    const regexEmail =/^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    if(!email){
      throw new Error('El email es requerido');
    }
    else if(!regexEmail.test(email)){
      throw new Error('El formato del email no es valido');
    }else if(email.length>100){
      throw new Error('El email excede de 100 caracteres')
    }
  }
const validationPassword=(password)=>{
    const regexPassword= /^[^'"‘’“”`;*<>|=]+$/g;
    if (!password) {
      throw new Error('La contraseña no debe de estar vacía '); 
    }
     else if (!regexPassword.test(password)) {
      throw new Error('La contraseña contiene caracteres no permitidos ');
      
    }

}
const validationDepartament=(departaments)=>{
  const allowDepartaments =['SALES-D','PROD-D','MED-D','RECEPTION-D','MANAGER-D'];
  if (!departaments) {
    throw new Error('El departamento no puede venir vacío')
  }
  if (!allowDepartaments.includes(departaments)) {
    throw new Error('Departamento incorrecto'); 
  }
}
const validatePosition =(position)=>{
  const allowPositions=['Jefa de departamento','Asistente principal','Asistente secundario','Gerente comercial','Apoyo al paciente','Recepcionista','Dentista']
  if(position==='nulo') {
    throw new Error('Debes asignar una posición');
  }if(!allowPositions.includes(position)) {
    throw new Error('La posicion es incorrecta');
  }
}
const validateSupervisor=(supervisor)=>{
  if (!supervisor) {
    throw new Error('El supervisor no puede venir vacío')
  }
  if (!regex.test(supervisor)) {
      throw new Error('Para él supervisor unicamente debes colocar el nombre')
  }
}
const recordExist =async(message,model, record_id)=>{
  try{

    const recordSearched = await model.findByPk(record_id)
    if (!recordSearched) {
      throw new Error(`${message}`);
    }
   } catch (error) {
      throw (error);
   }
}

const tokenValidation = async (token, model, secretKey, allowUsers) => {
  
  try {
    if (!token) throw new Error('No se ha enviado el token');
    const { id, user_type } = jwt.verify(token, secretKey);
    console.log(id,user_type);
    if (!user_type || !allowUsers.includes(user_type)) throw new Error('El token es inválido');

    const user = await model.findByPk(id)
    if (!user) throw new Error('El usuario no existe en la base de datos');

    return {
      id,
      user_type
    };
  } catch (error) {
    throw new Error(error);
  }
};

const validationOfIdenticatedlId=(idToken,idUser)=>{
  if (idToken!=idUser) {
    throw new Error('Conflicto de Idtoken con idUser');
  }
}
const paramsValidation=(param,description)=>{
  const regexNumber =/^[0-9]+$/;
  if (!param) {
      throw new Error(`El id de ${description} no puede venir vacío `)
  }
  else if(!regexNumber.test(param)){
      throw new Error(`El id de ${description} contiene caracteres  no validos`);
  }
  // validar que no se exceda de cierta catnidad de caracteres
}
const ValidationIdOrLevel =(message,level)=>{
  const regexLevel=/^[\d]+$/
  if (!level) {
      throw new Error('El '+message+' viene vacio')
  }
  if (!regexLevel.test(level)) {
    throw new Error('El '+message+' es invalido ')
  }
}
const allowAcction =(employePosition,requirePosition)=>{
  if (employePosition!=requirePosition) {
    throw new Error('No tienes permiso para realizar esta acción');
  }
}
const validationOccupationValue =(occupation)=>{
  const regexOcupation=/\b(Carpintero|Plomero|Electricista|Limpieza|Cerrajero|Pintor|Albañil|Contratista)\b/
  if (!regexOcupation.test(occupation)) {
    throw new Error('La ocupacion del empleado no es válida')
  }
}
const validationDates=(date,message)=>{
  const regexDate = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[1-2]\d|3[0-1])/
  if (!date) {
    throw new Error(`${message} no puede venir vacío`)
  }
  if(!regexDate.test(date)){
    throw new Error(`${message }tiene un formato inválido`)
  }
}
const validationOcupationState = (state) => {
  const regexState = /^0|1/

  if (state === null || state === undefined) {
    throw new Error('El estado de ocupacion es obligatorio')
  }if (!regexState.test(state)) {
    throw new Error('El estado  de ocupacion no es correcto')
  }
}

const objectOwner=(idToken,employeeToken,message)=>{
  if (idToken!= employeeToken) {
    throw new Error(message)
  }
}
const validateIfBookingDateIsBeforeToday=(openning_date,closing_date)=>{
  const diferenciaEnMilisegundos = closing_date - openning_date;
  // Convierte la diferencia en días dividiendo por la cantidad de milisegundos en un día
  const diasDiferencia = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  if ( diasDiferencia<0 ||diasDiferencia<8) {
      throw new Error(`Hay menos de 8 días de diferencia entre la fecha ${openning_date} y ${closign_date}` )
  }
  
}
const validationYear = (year)=>{
  const regexYear=/^(\d{4})/
  if (!year) {
    throw new Error('El año no puede venir vacío')
  }else if (!regexYear.test(year)){
    throw new Error('El año contiene caracteres no válidos ')
  }else if (year<1998 || year>2070) {
    throw new Error('El valor del año excede los limites')

  }

}
const validationCost = (cost, message)=>{
  const regexCost = /^[\d]{2,3}\.[\d]{2}$/
  if (!cost) {
    throw new Error(`El costo de ${message} no puede venir vacío`);
  }else if(!regexCost.test(cost)){
    throw new Error(`El costo de ${message} tiene  un formato invalido , debe ser 00.00`);
  }
}

const validationHour = (hour, message)=>{
  const regexHour = /^(0[0-9]|1[0-9]|2[0-4]):([0-5][0-9])/

  if (!hour) {
    throw new Error(`La hora de ${message} no puede venir vacía`);
  }else if(!regexHour.test(hour)){
    throw new Error(`La hora de ${message} contiene caracteres no válidos `)
  }
}

const ValidationPaidStatus=(paid_status)=>{
  // 1 pago a tiempo 2 pago con mora 3 impago
  const regexPaidStatus=/^1|2|3/
  if (!paid_status) {
    throw new Error('El estado de pago no puede venir vacío')
  }
  if (!regexPaidStatus.test(paid_status)) {
    throw new Error('El estado de pago tiene caracteres inválidos')
  }
}
const validationMonth= (month)=>{
  const regexMonth =/^january|february|march|april|may|june|juli|august|september|october|november|december/
  if (!month) {
      throw new Error('El mes no puede venir vacío')
  }if (!regexMonth.test(month)) {
      throw new Error('El valor del mes no es correcto')
  }
}
const validatePage =(page)=>{
  const regexPage=/^[1-9]+$/
  if (!page) {
      throw new Error('La pagina no puede venir vacía')
  }
  if (!regexPage.test(page)) {
    throw new Error('La paginacion es inválida')
  }
}
const validationVisitStatus =(visit_status)=>{
  const regexVisitStatus=/^[1-2]+$/
  if (!visit_status) {
      throw new Error('El estatus de la visita  no puede venir vacío')
  }
  if (!regexVisitStatus.test(visit_status)) {
    throw new Error('El estatus de la visita es inválida')
  }
}
const {differenceInDays,isAfter}= require('date-fns')
const checkIsAfterToday =(date,message)=>{
 
   const todayDate = getCurrentDateAndTime('yyyy-MM-dd')
   const days = differenceInDays(date,todayDate)
   
    if (days<0) {
        throw new Error(message)
    }
}
const validationQueryParams =(queryParams)=>{
  const  objectValidations = {
      'page':(value)=>{
          validatePage(parseInt(value));
      },
      'searchData':(value)=>{
          const regex=/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/
          const regexDpi= /^[0-9-]+$/
          if(!regexDpi.test(value)&& !regex.test(value)){
              throw new Error('Contiene caracteres no válidos ')
          }
      },
      'date':(value)=>{
          validationDates(value,'La fecha que busca')
          checkIsAfterToday(value,'No puedes acceder a registros antiguas')
      },
      'upCommingVisits':(value)=>{
        const regexSearchAfterToday =/^[1-2]+$/
        if (!regexSearchAfterToday.test(value)) {
          throw new Error('El parametro searchAfterToday tiene un valor incorrecto')
        }
      }
  }
  Object.keys(queryParams).forEach(propertyName=>{
      if (objectValidations.hasOwnProperty(propertyName)) {
          objectValidations[propertyName](queryParams[propertyName])
      }else{
          throw new Error('Se han enviado propiedades inválidas');
      }
  })
}
module.exports ={
    validateName,
    validateLastName,
    validateDpi,
    validatePhoneNumber,
    validationPath,
    bodyVerification,
    validationEmail,
    validationPassword,
    validationDepartament,
    validatePosition,
    validateSupervisor,
    recordExist,
    tokenValidation,
    validationOfIdenticatedlId,
    paramsValidation,
    ValidationIdOrLevel,
    allowAcction,
    validationOccupationValue,
    validationDates,
    validationOcupationState,
    objectOwner,
    validateIfBookingDateIsBeforeToday,
    validationYear,
    validationCost,
    validationHour,
    ValidationPaidStatus,
    validationMonth,
    validatePage,
    validationVisitStatus,
    checkIsAfterToday,
    validationQueryParams
    
}