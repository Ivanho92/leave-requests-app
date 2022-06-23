import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { LeaveRequest } from '../../interfaces/leave-request';
import { LeaveRequestService } from '../../services/leave-request.service';

import { ObjectID } from 'bson';

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent implements OnInit {
    @Input() leaveRequest?: LeaveRequest;

    constructor(
        private leaveRequestService: LeaveRequestService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
       
    }

    add(data: NgForm): void {
        // console.log(data);

        let employee = data.form.value.employee.trim();
        let startDate = data.form.value['start-date'].trim();
        let endDate = data.form.value['end-date'].trim();
        let category = data.form.value.category.trim();
        let status = data.form.value.status.trim();

        if (!employee || !startDate || !endDate || !category || !status) {
            return console.log('Form not completed!');
        }

        let body = {
            employee,
            startDate,
            endDate,
            category,
            status,
            _id: new ObjectID().toString(),
        };

        console.log(body);

        this.leaveRequestService.addLeaveRequest(body).subscribe(() => {
            data.reset();
            this.location.back();
        });
    }
}
