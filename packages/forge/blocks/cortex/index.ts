import { createBlock } from '@typebot.io/forge'
import { CortexLogo } from './logo'
import { auth } from './auth'
import { baseOptions } from './baseOptions'
import { askQuestion } from './actions/askQuestion'

export const cortex = createBlock({
  id: 'cortex',
  name: 'Cortex',
  tags: [],
  LightLogo: CortexLogo,
  auth,
  options: baseOptions,
  actions: [askQuestion],
})
