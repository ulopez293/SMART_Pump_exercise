import { z } from "zod"

export const UserSchema = z.object({
        _id: z.string().trim().nonempty("_id field is empty"),
        guid: z.string().trim().nonempty("guid field is empty"),
        isActive: z.boolean().optional(),
        balance: z.string().trim().nonempty("balance field is empty").optional(),
        picture: z.string().trim().nonempty("picture field is empty").url().optional(),
        age: z.number().optional(),
        eyeColor: z.string().trim().nonempty("eyeColor field is empty").optional(),
        name: z.object({
          first: z.string().trim().nonempty("fisrt name field is empty").optional(),
          last: z.string().trim().nonempty("last name field is empty").optional(),
        }),
        company: z.string().trim().nonempty("company field is empty").optional(),
        email: z.string().trim().nonempty("email field is empty").email(),
        password: z.string().trim().nonempty("password field is empty"),
        phone: z.string().trim().nonempty("phone field is empty").optional(),
        address: z.string().trim().nonempty("address field is empty").optional()
}).strict()

export const UsersArraySchema = z.array(UserSchema)

export type UserType = z.infer<typeof UserSchema>