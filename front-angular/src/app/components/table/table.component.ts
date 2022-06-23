import { Component, OnInit } from '@angular/core';

import { LeaveRequest } from '../../interfaces/leave-request';
import { LeaveRequestService } from '../../services/leave-request.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    constructor(private leaveRequestService: LeaveRequestService) {}

    leaveRequests: LeaveRequest[] = [];

    ngOnInit(): void {
        this.getLeaveRequests();
    }

    formatDate(date: string): string {
        let d = new Date(date);
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${da}/${mo}/${ye}`;
    }

    getLeaveRequests(): void {
        this.leaveRequestService
            .getLeaveRequests()
            .subscribe((leaveRequests) => {
                const transformedLeaveRequests = leaveRequests.map(leaveRequest => {
                    return {
                        ...leaveRequest,
                        status: leaveRequest.status.toString().toUpperCase(),
                        startDate: this.formatDate(leaveRequest.startDate),
                        endDate: this.formatDate(leaveRequest.endDate)
                    }
                });
                // console.log(transformedLeaveRequests);
                this.leaveRequests = transformedLeaveRequests;
            })
    }

    delete(leaveRequest: LeaveRequest): void {
        this.leaveRequests = this.leaveRequests.filter(
            (record) => record !== leaveRequest
        );
        this.leaveRequestService.deleteLeaveRequest(leaveRequest._id).subscribe();
    }
}
