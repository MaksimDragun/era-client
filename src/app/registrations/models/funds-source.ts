export class FundsSource {
  name: string;
  value: string;
}

const ALL: FundsSource = {name: 'A', value: undefined};
const BUDGET: FundsSource = {name: 'B', value: 'B'};
const PAID: FundsSource = {name: 'P', value: 'P'};

export const FUNDS_SOURCE_LIST: FundsSource[] = [BUDGET, PAID];
export const SEARCH_FUNDS_SOURCE_LIST: FundsSource[] = [ALL, BUDGET, PAID];
