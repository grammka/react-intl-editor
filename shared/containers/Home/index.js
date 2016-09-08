import React from 'react'
import actions from 'core/actions'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import style from './style'

import Indent from 'components/Indent'

const locales = [ 'en', 'ru' ]


@connect((state) => ({
  messages: state.lang.messages
}))
@CSSModules(style)
export default class Home extends React.Component {
  async componentWillMount() {
    let result = await Promise.all(
      locales.map((locale) => new Promise((fulfill) => {
        actions.lang.get({
          params: {
            locale
          },
          onResponse: ({ body }) => fulfill({ [locale]: body })
        })
      }))
    )

    result = result.reduce((res, curr) => ({ ...res, ...curr }), {})

    const messages = {}

    for (const locale in result) {
      const langMessages = result[locale]

      langMessages.forEach(({ id, defaultMessage, message }) => {
        if (!messages[id]) {
          messages[id] = {
            defaultMessage: '',
            locales: {}
          }
        }

        if (defaultMessage) {
          messages[id].defaultMessage = defaultMessage
        }

        messages[id].locales[locale] = { message: message || defaultMessage }
      })
    }

    actions.lang.setMessages(messages)
  }


  render() {
    const { messages } = this.props


    return messages && (
      <Indent p={30}>
        <table styleName="table">
          <thead>
            <tr>
              <th>ID</th>
              {
                locales.map((locale) => (
                  <th key={locale}>{locale}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(messages).map((messageId) => {
                const { defaultMessage, locales } = messages[messageId]

                return (
                  <tr key={messageId}>
                    <td>{messageId}</td>
                    {
                      Object.keys(locales).map((locale) => {
                        const { message } = locales[locale]

                        return (
                          <td key={locale}>{message}</td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Indent>
    )
  }
}
