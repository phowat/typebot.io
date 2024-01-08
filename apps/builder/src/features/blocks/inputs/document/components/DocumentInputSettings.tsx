import { TextInput } from '@/components/inputs'
import { VariableSearchInput } from '@/components/inputs/VariableSearchInput'
import { FormLabel, Stack } from '@chakra-ui/react'
import { useTranslate } from '@tolgee/react'
import { DocumentInputBlock, Variable } from '@typebot.io/schemas'
import { defaultDocumentInputOptions } from '@typebot.io/schemas/features/blocks/inputs/document/constants'
import { Select } from '@chakra-ui/react'
import React from 'react'
import { z } from 'zod'

type Props = {
  options: DocumentInputBlock['options']
  onOptionsChange: (options: DocumentInputBlock['options']) => void
}

export const DocumentInputSettings = ({ options, onOptionsChange }: Props) => {
  const { t } = useTranslate()
  const handlePlaceholderChange = (placeholder: string) =>
    onOptionsChange({ ...options, labels: { ...options?.labels, placeholder } })
  const handleButtonLabelChange = (button: string) =>
    onOptionsChange({ ...options, labels: { ...options?.labels, button } })
  const handleVariableChange = (variable?: Variable) =>
    onOptionsChange({ ...options, variableId: variable?.id })
  const handleRetryMessageChange = (retryMessageContent: string) =>
    onOptionsChange({ ...options, retryMessageContent })

  return (
    <Stack spacing={4}>
      <Select
        placeholder={t('blocks.inputs.settings.documentType.placeholder')}
        value={
          options?.documentType ?? defaultDocumentInputOptions.documentType
        }
        onChange={(documentType) => {
          const dt = z.enum(['cpf', 'cnpj'])
          onOptionsChange({
            ...options,
            documentType: dt.parse(documentType.target.value),
          })
        }}
      >
        <option value="cpf">CPF</option>
        <option value="cnpj">CNPJ</option>
      </Select>
      <TextInput
        label={t('blocks.inputs.settings.placeholder.label')}
        defaultValue={
          options?.labels?.placeholder ??
          defaultDocumentInputOptions.labels.placeholder
        }
        onChange={handlePlaceholderChange}
      />
      <TextInput
        label={t('blocks.inputs.settings.button.label')}
        defaultValue={
          options?.labels?.button ?? defaultDocumentInputOptions.labels.button
        }
        onChange={handleButtonLabelChange}
      />
      <TextInput
        label={t('blocks.inputs.settings.retryMessage.label')}
        defaultValue={
          options?.retryMessageContent ??
          defaultDocumentInputOptions.retryMessageContent
        }
        onChange={handleRetryMessageChange}
      />
      <Stack>
        <FormLabel mb="0" htmlFor="variable">
          {t('blocks.inputs.settings.saveAnswer.label')}
        </FormLabel>
        <VariableSearchInput
          initialVariableId={options?.variableId}
          onSelectVariable={handleVariableChange}
        />
      </Stack>
    </Stack>
  )
}
