import { Gender, Member } from '../../src/models/member'

let member: Member
beforeEach(() => {
  member = new Member('Tim', Gender.Male)
})

test('addChild adds a child to the member', () => {
  member.addChild(new Member('Tom', Gender.Male))
  expect(member.children.length).toBe(1)
})
test('addSpouse adds a spouse to the member', () => {
  member.addSpouse(new Member('Jen', Gender.Female))
  expect(member.spouse).toBeInstanceOf(Member)
  expect(member.spouse.name).toBe('Jen')
})
test('getChildren returns a list of children', () => {
  member.addChild(new Member('Tom', Gender.Male))
  expect(member.getChildren(Gender.Male).length).toBe(1)
  expect(member.getChildren(Gender.Female).length).toBe(0)
})
test('getSiblings return an empty array if member does not have mother', () => {
  expect(member.getSiblings().length).toBe(0)
})
