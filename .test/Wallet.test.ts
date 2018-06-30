import GetNewWallet from '../source/Action/Wallet/GetNewWallet';
import GetWalletBalance from '../source/Action/Wallet/GetWalletBalance';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source} from './Setup/Setting';

describe('Test Wallet API', () => {
  const wallet = new Wallet(online);

  xit('Get New Wallet', async () => {
    const result = await new GetNewWallet(online).fetch();
    const {address, secret} = result.wallet;
    expect(address.substring(0, 1)).toBe('6');
    expect(secret.substring(0, 1)).toBe('s');
  });

  xit('Get New Wallet', async () => {
    const result = await wallet.newWallet();
    const {address, secret} = result.wallet;
    expect(address.substring(0, 1)).toBe('6');
    expect(secret.substring(0, 1)).toBe('s');
  });

  it('Get Wallet Balance', async () => {
    const options = {placeholder: {address: data_source.address}};
    const item = new GetWalletBalance(online);

    const response = await item.fetch(options);
    expect(response.balances.length).not.toBe(0);

    const test = await item.validateResponse(response);
    expect(test.errors.length).toBe(0);

    // const test1 = await item.validateResponse({});
    // console.dir(test1, {depth: null});
    // console.dir(test1.humanReadable());

  });

  it('Get Wallet Balance', async () => {
    const result = await wallet.getBalance(data_source.address);
    expect(result.length).not.toBe(0);
  });
});
