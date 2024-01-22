const { subjectEmailVerification, bodyEmailVerification } = require("../utils/constantGenerics");
const { authAdmin } = require("../services/firebase-admin-service");
const { authService } = require("../services/auth.service");
const { sendEmail, setCookie } = require("../utils/utils");
const { ApiResponse } = require("../utils/responses");
const path = require("path");

require("dotenv").config({ path: path.join(process.cwd(), ".env") });

const signUp = async (req, res) => {
  try {
    const userInfo = req.body;

    const userInfoResponse = await authService.signUp(userInfo);

    await sendEmail(email, subjectEmailVerification, bodyEmailVerification(userInfoResponse));

    return ApiResponse.OK(res);
  } catch (err) {
    return ApiResponse.InternalServerError(res, err);
  }
};

const signIn = async (req, res) => {
  const userInfo = req.body;

  if (userInfo.email == null || userInfo.password == null)
    return ApiResponse.BadRequest(res,"Algunos campos estan vacios");
  
  try {
    const userCredential = await authService.signIn(userInfo);
    setCookie(res, 'user-uid', userCredential.uid);
    
    return ApiResponse.OK(res, userCredential);
  }catch(error) {
    return ApiResponse.BadRequest(res, "Email o Contraseña incorrecta");
  }
};

const logOut = async (req, res) => {
  try{
    await authService.logOut();

    return ApiResponse.Ok(res);
  }catch(err){
    return ApiResponse.InternalServerError(res);
  }  
};

const verifyAuth = async (token) => {
  if(authService.isAuthenticated(token)){
    const user = await authAdmin.verifyIdToken(token);
    return user;
  }

  return "Usuario no autenticado"
};

const isAuth = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await verifyAuth(uid);
    
    return ApiResponse.OK(res, user);
  } catch (err) {
    return ApiResponse.InternalServerError(res, err);
  }
};

module.exports = { signIn, signUp, logOut, isAuth };
