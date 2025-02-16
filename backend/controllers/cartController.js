import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import transporter from '../config/nodemailer.js';