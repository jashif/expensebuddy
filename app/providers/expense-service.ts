
import { Injectable, bind } from '@angular/core'
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { Page, Storage, LocalStorage } from 'ionic-angular'
import { Response } from '@angular/http'
import { ExpenseCategory, GetHistoryModel, ExpenseModel, GetReportModel, ExpenseModelResponse, GetUserResponse } from '../models/expense-model'
import { ResourceService } from './resource-service'




@Injectable()
export class ExpenseService {
    storage = new Storage(LocalStorage);

    constructor(public rs: ResourceService) {

    }
    getUser() {
        return new Promise<GetUserResponse>((resolve, reject) => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.getUser()
                .map(res => <GetUserResponse>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs);
                }, (err) => { reject(err); });
        });
    }
    getExpenseList() {
        return new Promise<Array<ExpenseModel>>((resolve, reject) => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.getExpensesList()
                .map(res => <ExpenseModelResponse>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs.expenses);
                }, (err) => { reject(err); });
        });

    }
    getReport() {
        return new Promise<GetReportModel>((resolve, reject) => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.getReport()
                .map(res => <GetReportModel>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs);
                }, (err) => { reject(err); });
        });

    }
    getExpenseListbyid(id: string, roomid: string) {
        return new Promise<ExpenseModelResponse>(resolve => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.getExpensesListById(id, roomid)
                .map(res => <ExpenseModelResponse>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs);
                });
        });

    }
    addExpense(expensedata: any) {
        return new Promise((resolve, reject) => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.addExpense(expensedata)
                .map(res => <any>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs.expenses);
                }, (err) => { reject(err); });
        });
    }
    addMember(data: any) {
        return new Promise((resolve, reject) => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.addmember(data)
                .map(res => <any>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs);
                }, (err) => { reject(err); });
        });
    }
    changePassword(data: any) {
        return new Promise<any>((resolve, reject) => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.changepassword(data)
                .map(res => <any>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs);
                }, (err) => { reject(err); });
        });
    }
    getHistory(month, roomid) {
        return new Promise<GetHistoryModel>(resolve => {
            // We're using Angular Http provider to request the users,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the users and resolve the promise with the new data.
            this.rs.getHistory(month, roomid)
                .map(res => <GetHistoryModel>(res.json()))
                .subscribe(exprs => {
                    // we've got back the raw users, now generate the core schedule users
                    // and save the users for later reference

                    resolve(exprs);
                });
        });

    }

    getCategories() {



        return new Promise<Array<ExpenseCategory>>(resolve => {

            var data = this.storage.get("categories");
            data.then((x) => {
                if (x) {
                    resolve(JSON.parse(x));
                    // already loaded data

                } else {
                    // We're using Angular Http provider to request the users,
                    // then on the response it'll map the JSON data to a parsed JS object.
                    // Next we process the users and resolve the promise with the new data.
                    this.rs.getCategories()
                        .map(res => <Array<ExpenseCategory>>(res.json()))
                        .subscribe(exprs => {
                            this.storage.set("categories", JSON.stringify(exprs));
                            // we've got back the raw users, now generate the core schedule users
                            // and save the users for later reference

                            resolve(exprs);
                        });

                }
            });

        });

    }

}