/* 
* EXAMPLE

import { z } from 'zod'

const userSchema = z.object({
  username: z.string({ required_error: 'username field is required' }),
  first_name: z.string({ required_error: 'first_name field is required' }),
  last_name: z.string({ required_error: 'last_name field is required' }),
  email: z.string({ required_error: 'email field is required' }).email(),
  password: z.string({ required_error: 'password field is required' }).min(6),
  confirm_password: z.string({ required_error: 'confirm password is required' }).min(6)
})

export const userValidation = (data: UserData) => {
  return userSchema.refine(data => data.password === data.confirm_password, {
    message: "passwords  don't match"
  }).safeParse(data)
} */
