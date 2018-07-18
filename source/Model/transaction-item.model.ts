/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */

import { OrderState } from './enums';
import { TransactionType } from './enums';
import { TransactionAmount } from './transaction-amount.model';
import { OrderType } from './enums';
import { Effect } from './effect.model';
import { MemoItem } from './memo-item.model';

export interface TransactionItem {
    hash: string;
    ledger: string;
    state: OrderState;
    date: string;
    type: TransactionType;
    fee: string;
    result: string;
    price?: string;
    pair?: string;
    seq?: number;
    counterparty?: string;
    amount: TransactionAmount;
    offertype: OrderType;
    effects: Array<Effect>;
    memos?: Array<MemoItem>;
}
