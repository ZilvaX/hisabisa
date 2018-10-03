import dao from '../db/dao'

describe('User data acess', () => {
  it('should check user does not exist', async () => {
    const userExists = await dao.checkUserExists('test')
    expect(userExists).toEqual(false)
  })
})
