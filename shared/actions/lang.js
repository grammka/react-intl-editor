import { createAction } from 'redbox'
import { services } from 'config'


export const get = createAction({
  endpoint: ({ locale }) => `http://localhost:8080/translations/${locale}.json`,
  method: 'GET',
})

export const save = createAction({
  endpoint: ({ locale }) => `http://localhost:3000/save`,
  method: 'POST',
})


export const initialState = {
  messages: null
}

export const setMessages = createAction((state, payload) => ({ ...state, messages: payload }))
