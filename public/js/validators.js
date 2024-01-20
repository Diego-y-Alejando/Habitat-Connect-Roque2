
const validateName = (name ,size) => {
  const regexName = /^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]+$/;
    if (!name) {
      throw new Error('El nombre es obligatorio')
    } else if (!regexName.test(name)) {
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
  
const validatePhoneNumber = (phone) => {
    const regexPhone= /^\d{4}-\d{4}$/
    console.log(phone);
    if (!phone) {
      throw new Error('El numero de teléfono  es obligatorio')
    } else if (!regexPhone.test(phone)) {
      throw new Error('El numero de  teléfono  debe tener el siguiente formato: XXXX-XXXX')
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
  if (!object || typeof object !== 'object' || !Object.keys(object).length) {
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



const validationOfIdenticatedlId=(idToken,idUser)=>{
  if (idToken!=idUser) {
    throw new Error('Conflicto de Idtoken con idUser');
  }
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
    throw new Error(`El campo ${campo} tiene un formato inválido`)
  }
}
const validationOcupationState = (state) => {
  const regexState = /^[0|1]+$/

  if (state === null || state === undefined) {
    throw new Error('El estado de ocupacion es obligatorio')
  } else if (!regexState.test(state)) {
    throw new Error('El estado  de ocupacion no es correcto')
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
const compareHours =(start_time,end_time,flag,message)=>{
    const [start_hour, start_minutes] = start_time.split(':').map(Number);
    const [end_hour, end_minutes] = end_time.split(':').map(Number);

    const inicioMS = (start_hour * 60 + start_minutes) * 60 * 1000;
    const finMS = (end_hour * 60 + end_minutes) * 60 * 1000;

    const diferenciaHoras = (finMS - inicioMS)/3600000;
    if (diferenciaHoras<0) {
        throw new Error('Asegúrate de que la hora de inicio sea anterior a la hora de finalización')
    }
    if (flag) {
      if (diferenciaHoras<10) {
        throw new Error(message)
      }
    }if (!flag) {
      if (diferenciaHoras>6) {
        throw new Error(message);
      }
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
    throw new Error('La paginacion es invalida')
  }
}
export {
    validateName,
    validateLastName,
    validateDpi,
    validatePhoneNumber,
    validationPath,
    bodyVerification,
    validationEmail,
    validationPassword,
    validationDepartament,
    validationOfIdenticatedlId,
    ValidationIdOrLevel,
    allowAcction,
    validationParagraph,
    validationDates,
    validationOcupationState,
    isTicketOpen,
    objectOwner,
    compareDates,
    validationYear,
    validationCost,
    validationHour,
    compareHours,
    ValidationPaidStatus,
    validationMonth,
    validatePage
    
}