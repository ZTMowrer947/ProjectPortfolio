import { convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub<Data = unknown> {
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private paramSubject = new ReplaySubject<ParamMap>();
    private dataSubject = new ReplaySubject<Data>();

    constructor(initialParams?: Params, initialData?: Data) {
        this.setParamMap(initialParams);
        this.setData(initialData);
    }

    /** The mock paramMap observable */
    readonly paramMap = this.paramSubject.asObservable();
    readonly data = this.dataSubject.asObservable();

    /** Set the paramMap observables's next value */
    setParamMap(params?: Params) {
        this.paramSubject.next(convertToParamMap(params));
    }

    setData(data?: Data) {
        this.dataSubject.next(data);
    }
}
