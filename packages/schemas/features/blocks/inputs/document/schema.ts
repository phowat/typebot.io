import { z } from '../../../../zod'
import { optionBaseSchema, blockBaseSchema } from '../../shared'
import { InputBlockType } from '../constants'
import { textInputOptionsBaseSchema } from '../text'

export const documentInputOptionsSchema = optionBaseSchema
  .merge(textInputOptionsBaseSchema)
  .merge(
    z.object({
      retryMessageContent: z.string().optional(),
      documentType: z.enum(['cpf', 'cnpj']).optional(),
    })
  )
export const documentInputSchema = blockBaseSchema
  .merge(
    z.object({
      type: z.enum([InputBlockType.DOCUMENT]),
      options: documentInputOptionsSchema.optional(),
    })
  )
  .openapi({
    title: 'Document',
    ref: 'document',
  })
export type DocumentInputBlock = z.infer<typeof documentInputSchema>
