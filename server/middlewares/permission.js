/**
   * Check if user is a staff
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next express next object
   *
   * @returns {json} json
   */
// eslint-disable-next-line import/prefer-default-export
export const isAdmin = (req, res, next) => {
  const { isAdmin } = req.decode;
  if (isAdmin) {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      error: 'Forbidden: Access is denied',
    });
  }
};
