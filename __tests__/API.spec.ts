/**
 * @jest-environment jsdom
 */

import API from "../src/API";
import { AMSError } from "../src/AMSError";

describe('API', () => {

    it('API.skypeTokenAuth() should call fetch', async () => {
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({
            ok: true
        }));

        await API.skypeTokenAuth(token);

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('API.skypeTokenAuth() should throw error when response.ok is false', async () => {
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({
            ok: false,
            status: 401,
            statusText: 'Unauthorized'
        }));

        try {
            await API.skypeTokenAuth(token);
            fail('skypeTokenAuth should throw');
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.skypeTokenAuth() should throw an error if API does not succeed', async () => {
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.reject());

        try {
            await API.skypeTokenAuth(token);
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.createObject() should call fetch', async () => {
        const id = 'id';
        const file =  new File([""], "filename", { type: 'text/html' });
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({})
        }));

        await API.createObject(id, file, token);

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('API.createObject() should throw error when response.ok is false', async () => {
        const id = 'id';
        const file =  new File([""], "filename", { type: 'text/html' });
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({})
        }));

        try {
            await API.createObject(id, file, token);
            fail('createObject should throw');
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.createObject() should throw an error if API does not succeed', async () => {
        const id = 'id';
        const file =  new File([""], "filename", { type: 'text/html' });
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.reject());

        try {
            await API.createObject(id, file, token);
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.uploadDocument() should call fetch', async () => {
        const documentId = 'documentId';
        const file =  new File([""], "filename", { type: 'text/html' });
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve({ok: true})
            })
        });

        await API.uploadDocument(documentId, file, token);

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('API.uploadDocument() should throw error when response.ok is false', async () => {
        const documentId = 'documentId';
        const file =  new File([""], "filename", { type: 'text/html' });
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({ok: false}));

        try {
            await API.uploadDocument(documentId, file, token);
            fail('uploadDocument should throw');
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.uploadDocument() should throw an error if API does not succeed', async () => {
        const documentId = 'documentId';
        const file =  new File([""], "filename", { type: 'text/html' });
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.reject());

        try {
            await API.uploadDocument(documentId, file, token);
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.getViewStatus() should call fetch', async () => {
        const fileMetadata = {
            fileSharingProtocolType: 0,
            id: 'id',
            name: 'name',
            size: 0,
            type: 'type',
            url: 'url'
        };
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                view_location: 'view_location'
            })
        }));

        await API.getViewStatus(fileMetadata, token);

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('API.getViewStatus() should throw an error if API does not succeed', async () => {
        const fileMetadata = {
            fileSharingProtocolType: 0,
            id: 'id',
            name: 'name',
            size: 0,
            type: 'type',
            url: 'url'
        };
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.reject());

        try {
            await API.getViewStatus(fileMetadata, token);
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });

    it('API.getView() should call fetch', async () => {
        const fileMetadata = {
            fileSharingProtocolType: 0,
            id: 'id',
            name: 'name',
            size: 0,
            type: 'type',
            url: 'url'
        };
        const viewLocation = 'viewLocation';
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.resolve({
            ok: true,
            blob: () => Promise.resolve()
        }));

        await API.getView(fileMetadata, viewLocation, token);

        expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('API.getView() should throw an error if API does not succeed', async () => {
        const fileMetadata = {
            fileSharingProtocolType: 0,
            id: 'id',
            name: 'name',
            size: 0,
            type: 'type',
            url: 'url'
        };
        const viewLocation = 'viewLocation';
        const token = {
            chatId: '',
            token: ''
        };

        (global as any).fetch = jest.fn(() => Promise.reject());

        try {
            await API.getView(fileMetadata, viewLocation, token);
        } catch (error) {
            expect(error).not.toBe(undefined);
        }
    });
    describe('HTTP status on failure', () => {
        const token = { chatId: 'chatId', token: 'token' };
        const fileMetadata = { fileSharingProtocolType: 0, id: 'id', name: 'name', size: 0, type: 'type', url: 'url' };
        const file = new File([""], "filename", { type: 'text/html' });
        const operations: [string, () => Promise<unknown>][] = [
            ['skypeTokenAuth', () => API.skypeTokenAuth(token)],
            ['createObject', () => API.createObject('id', file, token)],
            ['uploadDocument', () => API.uploadDocument('id', file, token)],
            ['getViewStatus', () => API.getViewStatus(fileMetadata, token)],
            ['getView', () => API.getView(fileMetadata, 'viewLocation', token)]
        ];

        it.each(operations)('API.%s() should throw AMSError with status 401 and not read the body', async (_name, operation) => {
            const json = jest.fn();
            const blob = jest.fn();
            (global as any).fetch = jest.fn(() => Promise.resolve({ ok: false, status: 401, statusText: 'Unauthorized', json, blob }));

            await expect(operation()).rejects.toMatchObject({ name: 'AMSError', status: 401 });
            expect(json).not.toHaveBeenCalled();
            expect(blob).not.toHaveBeenCalled();
        });

        it.each(operations)('API.%s() should throw AMSError without status on network failure', async (_name, operation) => {
            (global as any).fetch = jest.fn(() => Promise.reject(new TypeError('Failed to fetch')));

            const error = await operation().catch((e: AMSError) => e) as AMSError;
            expect(error).toBeInstanceOf(AMSError);
            expect(error.status).toBeUndefined();
        });
    });
})