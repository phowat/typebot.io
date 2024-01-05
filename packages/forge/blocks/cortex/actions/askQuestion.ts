import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'

export const askQuestion = createAction({
  auth,
  name: 'Ask question',
  baseOptions,
  options: option.object({
    question: option.string.layout({
      isRequired: true,
      label: 'Question',
      inputType: 'textarea',
      placeholder: 'What is the meaning of life?',
    }),
    responseMapping: option.saveResponseArray(['Answer'] as const).layout({
      accordion: 'Save response',
    }),
  }),
  getSetVariableIds: ({ responseMapping }) =>
    responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
  run: {
    server: async ({
      credentials,
      options: { question, responseMapping, baseUrl },
      variables,
    }) => {
      const { apiKey, accountId, userId, knowledgeBase } = credentials

      const payload = {
        knowledge_base_id: knowledgeBase,
        user_id: userId,
        question: question,
        accountcode_id: accountId,
      }
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
      console.log('DELETEME: Gotaa url ', JSON.stringify(payload))
      console.log(`${baseUrl}/ai/questions/`)
      const response = await fetch(`${baseUrl}/ai/questions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      })
      console.log('DELETEME: RESponse status ?? ', response.status)
      let answer = 'An error ocurred.'
      if (response.status < 300 && response.status >= 200) {
        const res = await response.json()
        answer = res.response.answer
        console.log('DELETEME: RES ', res)
        console.log('DELETEME: RES.answer ', res.answer)
      }

      responseMapping?.forEach((r) => {
        if (!r.variableId) return
        if (!r.item || r.item === 'Answer') {
          variables.set(r.variableId, answer)
        }
      })
    },
  },
  // output: option.string.layout({
  //   label: 'Answer',
  //   helperText: '42.',
  // }),
})
