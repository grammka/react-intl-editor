import { createActions } from 'redbox'
import actions from 'actions'
import store from 'core/store'


export default createActions(actions, store.dispatch)
