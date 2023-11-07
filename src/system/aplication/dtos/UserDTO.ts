export interface UserCreatorDTO{
  img: String,
  username: String,
  password: String
}

export interface UserUpdaterDTO{
  id: String,
  img: String,
  username: String,
  password: String
}

export interface UserDeleteDTO{
  id: String,
  username: String,
  password: String
}

export interface UserLoginDTO{
  username: String,
  password: String
}

export interface UserPresenterDTO{
  img: String,
  username: String
}