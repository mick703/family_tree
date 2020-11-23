import { initFamilyTree, validateCommand } from '../../src/lib/utils'
import { Gender, Member } from '../../src/models/member'
import * as messages from '../../src/lib/constants/messages'
import * as relationships from '../../src/lib/constants/relationships'

test('initFamilyTree loads the family tree', () => {
  expect(() => initFamilyTree()).not.toThrow()
})

test('initFamilyTree loads family members properly', () => {
  const familyTree = initFamilyTree()

  const existingMember = familyTree.searchMember(
    familyTree.rootMember,
    'Remus'
  ) as Member
  expect(existingMember).toBeInstanceOf(Member)
  expect(existingMember.name).toBe('Remus')
})

test('validateCommand returns true for QUIT command', () => {
  expect(validateCommand(['QUIT'])).toBe(true)
})

test(`validateCommand returns message ${messages.INVALID_ARGUMENTS} if command with arguments are less than 3`, () => {
  expect(validateCommand(['INVALID_CMD', 'foo'])).toBe(
    messages.INVALID_ARGUMENTS
  )
})

test(`validateCommnend returns ${messages.INVALID_COMMAND} if command is not ADD_CHILD or GET_RELATIONSHIP`, () => {
  expect(validateCommand(['INVALID_CMD', 'Margret', 'Tim', Gender.Male])).toBe(
    messages.INVALID_COMMAND
  )
})

test(`validatCommand returns ${messages.INVALID_ARGUMENTS} if ADD_CHILD does not have 3 arguments`, () => {
  expect(validateCommand(['ADD_CHILD', 'foo'])).toBe(messages.INVALID_ARGUMENTS)
})
test(`validatCommand returns ${messages.INVALID_ARGUMENTS} if GET_RELATIONSHIP does not have 2 arguments`, () => {
  expect(validateCommand(['GET_RELATIONSHIP', 'foo'])).toBe(
    messages.INVALID_ARGUMENTS
  )
})

test('validateCommand returns true for ADD_CHILD with correct arguments', () => {
  expect(validateCommand(['ADD_CHILD', 'Flora', 'Jim', Gender.Male])).toBe(true)
})
test('validateCommand returns true for GET_RELATIONSHIP with correct arguments', () => {
  expect(
    validateCommand(['GET_RELATIONSHIP', 'Flora', relationships.SON])
  ).toBe(true)
})
