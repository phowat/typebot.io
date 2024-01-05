import { option } from '@typebot.io/forge'
import { defaultCortexOptions } from './constants'

export const baseOptions = option.object({
  baseUrl: option.string.layout({
    accordion: 'Customize provider',
    label: 'Base URL',
    defaultValue: defaultCortexOptions.baseUrl,
  }),
})
