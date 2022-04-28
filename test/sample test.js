const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Sample", function (){
    let acc1
    let acc2
    let sample

    beforeEach(async function(){
        [acc1, acc2] = await ethers.getSigners()
        const Samples = await ethers.getContractFactory("Sample", acc1)
        sample = await Samples.deploy()
        await sample.deployed()
    })

    it ("should be deployed", async function(){
        expect(sample.address).to.be.properAddress
    })

    it ("should have 0 ether by default", async function(){
        const balance = await sample.currentBalance()
        expect(balance).to.eq(0)
    })
    
    it ("should be possible to send funds", async function(){
        const sum = 100
        const tx = await sample.connect(acc2).pay("hello from hardhat", { value: sum })

        await expect(() => tx)
        .to.changeEtherBalances([acc2, sample], [-sum, sum])

        await tx.wait()

        const balance = await sample.currentBalance()
    })

})