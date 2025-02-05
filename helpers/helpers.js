// Generación de tokens
const jwt = require('jsonwebtoken');
const {Sequelize}=require('sequelize')
const nodemailer = require('nodemailer');

const jwtGenerate =(id,user_type,secret,expiresTime)=>{
    return new Promise((resolve,reject)=>{
        const payload ={id,user_type}
        jwt.sign(payload,secret,{
            expiresIn:24 * 60 * 60
        },(err,token)=>{
            if (err) {
                reject("no se pudo generar el token")
            }else{
                resolve(token)
            }
        })
    })
}
// HASEANDO LA CONTRASEÑA 
const bcrypt = require('bcrypt');
const hashingPassword = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}
const updateData = async(model,objectToEdit,searchField, targetField)=>{
    try {
        const update = await model.update(objectToEdit,{
            where:{
                [targetField]:searchField
            }
        });      
        if (update>0) {
            return 'Se han actualizado los datos '
        }else{
            throw new Error('No se han podido actualizar los datos')
        }
    } catch (error) {
        throw new Error(error)
    }
 
}
const findData=async(model, searchField, targetField, excludeArr)=>{
    try {
        const foundData= await model.findOne({
            where:{
                [targetField]:searchField
            },
            attributes:{
                exclude:excludeArr
            }
        })
        if (!foundData) {
           return null
        }else{
            return foundData.dataValues
        }
    } catch (error) {
        throw new Error(error);
    }
}

const { startOfMonth, endOfMonth , format , toDate,differenceInHours ,differenceInMinutes,getDay , isValid} = require('date-fns');
const {fromZonedTime } = require('date-fns-tz');
function getStartAndEndOfMonth(dateString) {
    const date = new Date(dateString);
    let dayOfDate = date.getDate();  // Cambiado de getUTCDate a getDate
    const yearOfDate = date.getFullYear();
    const monthOfDate = date.getMonth();
    if (dayOfDate === 1) {
        dayOfDate = dayOfDate + 1;
    }
    const newDate = new Date(`${yearOfDate}-${monthOfDate +1 }-${dayOfDate}`);
    
    return {
        start_month: format(startOfMonth(newDate), 'yyyy-MM-dd'),
        end_month: format(endOfMonth(newDate), 'yyyy-MM-dd'),
    };
}
const calculatorNumberOfMinutesBetweenTwoHours = (initial_hour, final_hour) => {
   
     // Crear fechas basadas en el tiempo (en UTC para evitar problemas de zonas horarias)
    const baseDate = '1970-01-01'; // Día base para las fechas
    const initial_date = new Date(`${baseDate}T${initial_hour}`); // UTC
    const final_date = new Date(`${baseDate}T${final_hour}`); // UTC

  // Calcular la diferencia en minutos
  return differenceInMinutes(final_date, initial_date);
};
const hourAdder =(start_reserv_time,end_reserv_time)=>{
    
    const [start_hour, start_minutes] = start_reserv_time.split(':').map(Number);
    const [end_hour, end_minutes] = end_reserv_time.split(':').map(Number);

    const inicioMS = (start_hour * 60 + start_minutes) * 60 * 1000;
    const finMS = (end_hour * 60 + end_minutes) * 60 * 1000;
    const hourDifference = (finMS  - inicioMS)/3600000;
    return hourDifference
    
}

const formatHour=(hora)=> {
    const spliHourArr = hora.split(':')
    if (spliHourArr[0]==='24') {
        return `24:${spliHourArr[1]}`
    }else{
        const dateObj = new Date(`1970-01-01 ${hora}`);
        const opciones = { hour: 'numeric', minute: 'numeric' };
        return dateObj.toLocaleTimeString('es-ES', opciones);
    }
}

const changeObjectNames =(originalObject,objectPropertiesForChange)=>{
    return Object.keys(originalObject).reduce((newObject, originalProperty) => {
        const newPopertyName= objectPropertiesForChange[originalProperty]
        newObject[newPopertyName]=originalObject[originalProperty]
        return newObject
    }, {});
}

const cookieOptions = {
    httpOnly: true, // Solo accesible desde el servidor
    //secure: false, // Solo en conexiones HTTPS
    // sameSite: 'strict', // Restringir a solicitudes del mismo sitio
    maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida en milisegundos (1 día)
    // agregar la propiedad  domain: para aceptar solo de determinados dominios o subdominios
    // agrgar la propiedad path para restringir la cookie solo a las rutas deseadas 
};
const getDataValuesOnly= (array)=>{
    let newArr=[]
    array.forEach(element => {
        let newElement = element.get()
        newArr.push(newElement)
    });
    return newArr
}
const crypto = require('crypto')
const fs = require('fs');
const generateHashForFile = (fileForCreateHash)=>{
    try {
      
        const content = fs.readFileSync(fileForCreateHash, 'utf-8');
        const hash = crypto.createHash('sha256').update(content).digest('base64');

        return `sha256-${hash}`;
    } catch (error) {
        throw new Error(error)
    }
}
const jqueryHash = ()=>{
    const jqueryFile = 'public/js/jquery-3.6.3.min.js'
    const jqueryHash =  generateHashForFile(jqueryFile);
    return jqueryHash
}
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173', 'http://localhost:5173'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,
    maxAge: 600, // 10 minutos
  };


const centralAmericaTimezone = 'America/Guatemala'; // Puedes cambiar esta zona horaria por la que necesites en Centroamérica
const getCurrentDateAndTime = (dateTimeFormat) => {
    // formatos 
    // yyyy-MM-dd KK:mm obtener fecha y hora con formato 24hrs
    // yyyy-MM-dd obtenr solo fecha 
    const now = new Date();
    const utcDate = toDate(now);
    // Ajustar la fecha por un día antes de aplicar la zona horaria
    const adjustedUtcDate = new Date(utcDate.getTime() - (24 * 60 * 60 * 1000));
    const centralAmericaDate = fromZonedTime(adjustedUtcDate, centralAmericaTimezone);
    const formattedDateTime = format(centralAmericaDate, dateTimeFormat, { timeZone: centralAmericaTimezone });
    return formattedDateTime;
};
const sendEmail  =(token,typeEmailContent,receptorEmail)=>{

}
const chooseContentForEmail =(emailContent)=>{
    const contents={
        'update-email':(token)=>{
            return`
                <html>
                <head>
                  <title>Confirmación de cambio de correo electrónico</title>
                </head>
                <body>
                  <h2>Confirmación de cambio de correo electrónico</h2>
                  <p>Se ha solicitado un cambio de correo electrónico. Por favor, confirma el cambio haciendo clic en el siguiente botón:</p>
                  <a href="http://localhost:8080/confirm/change/email/?token=${token}">Entra aqui paraa confirmar el cambio de correo</a>
                </body>
                </html>
              `;
        }

    }
}

const saveSession = (req) => {
    return new Promise((resolve, reject) => {
        req.session.save((err) => {
            if (err) {
                console.error('Error al guardar la sesión:', err);
                reject(new Error('Error al guardar la sesión'));
            } else {
                
                
                resolve();
            }
        });
    });
};

const getDayWithDate= (date)=>{
    const centralAmericaDate = toDate(date, { timeZone: centralAmericaTimezone });  
      const weekDays = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
      const day = getDay(date)
      return `${weekDays[day]}, ${format(centralAmericaDate, 'dd-MM-yyyy', { timeZone: centralAmericaTimezone })}`
}

const formatPrice = (price)=>{
    if (price===0) {
        return new Intl.NumberFormat('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }).format(price);       
    }else if (price>0){
        return price.toFixed(2)
    }
    return null
    
}
module.exports={
    jwtGenerate,
    hashingPassword,
    updateData,
    findData,
    getStartAndEndOfMonth,
    calculatorNumberOfMinutesBetweenTwoHours,
    hourAdder,
    formatHour,
    changeObjectNames,
    cookieOptions,
    getDataValuesOnly,
    generateHashForFile,
    jqueryHash,
    corsOptions,
    getCurrentDateAndTime,
    saveSession,
    getDayWithDate,
    formatPrice
}