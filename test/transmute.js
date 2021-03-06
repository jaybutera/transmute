const Transmute = artifacts.require('Transmute')
const ET = artifacts.require('ExampleToken')

contract('Test transmute', ([owner, user]) => {
   let transmute

   beforeEach( async () => {
      token     = await ET.new(1000,                  { from: owner })
      transmute = await Transmute.new( token.address, { from: owner })

      // Send eth to contract
      web3.eth.sendTransaction({ from: owner, to: transmute.address, value: 1000 })
   })

   it('Should transmute', async () => {
      await token.transfer(user, 500,             { from: owner })
      await token.approve(transmute.address, 500, { from: user })

      const pre_bal = (await web3.eth.getBalance(user)).toNumber()
      await transmute.transformFrom(user, 500,    { from: owner })

      const bal = (await web3.eth.getBalance(user)).toNumber()

      assert.equal(bal, pre_bal+500)
   })
})
