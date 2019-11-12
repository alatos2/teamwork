/**
 * @name addUser
 * @description - adds a new employee
 * @param {object} data
 * @returns the object query
 */

// eslint-disable-next-line import/prefer-default-export
export const addUser = (data) => ({
  text: `INSERT INTO users (
    first_name,
    last_name,
    email,
    password,
    gender,
    job_role,
    department,
    address,
    is_admin,
    created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
  values: [data.first_name, data.last_name, data.email, data.password, data.gender, data.job_role,
    data.department, data.address, data.type, data.is_admin, data.created_at],
});
