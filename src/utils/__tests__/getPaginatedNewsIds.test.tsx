import { getPaginatedNewsIds } from '@utils/getPaginatedNewsIds'

describe('getPaginatedNewsIds test', () => {
  test('getPaginatedNewsIds with correct data', () => {
    const testArrayData =
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    expect(getPaginatedNewsIds(testArrayData)).toEqual([
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15]
    ])
  })

  test('getPaginatedNewsIds with incorrect data', () => {
    expect(getPaginatedNewsIds(undefined)).toBe(undefined)
  })
})