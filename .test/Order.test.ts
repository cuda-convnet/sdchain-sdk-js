import DeleteOrderItem from '../source/Action/Order/DeleteOrderItem';
import GetOrderBook from '../source/Action/Order/GetOrderBook';
import GetOrderItem from '../source/Action/Order/GetOrderItem';
import GetOrderList from '../source/Action/Order/GetOrderList';
import PostOrderItem from '../source/Action/Order/PostOrderItem';
import {OrderType} from '../source/Model';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source, data_target} from './Setup/Setting';

describe('Test Order API: ', () => {
  const wallet = new Wallet(online);

  it('Get Order List', async () => {
    const options = {
      placeholder: {address: data_source.address},
      query: {limit: 2}
    };

    const item = new GetOrderList(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.validated).toBe(true);
    expect(response.orders.length).toBe(2);
  });

  it('Get Order List', async () => {
    const orders = await wallet.getOrderList(data_source.address);
    expect(orders.length).not.toBe(0);
  });

  it('Get Order Item', async () => {
    const options = {
      placeholder: {
        address: data_source.address,
        hash: data_source.hash.order
      }
    };

    const item = new GetOrderItem(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.validated).toBe(true);
    expect(response.hash).not.toBe('');
  });

  it('Get Order Item', async () => {
    const result = await wallet.getOrderInfo(data_source.address, data_source.hash.order);
    expect(result.validated).toBe(true);
    expect(result.hash).not.toBe('');
  });

  xit('Post Order Item', async () => {
    const options = {
      placeholder: {address: data_source.address},
      body: {
        secret: data_source.secret,
        order: {
          type: OrderType.buy,
          taker_pays: {
            currency: 'SDA',
            counterparty: '',
            value: '0'
          },
          taker_gets: {
            currency: 'CNY',
            counterparty: '6UPd52jHtu1d88nc3S3WeroACFQpKfybhU',
            value: '0'
          }
        }
      }
    };

    const item = new PostOrderItem(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.hash).not.toBe('');
  });

  xit('Post Order Item', async () => {
    const baseAmount = {
      currency: 'SDA',
      counterparty: '',
      value: '0'
    };

    const counterAmount = {
      currency: 'CNY',
      counterparty: '6UPd52jHtu1d88nc3S3WeroACFQpKfybhU',
      value: '0'
    };

    const result = await wallet.submitOrder(data_source.secret, data_source.address, baseAmount, counterAmount, true);
    expect(result.hash).not.toBe('');
  });

  xit('Delete Order Item', async () => {
    const options = {
      placeholder: {
        address: data_target.address,
        hash: 5
      },
      body: {
        secret: data_target.secret
      }
    };

    const item = new DeleteOrderItem(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.hash).not.toBe('');
  });

  xit('Delete Order Item', async () => {
    const result = await wallet.deleteOrder(data_target.secret, data_target.address, 5);
    expect(result.hash).not.toBe('');
  });

  it('Get Order Book', async () => {
    const options = {
      placeholder: {
        base: 'SDA',
        counter: 'SLC+6ss6oK8v3uKo33z1uL7Jqtt1abAQYu9cMq'
      } // query: {limit: 2}
    };

    const item = new GetOrderBook(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.validated).toBe(true);
  });

});




