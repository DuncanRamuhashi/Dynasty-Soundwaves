import { STATUS_CODES } from '../constants/constants.js';
export const rolesAuth = (...allowedRoles) => {
    return (req, res, next) => {
      const role = req.body.role; // Get role from request body
  
      console.log("User Role from Body:", role);
      console.log("Allowed Roles:", allowedRoles);
  
      if (role === !allowedRoles.includes(role)) {
        return res.status(STATUS_CODES.FORBIDDEN).json({ success: false, message: "Access Denied" });
      }
  
      next();
    };
  };
  