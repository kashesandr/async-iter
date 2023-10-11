export class AsyncIter<T> {

    asyncIter: AsyncIterator<T>;

    constructor(asyncIter: AsyncIterator<T>) {
        this.asyncIter = asyncIter;
    }

    async *[Symbol.asyncIterator]() {
        // @ts-ignore
        yield * this.asyncIter;
    }

    filter(filterFn: (item: T) => boolean): AsyncIter<T> {
        const {asyncIter} = this;
        const newIter = (async function* (){
            // @ts-ignore
            for await (const item of asyncIter) {
                if (filterFn(item)) {
                    yield item;
                }
            }
        })()
        return new AsyncIter<T>(newIter);
    }

    map(mapFn: (item: T) => T): AsyncIter<T> {
        const {asyncIter} = this;
        const newIter = (async function* (){
            // @ts-ignore
            for await (const item of asyncIter) {
                yield mapFn(item);
            }
        })()
        return new AsyncIter<T>(newIter);
    }

    mapAsync(mapFnAsync: (item: T) => Promise<T>): AsyncIter<T> {
        const {asyncIter} = this;
        const newIter = (async function* (){
            // @ts-ignore
            for await (const item of asyncIter) {
                yield await mapFnAsync(item);
            }
        })()
        return new AsyncIter<T>(newIter);
    }

    enumerate(): AsyncIter<[number, T][]> {
        const {asyncIter} = this;
        const newIter = (async function* (){
            let i = 0;
            // @ts-ignore
            for await (const item of asyncIter) {
                yield [i++, item];
            }
        })()
        return new AsyncIter(newIter);
    }

}