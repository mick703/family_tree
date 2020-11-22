import { Member, Gender } from './member'
import * as messages from '../lib/constants/messages'
import * as relationships from '../lib/constants/relationships'

export class FamilyTree {
  relationshipNames: string[] = [
    relationships.PATERNAL_UNCLE,
    relationships.PATERNAL_AUNT,
    relationships.MATERNAL_AUNT,
    relationships.MATERNAL_UNCLE,
    relationships.SISTER_IN_LAW,
    relationships.BROTHER_IN_LAW,
    relationships.SON,
    relationships.DAUGHTER,
    relationships.SIBLINGS,
  ]
  constructor(public rootMember: Member) {}

  addChild(motherName: string, childName: string, gender: Gender) {
    if (gender !== Gender.Female && gender !== Gender.Male) {
      throw messages.CHILD_ADDITION_FAILED
    }

    const member = this.searchMember(this.rootMember, motherName) as Member
    if (!member) {
      throw messages.PERSON_NOT_FOUND
    }

    if (member.gender === Gender.Male) {
      throw messages.CHILD_ADDITION_FAILED
    }

    const newChild = new Member(
      childName,
      gender,
      member.spouse as Member,
      member
    )
    member.addChild(newChild)
  }

  addSpouse(existingMemberName: string, spouseName: string, gender: Gender) {
    const memberFound = this.searchMember(
      this.rootMember,
      existingMemberName
    ) as Member

    if (!memberFound || memberFound.spouse !== null) {
      throw messages.SPOUSE_ADDITION_FAILED
    }

    const spouse = new Member(spouseName, gender)
    // Add relationships between them
    memberFound.addSpouse(spouse)
    spouse.addSpouse(memberFound)
  }

  searchMember(branchRoot: Member, name: string): Member | boolean {
    if (name === null || name === '') {
      return false
    }

    if (name === branchRoot.name) {
      return branchRoot
    } else if (branchRoot.spouse !== null && name === branchRoot.spouse.name) {
      return branchRoot.spouse
    }

    let memberFound: Member | boolean = false
    let children: Member[] = []
    if (branchRoot.gender === Gender.Female) {
      children = branchRoot.children
    } else if (branchRoot.spouse !== null) {
      children = branchRoot.spouse.children
    }

    for (const child of children) {
      memberFound = this.searchMember(child, name)
      if (memberFound) {
        break
      }
    }

    return memberFound
  }

  getRelationship(memberName: string, relationship: string): Member[] {
    if (this.relationshipNames.includes(relationship) === false) {
      throw messages.INVALID_ARGUMENTS
    }

    let relatives: Member[] = []
    const member = this.searchMember(this.rootMember, memberName) as Member
    if (!member) {
      throw messages.PERSON_NOT_FOUND
    }
    relatives = this.findRelativesByRelationship(member, relationship)
    return relatives
  }

  findRelativesByRelationship(
    member: Member,
    relationshipName: string
  ): Member[] {
    let relatives: Member[] = []
    switch (relationshipName) {
      case relationships.PATERNAL_UNCLE:
        if (member.father === null) {
          return relatives
        }

        return member.father.getSiblings(Gender.Male)
      case relationships.PATERNAL_AUNT:
        if (member.father === null) {
          return relatives
        }
        return member.father.getSiblings(Gender.Female)

      case relationships.MATERNAL_UNCLE:
        if (member.mother === null) {
          return relatives
        }
        return member.mother.getSiblings(Gender.Male)
      case relationships.MATERNAL_AUNT:
        if (member.mother === null) {
          return relatives
        }
        return member.mother.getSiblings(Gender.Female)
      case relationships.SON:
        return member.getChildren(Gender.Male)

      case relationships.DAUGHTER:
        return member.getChildren(Gender.Female)

      case relationships.SIBLINGS:
        return member.getSiblings()

      case relationships.SISTER_IN_LAW:
        return member.getInLaws(Gender.Female)

      default:
        throw messages.INVALID_ARGUMENTS
    }
  }
}
