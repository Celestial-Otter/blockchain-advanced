const { extractEventHandlers } = require("@mui/base");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { faIR } = require("date-fns/locale");

describe("Presale", function () {
  async function deployPresale() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Presale = await ethers.getContractFactory("Presale");
    const presale = await Presale.deploy();

    const TestToken = await ethers.getContractFactory("MOKToken");
    const testToken = await TestToken.deploy();

    return { presale, owner, otherAccount, testToken };
  }

  it("Should set the right owner", async function () {
    const { presale, owner } = await loadFixture(deployPresale);
    console.log(owner.address);
    expect(await presale.owner()).to.equal(owner.address);
  });

  it("Should be able to create a presale", async function () {
    const { presale, testToken, owner } = await loadFixture(deployPresale);
    await testToken.approve(presale.address, 100, { from: owner.address });
    const beforeOwnerTokenCount = Number(
      await testToken.balanceOf(owner.address)
    );

    await presale.startPresale(1, 99999999, 1, 100, testToken.address);

    const afterOwnerTokenCount = Number(
      await testToken.balanceOf(owner.address)
    );

    const testPresaleID = await presale.presaleRequests(1);

    expect(await parseInt(testPresaleID.startTimestamp)).to.equal(1);
    expect(await parseInt(testPresaleID.endTimestamp)).to.equal(99999999);
    expect(await parseInt(testPresaleID.price)).to.equal(1);
    expect(await parseInt(testPresaleID.numberofTokens)).to.equal(100);
    expect(await testPresaleID.tokenLocation.toString()).to.equal(
      testToken.address
    );
    expect(await parseInt(testPresaleID.numberofTokensSold)).to.equal(0);
    expect(await parseInt(testPresaleID.fees)).to.equal(0);
    expect(beforeOwnerTokenCount - 100).to.equal(afterOwnerTokenCount);
  });

  it("Should be able to use the buy function", async function () {
    const { presale, testToken, owner } = await loadFixture(deployPresale);
    await testToken.approve(presale.address, 100, { from: owner.address });

    await presale.startPresale(1, 99999999999, 1, 100, testToken.address);

    await presale.buy(1, 10, { from: owner.address, value: 11 });
    const testPresaleID = await presale.presaleRequests(1);

    expect(await parseInt(testPresaleID.numberofTokensSold)).to.equal(10);
  });

  it("Should be able to use the withdraw function", async function () {
    const { presale, testToken, owner } = await loadFixture(deployPresale);

    const beforeOwnerTokenCount = Number(
      await testToken.balanceOf(owner.address)
    );

    await testToken.approve(presale.address, 100, { from: owner.address });
    await presale.startPresale(1, 99999, 1, 100, testToken.address);

    const afterOwnerTokenCount = Number(
      await testToken.balanceOf(owner.address)
    );
    expect(beforeOwnerTokenCount - 100).to.equal(afterOwnerTokenCount);

    await presale.withdraw(1, { from: owner.address });
    const testPresaleID = await presale.presaleRequests(1);

    const afterOwnerTokenCount2 = Number(
      await testToken.balanceOf(owner.address)
    );

    expect(await parseInt(testPresaleID.numberofTokensSold)).to.equal(0);
    expect(beforeOwnerTokenCount).to.equal(afterOwnerTokenCount2);
  });

  it("Should be able to use the endpresale function", async function () {
    const { presale, testToken, owner } = await loadFixture(deployPresale);

    await testToken.approve(presale.address, 100, { from: owner.address });
    await presale.startPresale(1, 99999, 1, 100, testToken.address);

    await presale.endPresale(1, { from: owner.address });
    const testPresaleID = await presale.presaleRequests(1);

    expect(await parseInt(testPresaleID.numberofTokensSold)).to.equal(0);
  });
});
