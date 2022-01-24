const calculatorPage = require('../../pages/googleCloud/googleCloudPage');
const chai = require('chai');
const { expect } = require('chai');

describe('E2E Pastbin page testing ', function () {
  let homePage = new calculatorPage();
  let emailPage;

  it('should load google cloud home page', async function () {
    const googleUrl = 'https://cloud.google.com/';
    await homePage.openPage(googleUrl);
    await homePage.maximizeWindow();
    const url = await homePage.getPageUrl();
    await expect(url).be.equal(googleUrl);
  });
  it('should input keyword "calculator" in search field and find calculator link ', async function () {
    const keywords = 'calculator';
    const resultKeys = await homePage.getSearchingKeys(keywords);
    const resultUrl = await homePage.searching();
    await expect(resultKeys).to.equal(keywords);
    await expect(resultUrl).to.be.contain(
      'https://cloud.google.com/products/calculator'
    );
  });
  it('should send key 4 to instanses field', async function () {
    const key = '4';
    const result = await homePage.sendKeyToInstansesFieldDiv(key);
    await expect(result).to.equal(key);
  });
  it('should get operating system from dropdown', async function () {
    const result = await homePage.getOperatingSystemElement();
    await expect(result).to.equal(
      'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)'
    );
  });
  it('should get VM class item Preemptible from dropdown', async function () {
    const result = await homePage.selectVMtypePreemp();
    await expect(result).to.equal('Preemptible');
  });

  it('should get machine type from dropdown', async function () {
    const result = await homePage.selectMachinetype();
    await expect(result).to.equal('n1-standard-8 (vCPUs: 8, RAM: 30GB)');
  });
  it('should get VM class item Regular from dropdown', async function () {
    const result = await homePage.selectVMtypeReg();
    await expect(result).to.equal('Regular');
  });
  it('should switch on GPUs checkbox', async function () {
    const result = await homePage.onGPUCheckbox();
    await expect(result).to.equal('true');
  });
  it('should select gpu element from gpu type list ', async function () {
    const result = await homePage.selectGPUType();
    await expect(result).to.equal('NVIDIA Tesla V100');
  });
  it('should select element from gpu number list ', async function () {
    const result = await homePage.selectGPUNumber();
    await expect(result).to.equal('1');
  });
  it('should select ssd type from ssd types list ', async function () {
    const result = await homePage.selectLocalSSDType();
    await expect(result).to.equal('2x375 GB');
  });
  it('should select coutry from location list ', async function () {
    const result = await homePage.selectLocation();
    await expect(result).to.equal('South Carolina (us-east1)');
  });
  it('should select committed usage year from committed usage ', async function () {
    const result = await homePage.selectCommittedUsage();
    await expect(result).to.equal('1 Year');
  });
  it('should get total cost after clicked on estimate button ', async function () {
    const result = await homePage.addToExstimateBtnClick();
    await expect(result).to.equal(
      'Total Estimated Cost: USD 4,801.42 per 1 month'
    );
  });
  it('should get email from emailLink', async function () {
    const home = homePage.getWindowHandle();
    const email = await homePage.getEmailPage();
    emailPage = await homePage.getWindowHandle();
    const result = await homePage.inputEmailInField(home, email);
    await expect(result).to.equal(email);
  });
  it('should get letter from email account', async function () {
    const result = await homePage.getLetter(emailPage);
    await expect(result).to.equal('Google Cloud Price Estimate');
  });

  after(async () => {
    await homePage.quit();
  });
});
