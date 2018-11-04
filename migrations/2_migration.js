const ET = artifacts.require('ExampleToken')
const Transmute = artifacts.require('Transmute')

module.exports = (deployer) => {
   deployer.deploy(ET, 0).then( et => {
      deployer.deploy(Transmute, et.address)
   })
}
