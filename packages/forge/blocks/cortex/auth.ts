import { option, AuthDefinition } from '@typebot.io/forge'

export const auth = {
  type: 'encryptedCredentials',
  name: 'Cortex account',
  schema: option.object({
    apiKey: option.string.layout({
      label: 'API key',
      isRequired: true,
      withVariableButton: false,
      helperText: 'Contact instant solutions for a key.',
    }),
    accountId: option.string.layout({
      label: 'Account ID',
      isRequired: true,
      helperText: 'Account ID.',
    }),
    userId: option.string.layout({
      label: 'User ID',
      isRequired: true,
      helperText: 'User ID.',
    }),
    knowledgeBase: option.string.layout({
      label: 'Knowledge Base',
      isRequired: true,
      helperText: 'Knowledge Base',
    }),
  }),
} satisfies AuthDefinition
