/**
 * Function created for update components that's not specified in tree component
 */
export const eventEmmitter = {
    events: {},
    on(event: any, callback: any): void {
        // @ts-ignore
        if (!this.events[event]) {
            // @ts-ignore
            this.events[event] = [];
        }
        // @ts-ignore
        this.events[event].push(callback);
    },
    emit(event: any, data: any): void {
        // @ts-ignore
        if (this.events[event]) {
            // @ts-ignore
            this.events[event].forEach((callback) => callback(data));
        }
    },
    removeListener(event: any, callback: any) {
        // @ts-ignore
        if (this.events[event]) {
            // @ts-ignore
            this.events[event] = this.events[event].filter((cb) => cb !== callback);
        }
    },
};
