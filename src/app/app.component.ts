import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  numberValue = 100000;
  result?: number;
  startTime?: Date;
  endTime?: Date;
  uiBlockedFor?: number;
  counter = 1;

  WorkerCalPrime(num: number){
    this.startTime = new Date();

    if(typeof Worker !== 'undefined'){
      // Create a new 
      const worker = new Worker(new URL('./app.worker'));

      worker.onmessage = ({data}) => {
        console.log(`Page got message: ${data}`);
        this.result = data.prime;
      }
      worker.postMessage({num});
    }else{
      console.log(`WebWorkers not supported`);
    }

    this.endTime = new Date();
    this.uiBlockedFor = this.endTime.valueOf() - this.startTime.valueOf();

  }

  log(){
    console.log(this.counter++);
  }

}
