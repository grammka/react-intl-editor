import React from 'react'
import actions from 'core/actions'
import { connect } from 'react-redux'
import { Flex, Box } from 'reflexbox'
import ValueLink from 'valuelink'

import CSSModules from 'react-css-modules'
import style from './style'

import Indent from 'components/Indent'
import Input from 'components/Input'
import Button from '@wombocompo/button'

const locales = [ 'en', 'ru' ]


@connect((state) => ({
  messages: state.lang.messages
}))
@CSSModules(style)
export default class Home extends React.Component {
  constructor(props) {
    super()

    this.changedMessages = {}

    this.state = {
      messages: null
    }
  }

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

    this.initMessages = { ...messages }

    this.setState({
      messages
    })
  }


  addDirty = ({ id, locale, message }) => {
    if (!this.changedMessages[id]) {
      this.changedMessages[id] = {}
    }

    this.changedMessages[id][locale] = { newMessage: message }
  }

  save = () => {
    for (const id in this.changedMessages) {
      for (const locale in this.changedMessages[id]) {
        this.changedMessages[id][locale].message = this.initMessages[id].locales[locale].message
      }
    }

    const result = {}

    for (const id in this.changedMessages) {
      for (const locale in this.changedMessages[id]) {
        if (!result[locale]) {
          result[locale] = {}
        }

        result[locale][id] = this.changedMessages[id][locale]
      }
    }

    actions.lang.save({
      body: {
        messages: result
      },
      onResponse: ({ body }) => {
        console.log(4444, body)
      }
    })
  }


  render() {
    const { messages } = this.state


    return messages && (
      <div>
        <div styleName="content">
          <table styleName="table">
            <thead>
            <tr>
              <th width="1%">ID</th>
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
                    <td styleName="idContainer">
                      <div styleName="hiddenId">{messageId}</div>
                      <div styleName="ellipsis">{'...'}</div>
                    </td>
                    {
                      Object.keys(locales).map((locale) => {
                        const messageLink = ValueLink.state(this, 'messages').at(messageId).at('locales').at(locale).at('message')

                        return (
                          <td key={locale}>
                            <Input
                              styleName="textarea"
                              type="text"
                              multiline
                              valueLink={ messageLink }
                              onBlur={() => this.addDirty({ id: messageId, locale, message: messageLink.value })}
                            />
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
            </tbody>
          </table>
        </div>
        <div styleName="footer">
          <Flex justify="flex-end" align="center">
            <Box>
              <Button success h={37} onClick={this.save}>{'Save'}</Button>
            </Box>
          </Flex>
        </div>
      </div>
    )
  }
}
