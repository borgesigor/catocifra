import User from "../../core/entity/User"

export interface UserCreatorDTO{
  img: String,
  username: String,
  password: String
}

export interface UserLoginDTO{
  username: String,
  password: String,
}

interface VerificationUpdate{
  id: String,
  token: String,
}

interface DataUpdate{
  img?: String,
  username?: String,
  password?: String,
  isAdmin?: Boolean,
}

export interface UserUpdaterDTO{
  verification: VerificationUpdate,
  data: DataUpdate
}

export interface UserDeleteDTO{
  id: String,
  token: String,
}

export interface UserPresenterDTO{
  id: String,
  username?: String,
  img?: String,
  createdAt?: String
  isAdmin?: Boolean,
}