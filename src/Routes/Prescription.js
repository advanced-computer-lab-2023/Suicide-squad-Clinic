const express = require('express');
const doctorSchema = require('../Models/Doctor.js');
const patientSchema = require('../Models/Patient.js');
const appointmentSchema = require('../Models/Appointment.js');
const prescriptionSchema = require('../Models/Prescription.js');
const HealthPackage = require("../Models/HealthPackage");
const mongoose = require('mongoose');
// controller functions

const registerPrescription = require('../Controllers/prescriptionController')
const router = express.Router();

router.post('/registerPrescription', registerPrescription)

module.exports = router