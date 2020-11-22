export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export class Member {
  public children: Member[]
  public spouse: Member | null
  constructor(
    public name: string,
    public gender: Gender,
    public father: Member | null = null,
    public mother: Member | null = null
  ) {
    this.children = []
    this.spouse = null
  }

  addChild(child: Member) {
    this.children = this.children.concat(child)
  }

  addSpouse(spouse: Member) {
    this.spouse = spouse
  }

  getSiblings(gender?: Gender): Member[] {
    let result: Member[] = []
    if (this.mother === null) {
      return result
    }

    result = this.mother.children.filter((child) => {
      if (!gender) {
        return child.name !== this.name
      }

      return child.gender === gender && child.name !== this.name
    })

    return result
  }

  getChildren(gender: Gender, exceptName?: string): Member[] {
    let children: Member[] = []
    if (this.gender === Gender.Male && this.spouse !== null) {
      children = this.spouse.children
    } else {
      children = this.children
    }

    return children.filter((child) => {
      if (exceptName) {
        return child.gender === gender && child.name !== exceptName
      }
      return child.gender === gender
    })
  }

  getInLaws(gender: Gender): Member[] {
    let inLaws: Member[] = []
    if (this.spouse !== null || this.spouse.mother !== null) {
      const spouseSiblings = this.spouse.mother.getChildren(
        gender,
        this.spouse.name
      )
      inLaws = inLaws.concat(spouseSiblings)
    }
    if (this.mother !== null) {
      const siblingGender =
        gender === Gender.Female ? Gender.Male : Gender.Female

      const ownSiblings = this.mother.getChildren(siblingGender, this.name)
      const siblingSpouse = ownSiblings.map((sibling) => {
        if (sibling.spouse !== null) {
          return sibling.spouse
        }
      })
      inLaws = inLaws.concat(siblingSpouse)
    }

    return inLaws
  }
}
