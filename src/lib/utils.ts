import * as messages from './constants/messages'
import * as commands from './constants/commands'
import { Member, Gender } from '../models/member'
import { FamilyTree } from '../models/family-tree'

export const validateCommand = (cmdWithArgs: string[]) => {
  if (cmdWithArgs.length < 3) {
    return messages.INVALID_ARGUMENTS
  }

  const validCommandNames = [commands.ADD_CHILD, commands.GET_RELATIONSHIP]
  const commandName = cmdWithArgs.slice(0, 1)[0]
  const args = cmdWithArgs.slice(1)
  if (validCommandNames.includes(commandName) === false) {
    return messages.INVALID_COMMAND
  }

  if (
    (commandName === commands.ADD_CHILD && args.length !== 3) ||
    (commandName === commands.GET_RELATIONSHIP && args.length !== 2)
  ) {
    return messages.INVALID_ARGUMENTS
  }

  return true
}

export const initFamilyTree = (): FamilyTree => {
  const rootMember = new Member('Arthur', Gender.Male)
  rootMember.addSpouse(new Member('Margret', Gender.Female))
  const familyTree = new FamilyTree(rootMember)

  //  Add all the children nodes
  // Level 1
  familyTree.addChild('Margret', 'Bill', Gender.Male)
  familyTree.addSpouse('Bill', 'Flora', Gender.Female)

  familyTree.addChild('Margret', 'Charlie', Gender.Male)

  familyTree.addChild('Margret', 'Percy', Gender.Male)
  familyTree.addSpouse('Percy', 'Audrey', Gender.Female)

  familyTree.addChild('Margret', 'Ronald', Gender.Male)
  familyTree.addSpouse('Ronald', 'Helen', Gender.Female)

  familyTree.addChild('Margret', 'Ginerva', Gender.Female)
  familyTree.addSpouse('Ginerva', 'Harry', Gender.Male)

  //Level2
  familyTree.addChild('Flora', 'Victoire', Gender.Female)
  familyTree.addSpouse('Victoire', 'Ted', Gender.Male)

  familyTree.addChild('Flora', 'Dominique', Gender.Female)

  familyTree.addChild('Flora', 'Louis', Gender.Male)

  familyTree.addChild('Audrey', 'Molly', Gender.Female)
  familyTree.addChild('Audrey', 'Lucy', Gender.Female)

  familyTree.addChild('Helen', 'Rose', Gender.Female)
  familyTree.addSpouse('Rose', 'Malfoy', Gender.Male)

  familyTree.addChild('Helen', 'Hugo', Gender.Male)

  familyTree.addChild('Ginerva', 'James', Gender.Male)
  familyTree.addSpouse('James', 'Darcy', Gender.Female)

  familyTree.addChild('Ginerva', 'Albus', Gender.Male)
  familyTree.addSpouse('Albus', 'Alice', Gender.Female)

  familyTree.addChild('Ginerva', 'Lily', Gender.Female)

  //Level 3
  familyTree.addChild('Victoire', 'Remus', Gender.Male)

  familyTree.addChild('Rose', 'Draco', Gender.Male)
  familyTree.addChild('Rose', 'Aster', Gender.Female)

  familyTree.addChild('Darcy', 'William', Gender.Male)

  familyTree.addChild('Alice', 'Ron', Gender.Male)
  familyTree.addChild('Alice', 'Ginny', Gender.Female)

  return familyTree
}
