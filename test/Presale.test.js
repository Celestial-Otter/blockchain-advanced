const expect = require("chai");

const [owner, otherAccount] = await ethers.getSigners();

const Presale = await ethers.getContractFactory("Presale");
const presale = await Presale.deploy();

describe("Presale", function () {
  it("Should set the right owner", async function () {
    expect(await presale.owner()).to.equal(owner.address);
  });
});
