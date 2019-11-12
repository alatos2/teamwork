import moment from 'moment';
import utils from '../helpers/commons';

const users = [
  {
    first_name: 'Tosin',
    last_name: 'Abiodun',
    email: 'alabitosin58@gmail.com',
    password: utils.hashPassword('1234'),
    gender: 'male',
    job_role: 'God knows',
    department: 'Lorem',
    address: '50, Lorem street, Lagos',
    is_admin: true,
    created_at: moment().format(),
  },
  {
    first_name: 'Scot',
    last_name: 'James',
    email: 'scot@gmail.com',
    password: utils.hashPassword('1234'),
    gender: 'male',
    job_role: 'God knows',
    department: 'Lorem',
    address: '50, Lorem street, Lagos',
    is_admin: true,
    created_at: moment().format(),
  },
];

export default users;
