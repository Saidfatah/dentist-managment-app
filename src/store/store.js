import {init} from '@rematch/core'
import clients from './models/clients'
import appointments from './models/appointments'
import register from './models/register'
import auth from './models/auth'

const models={
  auth,
  clients,
  appointments,
  register
}

const store=init({
    models,
})


export default store 