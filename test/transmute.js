const Transmute = artifacts.require('Transmute')
const ET = artifacts.require('ExampleToken')

contract('Test transmute', accounts => {
   let transmute

   beforeEach( async () => {
      token     = await ET.new(1000,                  { from: accounts[0] })
      transmute = await Transmute.new( token.address, { from: accounts[0] })

      // Send eth to contract
      web3.eth.sendTransaction({ from: accounts[0], to: transmute.address, value: 1000 })
   })

   it('Should transmute', async () => {
      const user = accounts[1]
      await token.transfer(user, 500, { from: accounts[0] })
      await token.approve(transmute.address, 500, { from: user })

      const pre_bal = (await web3.eth.getBalance(user)).toNumber()
      await transmute.transformFrom(user, 500, { from: accounts[0] })

      const bal = (await web3.eth.getBalance(user)).toNumber()

      assert.equal(bal, pre_bal+500)
   })
})
