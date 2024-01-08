import { defaultButtonLabel } from '../constants'
import { DocumentInputBlock } from './schema'

export const defaultDocumentInputOptions = {
  labels: {
    button: defaultButtonLabel,
    placeholder: 'Type the document number ...',
  },
  retryMessageContent: "This doesn't seem to be valid. Can you type it again?",
  documentType: 'cpf',
} as const satisfies DocumentInputBlock['options']
