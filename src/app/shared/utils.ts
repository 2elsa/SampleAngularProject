import { CountryState, NamedModel } from '@services/flxwealthmanager.api.client';
import b64toBlob from 'b64-to-blob';
import { format, formatDistance, eachYearOfInterval, addYears, startOfYear } from 'date-fns';

export class Utils {

    static splitIntoTwoGroups<T>(arr: T[]): T[][] {
        if (arr.length < 2) {
            return arr.length === 1 ? [arr] : [];
        }
        const midPoint = Math.ceil(arr.length / 2);
        return [arr.slice(0, midPoint), arr.slice(midPoint)]
    }

    static formatDate(date?: number | Date, dateFormat = 'MM/dd/yyyy'): string | undefined {
        if (!date) {
            return undefined;
        }
        return format(date, dateFormat);
    }

    static formatDateAsDistanceToNow(date: number | Date, includeSeconds = true, addSuffix = true): string {
        return formatDistance(date, new Date(), { includeSeconds: includeSeconds, addSuffix: addSuffix });
    }

    static readFile<T extends string | ArrayBuffer>(file: File): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                const reader = new FileReader();
                reader.onload = e => {
                    resolve(e.target?.result as T);
                };
                reader.readAsDataURL(file);
            } catch (e) {
                reject(e);
            }
        });
    }

    static convertBase64ToUrl(base64: string, contentType: string): string {

        try {
            const blob = b64toBlob(base64, contentType);
            return URL.createObjectURL(blob);
        } catch (e) {
            console.error(e);
            return (<any>null) as string;
        }
    }

    static bytesToSize(bytes: number): { size: number, desc: string, order: number } {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return { size: 0, desc: 'Bytes', order: 0 };

        const i = Math.trunc(Math.floor(Math.log(bytes) / Math.log(1024)));
        return {
            size: Math.round((bytes / Math.pow(1024, i) * 100) / 100),
            desc: sizes[i],
            order: i
        }
    }

    static splitBase64ImageIntoParts(base64Image: string): { base64Str: string, contentType: string } {
        if (base64Image.startsWith('data:')) {
            const parts = base64Image.split(',', 2);
            return {
                base64Str: `${parts.pop()}`,
                contentType: `${parts.pop()?.split(':').pop()}`
            }
        }
        return { base64Str: base64Image, contentType: <any>null };
    }

    static getYearsSince(date: Date, numToGo: number, dir: 'back' | 'forward', sortBy: 'asc' | 'desc' = 'desc'): number[] {
        const end = dir === 'back' ? addYears(date, -numToGo) : addYears(date, numToGo);
        const interval = dir === 'back' ? { start: end, end: date } : { start: date, end: end };
        const years = eachYearOfInterval(interval).map(d => d.getFullYear());
        return sortBy === 'asc' ? years.sort((a, b) => a - b) : years.sort((a, b) => b - a);
    }

    static formatCountryStateCity(data: { country?: NamedModel, state?: CountryState, city?: string }): string {
        let location = '';
        if (data) {
            location = data.city ?? '';
            if (data.state) {
                location = `${location}, ${data.state.short_Name ?? data.state.long_Name}`;
            }
            if (data.country) {
                location = `${location}, ${data.country.name}`;
            }
        }
        return location;
    }

    static sort<T>(data: T[], sortBy: (a: T) => any): T[] {
        data.sort((a, b) => sortBy(a).localeCompare(sortBy(b)));
        return data;
    }
}