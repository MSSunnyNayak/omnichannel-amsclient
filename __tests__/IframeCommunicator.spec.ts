/**
 * @jest-environment jsdom
 */

import API from "../src/API";
import { AMSError } from "../src/AMSError";
import IframeCommunicator from "../src/IframeCommunicator";
import PostMessageEventName from "../src/PostMessageEventName";
import PostMessageEventStatus from "../src/PostMessageEventStatus";
import PostMessageEventType from "../src/PostMessageEventType";

describe('IframeCommunicator', () => {
    const clientId = 'clientId';
    const chatToken = { chatId: 'chatId', token: 'token' };
    const fileMetadata = { fileSharingProtocolType: 0, id: 'id', name: 'name.txt', size: 0, type: 'text/plain', url: 'url' };
    const file = new File([""], "filename.txt", { type: 'text/plain' });

    const cases: [PostMessageEventName, keyof typeof API, Record<string, unknown>][] = [
        [PostMessageEventName.SkypeTokenAuth, 'skypeTokenAuth', {}],
        [PostMessageEventName.CreateObject, 'createObject', { id: 'id', file }],
        [PostMessageEventName.UploadDocument, 'uploadDocument', { documentId: 'id', file }],
        [PostMessageEventName.GetViewStatus, 'getViewStatus', { fileMetadata }],
        [PostMessageEventName.GetView, 'getView', { fileMetadata, viewLocation: 'viewLocation' }]
    ];

    beforeEach(() => {
        jest.restoreAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    it.each(cases)('%s failure should reply with requestId and HTTP status', async (eventName, apiName, request) => {
        const communicator = new IframeCommunicator(clientId);
        const postMessage = jest.spyOn(communicator, 'postMessage').mockImplementation(() => {});
        jest.spyOn(API, apiName).mockRejectedValue(new AMSError('AMS failed: 401 Unauthorized', 'https://ams/v1/objects', undefined, 401));

        await communicator.handleEvent({
            data: { clientId, runtimeId: 'runtimeId', requestId: 'requestId', eventType: PostMessageEventType.Request, eventName, chatToken, ...request }
        } as any);

        expect(postMessage).toHaveBeenCalledWith(
            PostMessageEventType.Response,
            eventName,
            expect.objectContaining({
                requestId: 'requestId',
                eventStatus: PostMessageEventStatus.Failure,
                error: expect.objectContaining({ status: 401 })
            }),
            PostMessageEventStatus.Failure
        );
    });
});