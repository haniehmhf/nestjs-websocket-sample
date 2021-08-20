
export interface ILive {
    events:IEvent[],
    markets:IMarket[]
}

export interface IEvent {
    id:number,
    name:string,
    status:string,
}

export interface IMarket {
    id:number,
    name:string,
    status:string,
}