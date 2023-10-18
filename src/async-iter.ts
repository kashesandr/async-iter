export class AsyncIter<T> {

    asyncIter: AsyncIterator<T>;

    constructor(asyncIter: AsyncIterator<T>) {
        this.asyncIter = asyncIter;
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T> {
        // @ts-ignore
        yield * this.asyncIter;
    }

    filter<K>(filterFn: (item: K) => boolean): AsyncIter<K> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            // @ts-ignore
            for await (const item of asyncIter) {
                if (filterFn(item)) {
                    yield item;
                }
            }
        })();
        return new AsyncIter<K>(newIter);
    }

    map<K, L>(mapFn: (item: K) => L): AsyncIter<L> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            // @ts-ignore
            for await (const item of asyncIter) {
                yield mapFn(item);
            }
        })();
        return new AsyncIter<L>(newIter);
    }

    mapAsync<K, L>(mapFnAsync: (item: K) => Promise<L>): AsyncIter<L> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            // @ts-ignore
            for await (const item of asyncIter) {
                yield await mapFnAsync(item);
            }
        })();
        return new AsyncIter<L>(newIter);
    }

    enumerate<K>(): AsyncIter<[number, K][]> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            let i = 0;
            // @ts-ignore
            for await (const item of asyncIter) {
                yield [i++, item];
            }
        })();
        return new AsyncIter<[number, K][]>(newIter);
    }
}
