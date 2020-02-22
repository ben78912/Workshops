import { Component, OnInit } from '@angular/core';
import { EEGSample, MuseClient, zipSamples } from 'muse-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-muse',
  templateUrl: './muse.component.html',
  styleUrls: ['./muse.component.css']
})
export class MuseComponent implements OnInit {

  // declare muse connection variables

  private muse = new MuseClient();
  data: Observable<EEGSample> | null;

  // variables for the Muse data

  cur_data = new Array<number>();
  channels = [];

  // dummy data to test whether ngFor works

  test_data = [
    {'AF7': 0, 'AF8': 0, 'TP9': 0, 'TP10': 0},
    {'AF7': 1, 'AF8': 1, 'TP9': 1, 'TP10': 1},
    {'AF7': 2, 'AF8': 2, 'TP9': 2, 'TP10': 2},
    {'AF7': 3, 'AF8': 3, 'TP9': 3, 'TP10': 3},
    {'AF7': 4, 'AF8': 4, 'TP9': 4, 'TP10': 4}
  ];

  constructor() { }

  ngOnInit() {

  }

  /**
   * connectes to the Muse API through bluetooth
   */
  async connectMuse() {

    await this.muse.connect();
    await this.muse.start();

    this.data = zipSamples(this.muse.eegReadings);

    this.stream();
  }

  /**
   * subscribe to the Muse data
   */
  stream() {

    this.data.subscribe((sample) => {

      // ----------------- TO DO --------------------

      // Hint: could get the data received by using sample.data
      //       ie) console.log(sample.data)
      //       could use console.log to check the format of the data received from the Muse.

      // Hint: the first four values of the sample data are the values for TP9, AF7, AF8, TP10 respectively,
      //       and the type for the values are strings.

      // step 1: the 'cur_data' variable should have the form [val_TP9, val_AF7, val_AF8, val_TP10].
      //         find a way to assign the 'cur_data' to be an array containing the first four values of the
      //         current sample data. make sure the values are of type Number not String.

      // step 2: create a new json object of the form {'TP9': val_TP9, 'AF7': val_AF7, 'AF8': val_AF8, 'TP10': val_TP10}.
      //         hint: use the 'cur_data' variable to help you do that.

      // step 3: check whether any of the four values received are invalid (NaN), if so just ignore it and do nothing
      //         Hint: consider using a flag variable to help you keep track of whether any NaN is seen.

      // step 4: if all the values are good (not NaN), push the json object into the 'channels' list. make sure the
      //         list size stays at 10. if the list size exceeds 10, must shift the list to get rid of the old values.

    });
  }
}