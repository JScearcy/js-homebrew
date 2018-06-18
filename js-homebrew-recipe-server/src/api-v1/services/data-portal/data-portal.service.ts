import { Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { Database, Statement } from 'sqlite3';

import { GrainModel } from '@models/grain-model';
import { HopModel } from '@models/hop-model';
import { YeastModel } from '@models/yeast-model';
import { SQLITE_DB_TOKEN } from '../../providers/database.tokens';
import { Observer } from 'rxjs';

@Injectable()
export class DataPortalService {
    constructor(@Inject(SQLITE_DB_TOKEN) private dbContext: Database) {}

    getGrains(): Observable<GrainModel[]> {
        const statement = this.dbContext.prepare('SELECT * from v1_grains');
        return this.executeStatementMethod<GrainModel[]>(statement, statement.all.name);
    }

    getGrain(id: number): Observable<GrainModel> {
        const statement = this.dbContext.prepare('SELECT * from v1_grains WHERE id = ?', id);
        return this.executeStatementMethod<GrainModel>(statement, statement.get.name);
    }

    getHops(): Observable<HopModel[]> {
        const statement = this.dbContext.prepare('SELECT * from Hops');
        return this.executeStatementMethod<HopModel[]>(statement, statement.all.name);
    }

    getHop(id: number): Observable<HopModel> {
        const statement = this.dbContext.prepare('SELECT * from Hops WHERE id = ?', id);
        return this.executeStatementMethod<HopModel>(statement, statement.get.name);
    }

    getYeasts(): Observable<YeastModel[]> {
        const statement = this.dbContext.prepare('SELECT * from Yeast');
        return this.executeStatementMethod<YeastModel[]>(statement, statement.all.name);
    }

    getYeast(id: number): Observable<YeastModel> {
        const statement = this.dbContext.prepare('SELECT * from Yeast WHERE ID = ?', id);
        return this.executeStatementMethod<YeastModel>(statement, statement.get.name);
    }

    private executeStatementMethod<T>(statement: Statement, method: string): Observable<T> {
        return Observable.create((observer: Observer<T>) => {
            statement[method]((err, result) => {
                if (err) {
                    observer.error(err);
                    observer.complete();
                } else {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }
}
