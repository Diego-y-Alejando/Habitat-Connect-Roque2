/*
    Falda documentar y terminar los enpoints para la cuenta del usuario
    falta documentar y terminar el endpoint para finalizar la relación 
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - phone_number
 *         - dpi
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user | resident | security | admin name
 *         lastname:
 *           type: string
 *           description: The user | resident | security | admin lastname
 *         email:
 *           type: string
 *           description: The user | resident | security | admin email
 *         phone_number:
 *           type: string
 *           description: The user | resident | security | admin phone number
 *         dpi:
 *           type: string
 *           description: The user | resident | security | admin dpi
 *         password:
 *           type: string
 *           description: The user | resident | security | admin password account
 *       example:
 *         name: Jose David
 *         lastname: Arriaga Garcia
 *         email: jose@gmail.com
 *         phone_number: "0000-0000"
 *         dpi: "0000-00000-0000"
 *         password: "mypassword"
 *
 * 
 *     getUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user | resident | security | admin name
 *         lastname:
 *           type: string
 *           description: The user | resident | security | admin lastname
 *         email:
 *           type: string
 *           description: The user | resident | security | admin email
 *         phone_number:
 *           type: string
 *           description: The user | resident | security | admin phone number
 *         dpi:
 *           type: string
 *           description: The user | resident | security | admin dpi
 *       example:
 *         name: Jose David
 *         lastname: Arriaga Garcia
 *         email: jose@gmail.com
 *         phone_number: "0000-0000"
 *         dpi: "0000-00000-0000"
 *
 * 
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: error description
 *         ok:
 *           type: boolean
 *           description: Indicates that the request was wrong
 *     
 * 
 *     Token:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id of user 
 *         user_type :
 *           type: string
 *           description: Values resident | admin| security
 *       required:
 *           -id
 *           -user_type
 *     
 *     succesfullyAction:
 *       type: object
 *       properties:
 *         msg:
 *           type: string
 *           description: action description 
 *         ok:
 *           type: boolean
 *           description: Indicates that the request was succesfully
 *         
 * 
 *     Employee:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of employe
 *         lastname:
 *           type: string
 *           description: Lastname of employee
 *         dpi:
 *           type: string
 *           description: identification of employee
 *         phone_number:
 *           type: string
 *           description: phone number of employee
 *         occupation_list:
 *           type: list
 *           description: contains all professions of employee
 *       required:
 *           - name
 *           - lastname
 *           - dpi
 *           - phone_number
 *           - occupation_list
 *       example:
 *         name: "Jose Alejandro"
 *         lastname: Figueroa Noguera 
 *         dpi: 0000-00000-0000 
 *         phone_number: 0000-0000 
 *         occupation_list: ['Carpintero','Electricista'] 
 * 
 * 
 *     EmployeesOfResident:
 *       type: object
 *       properties:
 *         totalPage:
 *           type: integer
 *           description: Total pages in the employee list
 *         count:
 *           type: integer
 *           description: Total records
 *         currentPage:
 *           type: integer
 *           description: current page
 *         employeeList:
 *           type: list 
 *           description: All employees data 
 *       example:
 *         totalPages: 2
 *         count: 20
 *         currentPage: 1
 *         employeeList: [
 *                      {
 *                          maid_id: 1,
 *                          name: "Jose Javier",
 *                          phone_number: 0000-0000,
 *                          occupation_list : ['Carpintero','Electricista']
 *                      }
 *         ]
 * 
 * 
 *     EmployeeDetail:
 *       type: object
 *       properties:
 *          maid_id:
 *           type: integer
 *           description: Id of employee
 *          name:
 *           type: string
 *           description: Name of employe
 *          lastname:
 *           type: string
 *           description: Lastname of employee
 *          dpi:
 *           type: string
 *           description: identification of employee
 *          phone_number:
 *           type: string
 *           description: phone number of employee
 *          occupation_list:
 *           type: list
 *           description: contains all professions of employee
 *       example:
 *         maid_id: 1
 *         name: "Jose Alejandro"
 *         lastname: "Figueroa Noguera "
 *         dpi: 0000-00000-0000 
 *         phone_number: 0000-0000 
 *         occupation_list: ['Carpintero','Electricista']           
 *               
 *                
 *     createRelationship:
 *       type: object
 *       properties: 
 *          boss_number_1:
 *           type: string
 *           description: phone number of employee boss   
 *          boss_number_2:
 *           type: string 
 *           description: phone number of employee boss
 *       required:
 *          - boss_number_1
 *       example:
 *          boss_number_1: 0000-0000  
 *          boss_number_2: 0000-0000
 *     
 *       
 *     relationshipDetails:
 *       type: object
 *       properties: 
 *          boss_number_1:
 *           type: string
 *           description: phone number of employee boss   
 *          boss_number_2:
 *           type: string 
 *           description: phone number of employee boss
 *          relationship_id:
 *           type: string 
 *           description: id of relationship
 *       example:
 *          boss_number_1: 0000-0000  
 *          boss_number_2: 0000-0000
 *          relationship_id: 1 
 * 
 *     relationshipSchedule:
 *       type: object
 *       properties:
 *          relationship_id:
 *           type: string 
 *           description: id of relationship
 *          days_list:
 *           type: list
 *           description: List of days the employee will atentted
 *          month_list:
 *           type: list
 *           description: List of months the employee will atentted
 *       required:
 *          - relationship_id
 *          - days_list
 *          - month_list
 *       example:
 *          relationship_id : 1
 *          days_list : [1,2,3,4,5,6,7]
 *          month_list : [1,2,3,4,5,6,7,8,9,10,11,12]
 * 
 *     scheduleDetails:
 *       type: object
 *       properties:
 *          days_list:
 *           type: list
 *           description: List of days the employee will atentted
 *          month_list:
 *           type: list
 *           description: List of months the employee will atentted
 *       example:
 *          days_list : [1,2,3,4,5,6,7]
 *          month_list : [1,2,3,4,5,6,7,8,9,10,11,12]
 *      
 *     createHomeVisit:
 *       type: object
 *       properties:
 *          resident_name:
 *             type: string
 *             description: name of resident 
 *          visitors_name:
 *             type: string
 *             description: visitors name
 *          dpi:
 *             type:  string
 *             description: visitors dpi
 *          visit_date:
 *             type: date
 *             description: home visit date
 *       required:  
 *          - resident_name
 *          - visitors_name
 *          - dpi
 *          - visit_date
 *       example:
 *          resident_name : Rodrigo Mendoza
 *          visitors_name : Jouse Ayala
 *          dpi: 0000-00000-0000
 *          visit_date : 2024-06-31
 *         
 *     homeVisitDetails:
 *       type: object
 *       properties:
 *          home_visit_id:
 *             type: integer
 *             description: id of home visit 
 *          resident_name:
 *             type: string
 *             description: name of resident 
 *          visitors_name:
 *             type: string
 *             description: visitors name
 *          dpi:
 *             type:  string
 *             description: visitors dpi
 *          visit_date:
 *             type: date
 *             description: home visit date
 *       example:
 *          home_visit_id: 1
 *          resident_name : Rodrigo Mendoza
 *          visitors_name : Jouse Ayala
 *          dpi: 0000-00000-0000
 *          visit_date : 2024-06-31
 *      
 *    
 *     residentsHomeVisits:
 *       type: object
 *       properties:
 *         totalPage:
 *           type: integer
 *           description: Total pages in the employee list
 *         count:
 *           type: integer
 *           description: Total records
 *         currentPage:
 *           type: integer
 *           description: current page
 *         allRows:
 *           type: list 
 *           description: All home visits data 
 *       example:
 *         totalPages: 2
 *         count: 20
 *         currentPage: 1
 *         allRows: [
 *                      {
 *                          home_visit_id: 1,
 *                          visitors_name: "Jose Javier",
 *                          home_visit_state: 0|1,
 *                          dpi : 0000-00000-0000
 *                      }
 *         ]
 * 
 * 
 *     packageDeliveryCreated :
 *       type: object
 *       properties: 
 *          resident_name:
 *              type: string
 *              description: residents name for delivery
 *          company_name:
 *              type: string
 *              description: Name of the company delivering the package
 *          delivery_date: 
 *              type: date
 *              description: Date of delivering package
 *       required:
 *          - resident_name
 *          - company_name
 *          - delivery_date
 *       example:
 *          resident_name: Katherine Natalia
 *          company_name: siman
 *          delivery_date: 20204-06-31
 * 
 * 
 *     packageDeliveryDetails:
 *       type: object
 *       properties: 
 *          package_delivery_id:
 *              type: string
 *              description: id of package delivery 
 *          resident_name:
 *              type: string
 *              description: residents name for delivery
 *          company_name:
 *              type: string
 *              description: Name of the company delivering the package
 *          delivery_date: 
 *              type: date
 *              description: Date of delivering package
 *       example:
 *          resident_name: Katherine Natalia
 *          company_name: siman
 *          delivery_date: 20204-06-31
 *     
 *     
 *     
 * 
 *     bookingAmenity:
 *      type: object
 *      properties:
 *          reservation_date:
 *              type: date
 *              description: date of booking
 *          start_reserv_time:
 *              type: time
 *              description: booking start time 
 *          end_reserv_time:
 *              type: time
 *              description: booking end time
 *          renter_name:
 *              type: string
 *              description : name of renter 
 *          renter_phone :
 *              type: string
 *              description: renter phone
 *          id_amenity_reserved:
 *              type: integer 
 *              description: id of amenity for booking
 *      required:
 *          - reservation_date
 *          - start_reserv_time 
 *          - end_reserv_time
 *          - renter_name
 *          - renter_phone
 *          - id_amenity_reserved
 *      example:
 *            reservation_date: 2024-06-31
 *            start_reserv_time: 13:00
 *            end_reserv_time: 18:00
 *            renter_name : Bryan Jouse
 *            renter_phone: 0000-0000
 *            id_amenity_reserved: 1
 * 
 *     bookingDetails:
 *      type: object
 *      properties: 
 *          renter_name:
 *              type: string
 *              description : name of renter 
 *          renter_phone:
 *              type: string
 *              description: renter phone
 *          id_amenity_reserved:
 *              type: integer
 *              description: id of amenity for amenity detail
 *      example:
 *          renter_name : Bryan Jouse
 *          renter_phone: 0000-0000
 * 
 *     bookingCreated:
 *      type: object 
 *      properties:
 *          reservation_id:
 *              type: integer
 *              description: id of booking
 *          reservation_date:
 *              type: date
 *              description: date of booking
 *          start_reserv_time:
 *              type: time
 *              description: booking start time 
 *          end_reserv_time:
 *              type: time
 *              description: booking end time
 *          renter_name:
 *              type: string
 *              description : name of renter 
 *          renter_phone:
 *              type: string
 *              description: renter phone
 *          id_amenity_reserved:
 *              type: integer 
 *              description: id of amenity for booking
 *          
 * 
 *     bookingList:
 *      type: object 
 *      properties:
 *          totalPages:
 *              type: integer
 *              description: total pages of total reservations
 *          count:
 *              type: integer
 *              description: total reservations
 *          currentPage:
 *              type: integer
 *              description: current page   
 *          booking_list:
 *              type: list
 *              description: all booking 
 *      example:
 *          totalPages: 2
 *          count: 20
 *          currentPage: 1
 *          booking_list: [
 *                {
 *                  reservation_id: 1,
 *                  reservation_date: 2024-06-31,
 *                  start_reserv_time: 13:00,
 *                  end_reserv_tim: 18:00,
 *                  total_hours: 5 ,
 *                  booking_price: 200.00,
 *                  amenity_name: Piscina 
 *               }
 *          ]
 *  
 *           
 *     events:
 *       type: object
 *       properties:
 *          id:
 *            type: integer
 *            description: id of reserv
 *          date:
 *            type: date
 *            description: date of reserv
 *          start:
 *            type: time
 *            description: start_time of reserv
 *          end:   
 *            type: time
 *            description: en_time of reserv
 *       example:
 *          id: 1
 *          date: 2024-01-31
 *          start: 13:00
 *          end: 18:00
 *    
 * 
 *     amenityDetail:
 *       type: object
 *       properties:
 *          rent_cost:
 *            type: integer
 *            description: booking cost 
 *          start_time:
 *             type: time
 *             description: start amenity time 
 *          end_time:
 *             type: time
 *             description: start amenity time 
 *          free_hours:
 *             type: integer    
 *             description : allow free hours
 *          additional_cosst_per_hour:
 *             type: integer
 *             description: additional cost per hour
 *          time_limit:
 *             type: integer 
 *             description: time limit of booking
 *          is_disabled:
 *              type: integer
 *       example:
 *          rent_cost: 200.00
 *          start_time: 05:00
 *          end_time: 23:00
 *          free_hours: 3
 *          additional_cost_per_hour: 50.00
 *          time_limit: 8
 *          is_disabled: 1 || 0
 * 
 *     amenities:
 *       type: object
 *       properties:
 *          ok:
 *             type:boolean
 *          amenities:  
 *             type: list
 *             description: contains all amenities
 *       example:
 *          ok: true
 *          amenities: [
 *                {
 *                  amenity_id: 1,
 *                  rent_cost: 200.00,
 *                  start_time: 05:00,
 *                  end_time: 23:00,
 *                  free_hours: 3,
 *                  additional_cost_per_hour: 50.00,
 *                  time_limit: 8,
 *                  is_disabled: 1 || 0,
 *                }
 *          ]
 *                 
 * 
 *          
 *          
 * /residente/perfil:
 *   get:
 *     summary: Get user data 
 *     tags: [User]
 *     description: Resident ID isn't required because resident_id comes from token authentication.
 *     responses:
 *       '200':
 *         description: Return user data
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/getUser'   
 *       '404':
 *         description: User Not Found  
 *         content:
 *           'application/json':
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * /residente/update/my/user/data/:
 *   post:
 *     summary: Update user data
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: this endpoint returns the changed data and object
 *         content:
 *           'application/json':
 *              schema: 
 *                 $ref: '#/components/schemas/succesfullyAction'
 *       '404':
 *         description: invalid Id or type of data
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * 
 * residente/create/employee:
 *   post:
 *     summary: create employee for residente 
 *     tags: [Residents employee]
 *     requestBody:
 *       description: All fields of the schema  are required
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'  
 *     responses:
 *       '200':
 *         description: returns employee data created
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/EmployeeDetail' 
 *       '404':
 *         description: the request have invalid properties or some property have invalid value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * residente/get/residents/employees:
 *  get:
 *     summary: This endpoint get all employes of all resident
 *     parameters:
 *       - name: page
 *         description: page of all employees list
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Residents employee]
 *     responses:
 *       '200':
 *         description: List of all residents employees
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/EmployeesOfResident' 
 *       '404':
 *         description: the page have invalid value 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *    
 * 
 * /residente/get/employe/detail/:
 *  get:
 *     summary: This endpoint get employee detail
 *     parameters:
 *       - name: maid_id
 *         description: Id of employee
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Residents employee]
 *     responses:
 *       '200':
 *         description: data of employee
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/EmployeeDetail' 
 *       '404':
 *         description: maid_id invalid or empty 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 *  /resident/get/my/employees/:
 *   get: 
 *     summary: This enpoint get resident employees
 *     tags: [Residents employee]
 *     description: Resident ID isn't required because resident_id comes from token authentication.
 *     responses:
 *       '200':
 *         description: List of all residents employees
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/EmployeesOfResident' 
 *       '404':
 *         description: the page have invalid value 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * 
 * /create/relationship/:
 *  post: 
 *     summary : This endpoint allows a resident to create a relationship with an employee
 *     parameters:
 *       - name: maid_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Relationship employee resident]
 *     requestBody:
 *       description: Resident ID isn't required because resident_id comes from token authentication.
 *       required: true
 *       content:
 *         application/json:
 *             $ref: '#/components/schemas/createRelationship'
 *     responses:
 *       '200':
 *         description: relationship was created
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/relationshipDetails'   
 *       '404': 
 *         description: Employee doesnt exist || resident doesnt exist || id of employee have invalid value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * 
 * /relationship/details/:
 *  get:
 *     summary: This enpoint get details of relationship (boss_phone_number_1 , boss_phone_number_2) 
 *     description: Resident ID isn't required because resident_id comes from token authentication.
 *     parameters:
 *       - name: maid_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Relationship employee resident]
 *     responses:
 *       '200':
 *         description: returns data of relationship if relationship exist 
 *         content:
 *           'application/json':
 *             $ref: '#/components/schemas/relationshipDetails'   
 *       '404': 
 *         description: Employee doesnt exist || resident doesnt exist || id of employee have invalid value || relationship doesnt exist
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * /update/relationship/info/:
 *  post: 
 *     summary: This endpoint allows users to update details of the relationship using a maid_id and resident_id from token authentication
 *     tags: [Relationship employee resident]
 *     parameters:
 *       - name: maid_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: false
 *       description: allow empty value for boss_number_2 if data didnt change this endpoint goin to returns 404 error
 *       content:
 *         application/json:
 *             $ref: '#/components/schemas/createRelationship'
 *     responses:
 *       '200':
 *         description: this enpoint return changed data
 *         content: 
 *          'application/json':
 *             schema:
 *               $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of relationship have invalid value || relationship doesnt exist || relationship data didnt change
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * 
 * /end/relationship:
 *  delete:
 *     summary: this enpoint allows to user end relationship with employee 
 *     tags: [Relationship employee resident]
 *     parameters:
 *       - name: relationship_id
 *         in: params
 *         required: true
 *         schema:
 *           type: integer 
 *     responses:
 *       '200':
 *         description: this enpoint returns an message with information
 *         content: 
 *          'application/json':
 *             schema:
 *               $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of relationship have invalid value || relationship doesnt exist || relationship data didnt change
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * /create/schedule/for/relationship/:
 *  post:
 *    summary: This enpoint allows users to create schedule for his employe
 *    tags: [Employe schedule]
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             $ref: '#/components/schemas/relationshipSchedule'
 *    responses:
 *       '200':
 *         description: returns a message and schedule  data 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/scheduleDetails'  
 *       '404': 
 *         description: id of relationship have invalid value || relationship doesnt exist || invalid propeties || invalid values of property
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * /relationship/schedule/:
 *   get:
 *    summary: This endpoints returs schedule of employee 
 *    tags: [Employe schedule]
 *    parameters:
 *      - name: relationship_id
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses:
 *       '200':
 *         description: returns info of schedule
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/scheduleDetails' 
 *       '404': 
 *         description: id of relationship have invalid value || relationship doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * /update/schedule/:
 *   post:
 *    summary: This endpoint allows the user to update an employee's schedule
 *    tags: [Employe schedule]
 *    requestBody:
 *       description: You may send days list , month list or both  of schedule data for update
 *       content: 
 *         'application/json':
 *           schema:
 *              $ref: '#/components/schemas/scheduleDetails'
 *    parameters:
 *      - name: relationship_id
 *        in: path
 *        required: true
 *        schema:
 *           type: integer
 *    responses:
 *       '200':
 *         description: this enpoint return changed data
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of relationship have invalid value || relationship doesnt exist || some property have invalid value 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /create/home-visit:
 *   post: 
 *    summary: This enpoint allows the user create home visit
 *    tags: [Home visits] 
 *    requestBody:
 *       description: Resident ID isn't required because resident_id comes from token authentication.
 *       required: true
 *       content:
 *         application/json:
 *             $ref: '#/components/schemas/createHomeVisit'
 *    responses:
 *       '200':
 *         description: returns home-visit created
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/homeVisitDetails' 
 *       '404': 
 *         description: body have invalid properties || body property have invaludvalue
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   
 * /get/home-visit/:
 *  get:
 *    summary: This enpoint returs home visit detail
 *    tags: [Home visits] 
 *    parameters:
 *      - name: visit_id
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses:
 *       '200':
 *         description: returns info of home visit
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/homeVisitDetails' 
 *       '404': 
 *         description: id of home visit have invalid value || home visit doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *        
 * 
 * /update/home-visit/:
 *  post:
 *    summary: This enpoint allows the user update home visit data
 *    tags: [Home visits] 
 *    parameters:
 *      - name: visit_id
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    requestBody:
 *       description: you may send parts of home visit data for update or all data
 *       content: 
 *         'application/json':
 *           schema:
 *             $ref: '#/components/schemas/homeVisitDetails'
 *    responses:
 *       '200':
 *         description: returns changed data
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of home visit have invalid value || home visit doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * /cancel/home-visit/:
 *  post:
 *    summary: This enpoint allows the user cancel home visit 
 *    tags: [Home visits] 
 *    parameters:
 *      - name: visit_id
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses:
 *       '200':
 *         description: Returns a message to indicate the successful cancellation of a home visit
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of home visit have invalid value || home visit doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * /undo/cancel/home-visit/:
 *  post:
 *    summary: This enpoint allows the user undoing cancel home visit 
 *    tags: [Home visits] 
 *    parameters:
 *      - name: visit_id
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses:
 *       '200':
 *         description: Returns a message to indicate the successful undoing of a home visit
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of home visit have invalid value || home visit doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * /get/list/home-visit:
 *  get:
 *    summary: This enpoint returns all home visits of user
 *    tags: [Home visits]
 *    parameters:
 *      - name: page
 *        in: query
 *        required: true
 *        schema:
 *           type: integer
 *        description: its for pagination  
 *        example:
 *          page: 1
 *      - name: searchData
 *        in: query
 *        required: false
 *        schema:
 *           type: string 
 *        description : its for search by resident_name or visitors_name
 *      - name: dateForSearch
 *        in: query
 *        required: false
 *        schema:
 *           type: date
 *        example:
 *           dateForSearch: 2024-06-31  
 *      - name: upCommingVisits
 *        in: query
 *        required: false
 *        schema:
 *           type: integer
 *        description: 1 for current day home visits and 2 for upcomming home visits
 *        example:
 *           upCommingVisits: 1 | 2
 *    responses:
 *       '200':
 *         description: returns  a list of home visits for resident
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/residentsHomeVisits' 
 *       '404': 
 *         description: id of home visit have invalid value || home visit doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *        
 * 
 * /create/package-delivery:
 *  post:
 *    summary: This enpoint returns all home visits of user
 *    tags: [Package delivery]
 *    requestBody:
 *       description: 
 *       required: true
 *       content:
 *         application/json:
 *             $ref: '#/components/schemas/packageDeliveryCreated'
 *    responses: 
 *       '200':
 *         description: returns data of package delivery created 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/packageDeliveryDetails' 
 *       '404': 
 *         description: body have invalid properties || some property of body have invalid value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'    
 *    
 * 
 * /get/package-delivery/:
 *  get:
 *    tags: [Package delivery]
 *    summary: This enpoint  get package delivery data
 *    parameters:
 *      - name: visit_id 
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses: 
 *       '200':
 *         description: returns details of package delivery  
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/packageDeliveryDetails' 
 *       '404': 
 *         description: package delivery doesnt exist || id of package delivery have invalid value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'    
 * 
 *        
 * 
 * /update/package-delivery/:
 *  post: 
 *    tags: [Package delivery]
 *    summary: this enpoint allows to user update package delivery data
 *    parameters:
 *      - name: visit_id 
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    requestBody:
 *       description:  you may send parts of package delivery data for update or send all data
 *       content:
 *         'application/json':
 *             schema:
 *                 $ref: '#/components/schemas/packageDeliveryCreated'  
 *    responses: 
 *       '200':
 *         description: returns changed data 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/packageDeliveryDetails' 
 *       '404': 
 *         description: package delivery doesnt exist || id of package delivery have invalid value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'    
 *    
 * 
 * /cancel/package-delivery/:
 *  post:    
 *    summary: this enpoint allows to users cancel package delivery 
 *    tags: [Package delivery]
 *    parameters:
 *      - name: visit_id 
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses: 
 *       '200':
 *         description: Returns a message to indicate the successful cancellation of a package delivery
 *         content:
 *           'application/json':
 *             schema:
 *              $ref: '#/components/schemas/succesfullyAction'
 *       '404': 
 *         description: package delivery doesnt exist || id of package delivery have invalid value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error'    
 *    
 * /undo/cancel/package-delivery/:
 *  post:
 *    summary: this enpoint allows to users undoing  cancel package delivery 
 *    tags: [Package delivery]
 *    parameters:
 *      - name: visit_id 
 *        in: path
 *        required: true
 *        schema:
 *           type: integer 
 *    responses:
 *       '200':
 *         description: Returns a message to indicate the successful undoing of a package delivery
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: id of package delvery have invalid value || package delivery  doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * /get/list/package-delivery:
 *  get:
 *    summary: this enpoint gets all packagedeliveries
 *    tags: [Package delivery]
 *    parameters:
 *      - name: page
 *        in: query
 *        required: true
 *        schema:
 *           type: integer
 *        description: its for pagination  
 *        example:
 *          page: 1
 *      - name: searchData
 *        in: query
 *        required: false
 *        schema:
 *           type: string 
 *        description : its for search by resident_name or company name
 *      - name: dateForSearch
 *        in: query
 *        required: false
 *        schema:
 *           type: date
 *        description: this field its for send date if resident want upcomming packages 
 *        example:
 *           dateForSearch: 2024-06-31  
 *      - name: upCommingVisits
 *        in: query
 *        required: false
 *        schema:
 *           type: integer
 *        description: 1 for current day  package delivery and 2 for upcomming package
 *        example:
 *           upCommingVisits: 1 | 2
 *      - name: packages_recieved
 *        in: query
 *        required: false
 *        schema:
 *           type: integer
 *        description: 1 for unrecieved packaged delivery and 2 for recieved package
 *        example:
 *           packages_recieved: 1 | 2
 * 
 * 
 * /booking/amenity/:
 *  post: 
 *    summary: This enpoint is for booking amenity
 *    tags: [Reservations]   
 *    requestBody:
 *       content:
 *         'application/json':
 *             schema:
 *                 $ref: '#/components/schemas/bookingAmenity'
 *    responses:
 *       '200':
 *         description: Returns booking created data
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/bookingCreated' 
 *       '404': 
 *         description: body have invalid properties || some property of body have invalud value
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *    
 *   
 * /get/my/booking/:
 *  get:
 *    summary: This enpoint gets reservation info 
 *    tags: [Reservations]
 *    parameters:
 *      - name: reserv_id
 *        in: params
 *        required: true
 *        schema:
 *           type: integer  
 *        example:
 *          reserv_id: 1
 *    responses:
 *       '200':
 *         description: Returns the renter's name and phone number as the remaining information has already been retrieved
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/bookingDetails' 
 *       '404': 
 *         description: reserv id have invalid value || reserv id doesnt exist
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 * 
 * 
 * /get/my/booking/list:
 *  get:
 *    summary: This enpoint returns all bookings of resident 
 *    tags: [Reservations] 
 *    parameters:
 *      - name: page
 *        in: query
 *        required: true
 *        schema:
 *           type: integer
 *        description: its for pagination  
 *        example:
 *          page: 1
 *    responses:
 *       '200':
 *         description: Returns array with all bokings 
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/bookingList' 
 *       '404': 
 *         description: page have invalid value 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 * 
 *      
 * 
 * /update/my/booking/:
 *  post:
 *    summary: This enpoint allows to user update booking 
 *    tags: [Reservations]
 *    requestBody:
 *       description: The only required field in this endpoint is reserv_id because we need it for searching reservations.
 *       content:
 *         'application/json':
 *             schema:
 *                 $ref: '#/components/schemas/bookingAmenity'
 *    responses:
 *       '200':
 *         description: This enpoint will return changed data and object with other information
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: body have invalid properties || some property of body have invalud value|| reserv doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *     
 * 
 * 
 * /cancel/my/booking/:
 *  post:
 *    summary: This enpoint is for booking cancellation    
 *    tags: [Reservations]
 *    parameters:
 *      - name: reserv_id
 *        in: params
 *        required: true
 *        schema:
 *           type: integer  
 *        example:
 *          reserv_id: 1
 *    responses:
 *       '200':
 *         description: This enpoint will return a object with information of update
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/succesfullyAction' 
 *       '404': 
 *         description: reserv_id have invalid value || reserv doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *     
 * 
 * 
 * 
 * 
 * /events/:
 *  get:
 *    summary: This enpoint its for get events of amenity
 *    tags: [Reservations]
 *    parameters:
 *      - name: amenity_id
 *        in: query
 *        required: true
 *        schema:
 *           type: integer  
 *        example:
 *          amenity_id: 1
 *      - name: date
 *        in: query
 *        require: true
 *        schema:
 *           type: integer  
 *        example:
 *          date: 2024-01-31
 *    responses:
 *       '200':
 *         description: this enpoint will response with events of amenity 
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/events' 
 *       '404': 
 *         description: reserv_id have invalid value || reserv doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *    
 * 
 * 
 * /amenities/:
 *  get:
 *    summary: This enpoints gets all amenities
 *    tags: [Amenities]
 *    responses:
 *       '200':
 *         description: this enpoint will response with all amenities 
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/amenities' 
 *       '404': 
 *         description: reserv_id have invalid value || reserv doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *    
 * /amenity/detail:
 *  get:
 *    summary: this enpoint gets amenitiy detail
 *    tags: [Amenities]
 *    parameters:
 *      - name: amenity_id
 *        in: query
 *        required: true
 *        schema:
 *           type: integer  
 *        example:
 *          amenity_id: 1
 *    responses:
 *       '200':
 *         description: this enpoint will response with  amenity info
 *         content:
 *          'application/json':
 *              schema:
 *                $ref: '#/components/schemas/amenityDetail' 
 *       '404': 
 *         description: reserv_id have invalid value || reserv doesnt exist 
 *         content:
 *           'application/json':
 *             schema:
 *               $ref: '#/components/schemas/Error' 
 *     
 * 
 * 
 * 
 * 
 * 
*/     

/* 





*/


