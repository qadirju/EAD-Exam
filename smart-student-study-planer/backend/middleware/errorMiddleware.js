const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    })
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate field value entered' })
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error'
  })
}

export default errorMiddleware
