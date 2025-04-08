const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    if (process.env.NODE_ENV === 'development') {
      console.error(err); 
    }
  
    res.status(statusCode).json({
      code: statusCode,
      success: false,
      error: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  export default errorHandler;
  