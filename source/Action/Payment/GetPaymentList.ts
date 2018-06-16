import PaymentItem from '../../Type/PaymentItem';
import Base from '../Base';

export interface RawResponse {
  payments: PaymentItem[];
  success: boolean;
}

export interface Transform {
  address: string;
}

export interface Query {
  destination_account?: string;
  direction?: string;
  end_ledger?: number;
  page?: number;
  per_page?: number;
  source_account?: string;
  start_ledger?: number;
}

export interface Options {
  query?: Query;
  transform: Transform;
}

class GetPaymentList extends Base {
  protected path: string = `accounts/payments/{address}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.transform, targetOptions.query);
    return await service.fetch<RawResponse>(url);
  }

}

export default GetPaymentList;
