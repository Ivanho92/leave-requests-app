import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { LeaveRequest } from '../interfaces/leave-request';

@Injectable({
    providedIn: 'root',
})
export class LeaveRequestService {
    constructor(private http: HttpClient) {}

    // URL to web api
    private leaveRequestsUrl = 'http://localhost:3000/api/leave-requests';

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
    }

    /** GET leave requests from the server */
    getLeaveRequests(): Observable<LeaveRequest[]> {
        return this.http.get<LeaveRequest[]>(this.leaveRequestsUrl).pipe(
            tap(() =>
                console.log('Successfully fetched leave requests from API!')
            ),
            catchError(this.handleError<LeaveRequest[]>('getLeaveRequests', []))
        );
    }

    /** GET leave request from the server */
    getLeaveRequest(id: string): Observable<LeaveRequest> {
        const url = `${this.leaveRequestsUrl}/${id}`;
        return this.http.get<LeaveRequest>(url).pipe(
            tap(() =>
                console.log(`Successfully fetched leave request id ${id} !`)
            ),
            catchError(this.handleError<LeaveRequest>(`getLeaveRequest`))
        );
    }

    /** PUT: update the hero on the server */
    updateLeaveRequest(
        leaveRequest: LeaveRequest,
        id: string
    ): Observable<any> {
        const url = `${this.leaveRequestsUrl}/${id}`;

        return this.http.patch(url, leaveRequest, this.httpOptions).pipe(
            tap(() =>
                console.log(`Successfully updated leave request id ${id} !`)
            ),
            catchError(this.handleError<any>('updateLeaveRequest'))
        );
    }

    /** POST: add a new hero to the server */
    addLeaveRequest(leaveRequest: LeaveRequest): Observable<LeaveRequest> {
        return this.http
            .post<LeaveRequest>(
                this.leaveRequestsUrl,
                leaveRequest,
                this.httpOptions
            )
            .pipe(
                tap(() =>
                    console.log(`Successfully created a new leave request!`)
                ),
                catchError(this.handleError<LeaveRequest>('addLeaveRequest'))
            );
    }

    /** DELETE: delete the hero from the server */
    deleteLeaveRequest(id?: string): Observable<LeaveRequest> {
        const url = `${this.leaveRequestsUrl}/${id}`;

        return this.http.delete<LeaveRequest>(url, this.httpOptions).pipe(
            tap(() =>
                console.log(`Successfully deleted leave request id ${id} !`)
            ),
            catchError(this.handleError<LeaveRequest>('deleteLeaveRequest'))
        );
    }

    /* GET leave requests whose field contains searched term */
    searchLeaveRequests(term: string): Observable<LeaveRequest[]> {
        if (!term.trim()) {
            // if not search term, return empty array.
            return of([]);
        }
        return this.http
            .get<LeaveRequest[]>(`${this.leaveRequestsUrl}?search=${term}`)
            .pipe(
                tap(() => console.log('Search triggered!')),
                catchError(this.handleError<LeaveRequest[]>('searchLeaveRequests', []))
            );
    }
}
