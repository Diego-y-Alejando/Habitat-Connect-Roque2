// regex utilizado para nombres de laboratorios, nombres y apellidos por eso permite números
const regex=/^[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9 ]+/
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
    console.log(phone);
    if (!phone) {
      throw new Error('El numero de teléfono  es obligatorio')
    } else if (!regexPhone.test(phone)) {
      throw new Error('El numero de  teléfono  debe tener el siguiente formato: (XXX)XXXX-XXXX')
    }else if(phone.trim().length>14){
      throw new Error('El numero de  teléfono se exede de 14 caracteres revisa que este correcto ')
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






const validationID=(id,description)=>{
  const regexNumber =/^[0-9]+$/;
  if (!id===null || id ===0 ) {
      throw new Error(`El id de ${description} no puede venir vacío `)
  }
  else if(!regexNumber.test(id)){
      throw new Error(`El id de ${description} contiene caracteres  no validos o viene vacío`);
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

const validationParagraph =(paragaph)=>{
  const regexParagraph=/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9 ,.]+/
  if (!regexParagraph.test(paragaph)) {
    throw new Error('Debes ingresar una descripcion obligatoriamente o ingresaste  un caracter no válido  solo se permiten comas , números y puntos ')
  }
}
const validationDates=(date)=>{
  const regexDate = /^(\d{4})-(0[1-9]|1[012])-(0[1-9]|[1-2]\d|3[0-1])/
  
  if(!regexDate.test(date)){
    throw new Error(`El campo que es una fecha  tiene un formato inválido o viene vacío`)
  }
}
const validateState = (state) => {
  const regexState = /^[01]$/
  if (!state) {
    throw new Error('El estado del ticket es obligatorio')
  } else if (!regexState.test(state)) {
    throw new Error('El estado  del ticket no es correcto')
  }
}

const validateAdress=(adress)=>{
  const regexAdress =/^[a-zA-Z0-9 -]+$/
  if (!adress) {
      throw new Error('La direccion no debe venir vacia')
  }if(!regexAdress.test(adress)){
      throw new Error('La direccion no es válida')
  }
}

export{
    validateName,
    validateLastName,
    validateDpi,
    validatePersonalPhone,
    bodyVerification,
    validationEmail,
    validationPassword,
    validationID,
    validatePage,
    validationParagraph,
    validationDates,
    validateState,
    validateAdress,
}