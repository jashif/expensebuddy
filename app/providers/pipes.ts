import {Injectable, Inject, Pipe} from '@angular/core'
import {DatePipe} from '@angular/common'
@Pipe({ name: 'formatDate' })
export class FormatDatePipe {
  format:string="";
 
  transform(time: string): string {
    let tmpDate = new Date(time);
    //var pipe=new DatePipe();
   return tmpDate.toDateString();// pipe.transform(tmpDate,"dd/MMM")
 
  }
}