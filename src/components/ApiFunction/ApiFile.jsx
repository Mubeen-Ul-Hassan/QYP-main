// ApiFile.js

const ApiFile = {
  // check phone numer
  phoneCheck: "api/users/check-phone",
  // check email
  emailCheck: "api/users/check-email",
  // sent otp
  sendOTP: "api/users/send-code",
  // otp varification
  verifyOTP: "api/users/verify-otp/registration",
  // signUp
  signUp: "api/users/signup/user",
  // update use
  updateUser: "api/users/update-user",
  // login api
  Login: "api/auth",

  forgetEmail: "api/users/forget-password",
  forgetOTP: "api/users/verify-otp/forget-password",
  updatePassword: "api/users/update-password",
  // forget pass

  // Product get

  productGet: "api/product/user",

  projectGet: "api/project/user",
  projectGetbyID: "api/project/byId",

  // blog get
  blogGet: "api/blog/user",
  blogGetById: "api/blog/byId",
  // get product by id

  productGetbyId: "api/product/byId",
  orderCreate: "api/order/create",
  // check all all products

  productsCheck: "api/order/check/product",
  userOrder: "api/order/user",

  categoryGet: "api/category/user",
  categoryProduct: "api/product/user",

  // services api start
  serviceGet: "api/service/user",

  // complete project

  completeProjectGet: "api/project/complete/user",

  // strip api
  stripApi: "api/stripe/create",
  // support api start
  contactAPi: "api/support/create",

  // education api start
  createCourceApply: "api/courseApply/create",

  // upload images and file api start
  imageUpload: "api/image/upload",
  docUpload: "api/doc/upload",
};

export default ApiFile;
