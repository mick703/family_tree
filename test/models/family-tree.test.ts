import { FamilyTree } from '../../src/models/family-tree'
import { Gender, Member } from '../../src/models/member'
import * as relationships from '../../src/lib/constants/relationships'
import { initFamilyTree } from '../../src/lib/utils'
import * as messages from '../../src/lib/constants/messages'
let familyTree: FamilyTree

beforeEach(() => {
  const rootMember = new Member('Arthur', Gender.Male)
  familyTree = new FamilyTree(rootMember)
})

test('FamilyTree can be instanticated with a root member', () => {
  expect(familyTree).toBeInstanceOf(FamilyTree)
})

test('addSpouse adds a spouse to an existing family member', () => {
  familyTree.addSpouse('Arthur', 'Margret', Gender.Female)
  const arthur = <Member>(
    familyTree.searchMember(familyTree.rootMember, 'Arthur')
  )
  expect(arthur.spouse).toBeInstanceOf(Member)
})

test('searchMember returns false if not found', () => {
  expect(familyTree.searchMember(familyTree.rootMember, 'Stranger')).toBe(false)
})

test('searchMember returns a member if found', () => {
  const foundMember = familyTree.searchMember(
    familyTree.rootMember,
    'Arthur'
  ) as Member
  expect(foundMember).toBeInstanceOf(Member)
  expect(foundMember.name).toBe('Arthur')
})

test.todo('addChild adds a child to an existing mother')
test.todo('addChild throws and exception if failed')

describe('getRelationship', () => {
  let loadedFamilyTree: FamilyTree

  beforeEach(() => {
    loadedFamilyTree = initFamilyTree()
  })
  test(`it can return ${relationships.PATERNAL_UNCLE} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'William',
      relationships.PATERNAL_UNCLE
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Albus')
  })

  test(`it can return ${relationships.PATERNAL_AUNT} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Ron',
      relationships.PATERNAL_AUNT
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Lily')
  })
  test(`it can return ${relationships.MATERNAL_UNCLE} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Draco',
      relationships.MATERNAL_UNCLE
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Hugo')
  })
  test(`it can return ${relationships.MATERNAL_AUNT} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Remus',
      relationships.MATERNAL_AUNT
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Dominique')
  })
  test('it returns an empty array if no relative is found', () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Aster',
      relationships.MATERNAL_AUNT
    )
    expect(relatives.length).toBe(0)
  })

  test(`it can return ${relationships.SON} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Victoire',
      relationships.SON
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Remus')
  })

  test(`it can return ${relationships.DAUGHTER} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Bill',
      relationships.DAUGHTER
    )
    expect(relatives.length).toBe(2)
    expect(relatives[0].name).toBe('Victoire')
    expect(relatives[1].name).toBe('Dominique')
  })

  test(`it can return ${relationships.SIBLINGS} for a member`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Victoire',
      relationships.SIBLINGS
    )
    expect(relatives.length).toBe(2)
    expect(relatives[0].name).toBe('Dominique')
    expect(relatives[1].name).toBe('Louis')
  })

  test(`it can return ${relationships.SISTER_IN_LAW} for a member - spouse's sister`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Ted',
      relationships.SISTER_IN_LAW
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Dominique')
  })

  test(`it can return ${relationships.SISTER_IN_LAW} for a member - sibling's wife`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'James',
      relationships.SISTER_IN_LAW
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Alice')
  })

  test(`it can return ${relationships.BROTHER_IN_LAW} for a member - spouse's brother`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Darcy',
      relationships.BROTHER_IN_LAW
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Albus')
  })

  test(`it can return ${relationships.BROTHER_IN_LAW} for a member - sibling's husband Louis`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Louis',
      relationships.BROTHER_IN_LAW
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Ted')
  })

  test(`it can return ${relationships.BROTHER_IN_LAW} for a member - sibling's husband Hugo`, () => {
    const relatives = loadedFamilyTree.getRelationship(
      'Hugo',
      relationships.BROTHER_IN_LAW
    )
    expect(relatives.length).toBe(1)
    expect(relatives[0].name).toBe('Malfoy')
  })
})

describe('Not happy paths and excpetions', () => {
  let loadedFamilyTree: FamilyTree

  beforeEach(() => {
    loadedFamilyTree = initFamilyTree()
  })
  it('addChild throws an exception if gender is invalid', () => {
    expect(() => {
      loadedFamilyTree.addChild('Margret', 'Joe', undefined)
    }).toThrow(messages.CHILD_ADDITION_FAILED)
  })
  it('addChild throws an exception if member is not found', () => {
    expect(() => {
      loadedFamilyTree.addChild('Stranger', 'Joe', Gender.Male)
    }).toThrow(messages.PERSON_NOT_FOUND)
  })

  it(`addChild throw an error ${messages.CHILD_ADDITION_FAILED} if member is not a mother`, () => {
    expect(() => {
      loadedFamilyTree.addChild('Arthur', 'Joe', Gender.Male)
    }).toThrow(messages.CHILD_ADDITION_FAILED)
  })

  it(`addSpouse throw an error ${messages.SPOUSE_ADDITION_FAILED} if member is not found`, () => {
    expect(() => {
      loadedFamilyTree.addSpouse('Stranger', 'Jane', Gender.Female)
    }).toThrow(messages.SPOUSE_ADDITION_FAILED)
  })
  it('searchMember returns false if name is empty', () => {
    expect(loadedFamilyTree.searchMember(loadedFamilyTree.rootMember, '')).toBe(
      false
    )
  })
})
