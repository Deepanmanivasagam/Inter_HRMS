const {addEmployee,
      getAllEmployee,
      getSingleId,
      updateEmployee,
      deleteEmployee
      } = require('../controllers/employeeController');
const { createRole,getRoles, getRoleById, updateRole, deleteRole } = require('../controllers/roleController');
const express = require('express');
const router = express.Router();
const verifiedToken = require('../middleware/authmiddleware');
const {addDepartment, getDept, getsingleDept, updateDepartment, deleteId} = require('../controllers/departmentController');
const { createDesignation,getallId,getsingleId, updateDesign, deleteDesign } = require('../controllers/designationController');
const {addProject,getProject,updateProject,deleteProject} = require('../controllers/projectmodelController');

// Employee routes

router.post('/addemployee',verifiedToken,addEmployee);
router.post('/getall',verifiedToken,getAllEmployee);
router.post('/getsingle',verifiedToken,getSingleId);
router.post('/updateemployee/:id',verifiedToken,updateEmployee);
router.post('/deleteemployee',verifiedToken,deleteEmployee);

// Role routes

router.post('/addrole',verifiedToken,createRole);
router.post('/getallrole',verifiedToken,getRoles);
router.post('/getsinglerole',verifiedToken,getRoleById);
router.post('/updaterole/:id',verifiedToken,updateRole);
router.post('/deleterole',verifiedToken,deleteRole);

// Department routes

router.post('/addept',verifiedToken,addDepartment);
router.post('/getdept',verifiedToken,getDept);
router.post('/getdeptId',verifiedToken,getsingleDept);
router.post('/updateId/:id',verifiedToken,updateDepartment);
router.post('/deletedept',verifiedToken,deleteId);

// Designation

router.post('/addDesign',verifiedToken,createDesignation);
router.post('/getallDesign',verifiedToken,getallId);
router.post('/getsingleDesign',verifiedToken,getsingleId,);
router.post('/updateDesign/:id',verifiedToken,updateDesign);
router.post('/deleteDesing',verifiedToken,deleteDesign);

// Project

router.post('/addproject',verifiedToken,addProject);
router.post('/getproject/:id',verifiedToken,getProject);
router.post('/updateproject/:id',verifiedToken,updateProject);
router.post('/deleteproject',verifiedToken,deleteProject)

module.exports = router;