import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of} from "rxjs";
import {Lesson} from "../model/lesson";
import {CoursesService} from "./courses.service";
import {catchError, finalize} from "rxjs/operators";

export class LessonsDataSource {

    private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
    public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: CoursesService) {}

    loadLessons(courseId:number,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {
        this.loadingSubject.next(true);
        console.log("click de pagination");
        this.coursesService.findLessons(courseId, filter, sortDirection,
            pageIndex, pageSize).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => {
                console.log(lessons);
                this.lessonsSubject.next(lessons);
            });
    }

    connect(): Observable<Lesson[]> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}

