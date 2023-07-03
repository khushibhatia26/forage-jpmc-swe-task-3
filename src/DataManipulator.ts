import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  //stock: 'string',
  upper_bound: number,
  lower_bound: number,
  timestamp: Date,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) /2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) /2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1+0.05;
    const lowerBound = 1 - 0.05;
    //return serverResponds.map((el: any) => {
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,

        //stock: el.stock,
        //top_ask_price: el.top_ask && el.top_ask.price || 0,
        //timestamp: el.timestamp,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
    }
  }

