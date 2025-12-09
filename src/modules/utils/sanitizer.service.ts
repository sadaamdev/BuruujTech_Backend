import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

@Injectable()
export class SanitizerService {
    private sanitizeFn;

    constructor() {
        const window = new JSDOM('').window;
        const DOMPurify = createDOMPurify(window);
        this.sanitizeFn = DOMPurify.sanitize;
    }

    sanitize(value: string): string {
        return this.sanitizeFn(value);
    }
}
