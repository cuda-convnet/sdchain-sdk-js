/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */

import { OrderBookItem } from './order-book-item.model';

export interface GetOrderBookResponseBody {
    order_book: string;
    ledger: string;
    validated: boolean;
    bids: Array<OrderBookItem>;
    asks: Array<OrderBookItem>;
    success: boolean;
}
