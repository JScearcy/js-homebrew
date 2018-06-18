import { Database, OPEN_READONLY } from 'sqlite3';
import * as path from 'path';
import { SQLITE_DB_TOKEN } from '../providers/database.tokens';

export const databaseProviders = [
    {
        provide: SQLITE_DB_TOKEN,
        useFactory: async () => {
            const dbPath = path.resolve(__dirname, '../../data/Fermentables.db');
            return await new Promise((resolve, reject) => {
                const database = new Database(dbPath, OPEN_READONLY, (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(database);
                    }
                });
            });
        },
    },
];
