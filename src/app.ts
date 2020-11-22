import * as prompts from 'prompts'
import { validateCommand, initFamilyTree } from './lib/utils'
import * as commands from './lib/constants/commands'
import * as messages from './lib/constants/messages'
import { exit } from 'process'

const familyTree = initFamilyTree()
;(async () => {
  const response = await prompts({
    type: 'list',
    name: 'command',
    message:
      'Please enter your command with parameters. Valid commands are: ADD_CHILD, GET_RELATIONSHIP.',
    initial: '',
    separator: ' ',
    validate: (value) => {
      const cmdWithArgs = value.split(' ')

      return validateCommand(cmdWithArgs)
    },
  })
  const [command] = response.command

  switch (command) {
    case commands.ADD_CHILD:
      const params = response.command.slice(1)
      try {
        familyTree.addChild(params[0], params[1], params[2])
        console.log(messages.CHILD_ADDED)
      } catch (error) {
        console.error(error)
      }
      break

    case commands.GET_RELATIONSHIP:
    default:
      console.error(messages.INVALID_COMMAND)
      exit()
  }
})()
