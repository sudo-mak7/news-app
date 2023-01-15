import { dateNormalizer } from '@utils/dateNormalizer'

describe('dateNormalizer test', () => {
  test('dateNormalizer with correct time', () => {
    expect(dateNormalizer(1314211127)).toBe('24.08.2011 (22:38)')
  })

  test('dateNormalizer with incorrect time', () => {
    expect(dateNormalizer(0)).toBe(0)
    expect(dateNormalizer(undefined)).toBe(undefined)
    expect(dateNormalizer(null)).toBe(null)
  })
})
