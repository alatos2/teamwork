import UserModel from '../models/users';

export default class UserService {
  static signup(userData) {
    let {
      firstName, lastName, email, password, gender, jobRole, department, address, isAdmin,
    } = userData;
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    gender = gender.trim();
    jobRole = jobRole.trim();
    department = department.trim();
    address = address.trim();
    isAdmin = isAdmin.trim();
    const userValues = [firstName, lastName, email, password, gender, jobRole, department, address, isAdmin];
    UserModel.signup(userValues);
  }
}