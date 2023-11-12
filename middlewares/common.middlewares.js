const jwt = require('jsonwebtoken');
const regex=/^[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9 ]+/
const  {findData} = require('../helpers/helpers');
const validateName = (name ,size) => {
    if (!name) {
      throw new Error('El nombre es obligatorio')
    } else if (!regex.test(name)) {
      throw new Error('El nombre sólo puede contener letras y espacios')
    }else if(name.trim().length>size){
      throw new Error('El nombre se exede de 55 caracteres puedes colocar unicamente dos nombres ')
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
  
const validatePersonalPhone = (phone) => {
    const regexPhone= /^\(\d{3}\)\d{4}-\d{4}$/
    if (!phone) {
      throw new Error('El numero de teléfono  es obligatorio')
    } else if (!regexPhone.test(phone)) {
      throw new Error('El numero de  teléfono  debe tener el siguiente formato: (XXX)XXXX-XXXX')
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
const bodyVerification=(object,alloProperties)=>{
    if (!object || typeof object !== 'object' || !Object.keys(object).length) {
      throw new Error(`el objeto ${object} no es valido o viene vacio`) 
  }
    else if (!Object.keys(object).every(property => alloProperties.includes(property))) {
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
const userExist =async(message,model, searchField, targetField, excludeArr )=>{

  try {
   const searchRecord = await model.findOne({
      where:{
        [targetField]:searchField
      },
      attributes:{
        exclude:excludeArr
      }
    });

    if (!searchRecord) {
      throw new Error(`El ${message} no existe`);
    }
    return searchRecord.dataValues 
   } catch (error) {
      throw new Error(error);
   }
}

const tokenValidation = async (token, model, targetField, excludeArr, secretKey, allowUsers) => {
  
  try {
    if (!token) throw new Error('No se ha enviado el token');
    const { id, user_type } = jwt.verify(token, secretKey);
    if (!user_type || !allowUsers.includes(user_type)) throw new Error('El token es inválido');

    const user = await findData(model, id, targetField, excludeArr);
    if (!user) throw new Error('El usuario no existe en la base de datos');

    return id;
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
const validatePage =(page)=>{
  const regexPage=/^[1-9]+$/
  if (!page) {
      throw new Error('La pagina no puede venir vacía')
  }
  if (!regexPage.test(page)) {
    throw new Error('La paginacion es invalida')
  }
}
const allowAcction =(employePosition,requirePosition)=>{
  if (employePosition!=requirePosition) {
    throw new Error('No tienes permiso para realizar esta acción');
  }
}
const validationParagraph =(paragaph)=>{
  const regexParagraph=/^[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9,. ]+/
  if (!regexParagraph.test(paragaph)) {
    throw new Error('El parrafo contiene caractéres no válidos ,solo se permiten comas,puntos y números')
  }
}
const validationDates=(date,campo)=>{
  const regexDate = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[1-2]\d|3[0-1])/
  if (!date) {
    throw new Error(`El campo ${campo} no puede venir vacío`)
  }
  if(!regexDate.test(date)){
    console.log(regexDate.test(date));
    throw new Error(`El campo ${campo} tiene un formato inválido`)
  }
}
const validateState = (state) => {
  const regexState = /^[0|1]+$/

  if (state === null || state === undefined) {
    throw new Error('El estado del ticket es obligatorio')
  } else if (!regexState.test(state)) {
    throw new Error('El estado  del ticket no es correcto')
  }
}
const isTicketOpen=async(message,model,searchField,targetField,findActiveState,excludeArr)=>{
  try {
      const  ticket =  await model.findOne({
          where:{
              [targetField]:searchField,
              state:1
          }
      })
      if (ticket) {
          throw new Error(message)
      }
  } catch (error) {
      throw new Error(error)
  }
}
const objectOwner=(idToken,employeeToken,message)=>{
  if (idToken!= employeeToken) {
    throw new Error(message)
  }
}
const compareDates=(openning_date,closing_date)=>{
  const diferenciaEnMilisegundos = closing_date - openning_date;
  // Convierte la diferencia en días dividiendo por la cantidad de milisegundos en un día
  const diasDiferencia = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
  if ( diasDiferencia<0 ||diasDiferencia<8) {
      throw new Error(`Hay menos de 8 días de diferencia entre la fecha ${openning_date} y ${closign_date}` )
  }
  
}
module.exports ={
    validateName,
    validateLastName,
    validateDpi,
    validatePersonalPhone,
    validationPath,
    bodyVerification,
    validationEmail,
    validationPassword,
    validationDepartament,
    validatePosition,
    validateSupervisor,
    userExist,
    tokenValidation,
    validationOfIdenticatedlId,
    paramsValidation,
    validatePage,
    allowAcction,
    validationParagraph,
    validationDates,
    validateState,
    isTicketOpen,
    objectOwner,
    compareDates
}