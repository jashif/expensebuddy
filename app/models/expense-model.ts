export class ExpenseModel
{
date:string;
name:string;
amount:number;
description:string;

}
export class ExpenseModelResponse
{
status:string;
code:string;
totalAmount:number;
expenses:Array<ExpenseModel>;
}
export class GetUserResponse
{isAdmin:boolean;
userid:string;
roomid:string;
members:Array<UserResponse>;
}
export class UserResponse
{
    
id:string;
name:string;
amountSpend:number;
}
export class BaseResponse
{
    status:string;
code:string;
description:string;
 
}

export class GetReportModel
{
    id:string;
    totalamountreceivable:number;
    recieveamount:number;
    amountpayable:number;
    highestcontributor:boolean;
    tosend:Array<UserReport>;
    torecieve:Array<UserReport>;


}
export class ExpenseCategory
{
    name :string;
    type:string;
}
export class UserReport
{
    name:string;
    amountpayable:number;
}
export class GetHistoryModel
{
    totalexpense:number;
    perusershare:number;
    settlements:Array<SetleMent>;
    membersspend:Array<UserReport>;
    
}
export class SetleMent
{
    hastogetmoney:boolean;
    name:string;
    settleamount:number;
    desc :string;


}