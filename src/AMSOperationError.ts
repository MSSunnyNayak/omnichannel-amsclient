import { AMSError } from "./AMSError";

/**
 * Error thrown by FramedClient and FramedlessClient operations.
 * `message` is the operation name (for example 'createObject') to stay compatible with earlier versions.
 * `status` is the HTTP status code returned by AMS, when one was received.
 */
export interface AMSOperationError extends Error {
    status?: number;
    requestUrl?: string;
}

export interface AMSOperationErrorDetails {
    message?: string;
    status?: number;
    requestUrl?: string;
}

export const extractErrorDetails = (error: unknown): AMSOperationErrorDetails => {
    const details: AMSOperationErrorDetails = {
        message: error instanceof Error ? error.message : String(error)
    };

    if (error instanceof AMSError) {
        details.requestUrl = error.requestUrl;
        if (typeof error.status === 'number') {
            details.status = error.status;
        }
    }

    return details;
};

export const createOperationError = (operation: string, details?: AMSOperationErrorDetails): AMSOperationError => {
    const operationError: AMSOperationError = new Error(operation);

    if (typeof details?.status === 'number') {
        operationError.status = details.status;
    }

    if (details?.requestUrl) {
        operationError.requestUrl = details.requestUrl;
    }

    return operationError;
};
