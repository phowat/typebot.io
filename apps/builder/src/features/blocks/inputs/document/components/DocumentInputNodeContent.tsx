import React from 'react'
import { Text } from '@chakra-ui/react'
import { DocumentInputBlock } from '@typebot.io/schemas'
import { WithVariableContent } from '@/features/graph/components/nodes/block/WithVariableContent'
import { defaultDocumentInputOptions } from '@typebot.io/schemas/features/blocks/inputs/document/constants'

type Props = {
  options: DocumentInputBlock['options']
}

export const DocumentInputNodeContent = ({
  options: { variableId, labels } = {},
}: Props) =>
  variableId ? (
    <WithVariableContent variableId={variableId} />
  ) : (
    <Text color={'gray.500'}>
      {labels?.placeholder ?? defaultDocumentInputOptions.labels.placeholder}
    </Text>
  )
