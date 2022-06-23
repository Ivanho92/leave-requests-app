enum Category {
    'annual',
    'hospitality',
    'adoption',
    'paid-educational',
    'maternity',
    'paternity',
    'parental',
    'palliative-care',
    'serious-illness',
    'time-credit',
    'short-time-unemployment',
    'compelling-reasons',
    'political',
};

enum Status {
    'new',
    'approved',
    'refused',
    'canceled'
};

export interface LeaveRequest {
    employee: string;
    startDate: string;
    endDate: string;
    category: Category | string;
    status: Status | string;
    _id?: string;
}