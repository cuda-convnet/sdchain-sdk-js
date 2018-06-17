import GetConnected from '../source/Action/Server/GetConnected';
import GetOrderBook from '../source/Action/Server/GetOrderBook';
import GetStatus from '../source/Action/Server/GetStatus';
import GetTransactionFee from '../source/Action/Server/GetTransactionFee';
import Server from '../source/Server';
import {online} from './Setup/Service';

describe('Test Server API', () => {
  const server = new Server(online);

  it('Server is connected', async () => {
    const result = await new GetConnected(online).fetch();
    expect(result.success).toBe(true);
    expect(result.connected).toBe(true);
  });

  it('Server is connected', async () => {
    const result = await server.isConnected();
    expect(result).toBe(true);
  });

  it('Server Status is syncing', async () => {
    const result = await new GetStatus(online).fetch();
    expect(result.success).toBe(true);
    // expect(result.sdchaind_server_status.server_state).toBe('syncing');
  });

  it('Server Status is syncing', async () => {
    const result = await server.getInfo();
    expect(result.success).toBe(true);
    // expect(result.sdchaind_server_status.server_state).toBe('syncing');
  });

  it('Transcation Fee is not zero', async () => {
    const result = await new GetTransactionFee(online).fetch();
    expect(result.success).toBe(true);
    expect(result.fee).not.toBeLessThanOrEqual(0);
  });

  it('Transcation Fee is not zero', async () => {
    const result = await server.getTransactionFee();
    expect(result).not.toBeLessThanOrEqual(0);
  });

  it('Get Order Book', async () => {
    const options = {
      transform: {
        base: 'SDA',
        counter: 'SLC+6ss6oK8v3uKo33z1uL7Jqtt1abAQYu9cMq'
      } // query: {limit: 2}
    };

    const item = new GetOrderBook(online);
    const result = await item.fetch(options);
    // console.dir(result, {depth: null});
    expect(result.validated).toBe(true);
  });

});


