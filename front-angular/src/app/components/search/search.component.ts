import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { LeaveRequest } from '../../interfaces/leave-request';
import { LeaveRequestService } from '../../services/leave-request.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    leaveRequests$!: Observable<LeaveRequest[]>;
    private searchTerms = new Subject<string>();

    constructor(private leaveRequestService: LeaveRequestService) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.leaveRequests$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.leaveRequestService.searchLeaveRequests(term))
        );
    }
}
