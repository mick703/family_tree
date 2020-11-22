import { initFamilyTree } from '../../src/lib/utils'
import { Member } from '../../src/models/member'

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
