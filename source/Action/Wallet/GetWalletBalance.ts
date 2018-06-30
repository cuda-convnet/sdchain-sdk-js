import {GetWalletBalanceRawReponse} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetWalletBalance extends Base {
  protected readonly path: string = `/accounts/balances/{address}`;

  async fetch(options: Options): Promise<GetWalletBalanceRawReponse> {
    const service = this.service;
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<GetWalletBalanceRawReponse>(url, {method: this.method.toUpperCase()});
  }

}

export default GetWalletBalance;
