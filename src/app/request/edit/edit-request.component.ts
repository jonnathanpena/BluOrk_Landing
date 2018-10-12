import { Component, OnInit} from '@angular/core';
import notify from 'devextreme/ui/notify';

import { RequestProvider } from '../request.providers';

@Component({
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.scss']
})

export class EditRequestComponent implements OnInit {
  guardando: boolean;

  constructor(
    private servies: RequestProvider
  ) {}

  ngOnInit() {}

}
