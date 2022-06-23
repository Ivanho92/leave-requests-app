import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { LeaveRequest } from '../../interfaces/leave-request';
import { LeaveRequestService } from '../../services/leave-request.service';

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent implements OnInit {
    @Input() leaveRequest?: LeaveRequest;

    constructor(
        private leaveRequestService: LeaveRequestService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getLeaveRequest();
    }

    formatDate(date: string): string {
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${ye}-${mo}-${da}`;
    }

    getLeaveRequest(): void {
        const id = String(this.route.snapshot.paramMap.get('id'));
        this.leaveRequestService
            .getLeaveRequest(id)
            .subscribe((leaveRequest) => {
                const startDate = this.formatDate(leaveRequest.startDate);
                const endDate = this.formatDate(leaveRequest.endDate);
                this.leaveRequest = { ...leaveRequest, startDate, endDate };
            });
    }

    update(data: NgForm): void {
        const id = String(this.route.snapshot.paramMap.get('id'));

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
            status
        };

        console.log(body);

        this.leaveRequestService.updateLeaveRequest(body, id).subscribe(() => {
            data.reset();
            this.location.back();
        });
    }
}
