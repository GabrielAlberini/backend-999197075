import { z } from "zod"

const chairSchemaValidator = z.object({
  name: z.string().min(3),
  material: z.string().min(3),
  color: z.string().min(3),
  price: z.number().positive(),
})

export { chairSchemaValidator }