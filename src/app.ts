import * as prompts from 'prompts'
import { validateCommand, initFamilyTree } from './lib/utils'
import * as commands from './lib/constants/commands'
import * as messages from './lib/constants/messages'

const familyTree = initFamilyTree()
;(async () => {
  let isQuit = false

  while (isQuit === false) {
    const response = await prompts({
      type: 'list',
      name: 'command',
      message:
        'Please enter your command with parameters. \nValid commands are:\n*ADD_CHILD "Mother\'s-Name" "Child\'s-Name"\n*GET_RELATIONSHIP "Name" "Relationship"\n*QUIT.\n',
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
        try {
          const params = response.command.slice(1)
          familyTree.addChild(params[0], params[1], params[2])
          process.stdout.write(`\n${messages.CHILD_ADDED}\n`)
        } catch (error) {
          console.error(error)
        }
        break

      case commands.GET_RELATIONSHIP:
        try {
          const params = response.command.slice(1)
          const relatives = familyTree.getRelationship(params[0], params[1])
          const names = relatives.map((member) => member.name)
          if (names.length === 0) {
            process.stdout.write(`\n${messages.NONE}\n`)
          } else {
            process.stdout.write(`\n${names.join(' ')}\n`)
          }
        } catch (error) {
          console.error(error)
        }
        break

      case commands.QUIT:
        isQuit = true
        break

      default:
        console.error(messages.INVALID_COMMAND)
    }
  }
})()
