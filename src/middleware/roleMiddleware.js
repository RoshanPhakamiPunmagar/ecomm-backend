// Only admin allowed
export const isAdmin = (req, res, next) => {
  if (req.userInfo?.role === "admin") {
    return next();
  }

  return next({
    status: 403,
    message: "Admin access only",
  });
};

// Only customer allowed
export const isCustomer = (req, res, next) => {
  if (req.userInfo?.role === "customer") {
    return next();
  }

  return next({
    status: 403,
    message: "Customer access only",
  });
};

// Allow multiple roles
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.userInfo?.role)) {
      return next();
    }

    return next({
      status: 403,
      message: "Access denied",
    });
  };
};
