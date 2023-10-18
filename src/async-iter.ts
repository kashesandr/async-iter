export class AsyncIter<T> {

    asyncIter: AsyncIterator<T>;

    constructor(asyncIter: AsyncIterator<T>) {
        this.asyncIter = asyncIter;
    }

    async *[Symbol.asyncIterator](): AsyncIterator<T> {
        // @ts-ignore
        yield * this.asyncIter;
    }

    filter<INPUT>(filterFn: (item: INPUT) => boolean): AsyncIter<INPUT> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            // @ts-ignore
            for await (const item of asyncIter) {
                if (filterFn(item)) {
                    yield item;
                }
            }
        })();
        return new AsyncIter<INPUT>(newIter);
    }

    map<INPUT, OUTPUT>(mapFn: (item: INPUT) => OUTPUT): AsyncIter<OUTPUT> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            // @ts-ignore
            for await (const item of asyncIter) {
                yield mapFn(item);
            }
        })();
        return new AsyncIter<OUTPUT>(newIter);
    }

    mapAsync<INPUT, OUTPUT>(mapFnAsync: (item: INPUT) => Promise<OUTPUT>): AsyncIter<OUTPUT> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            // @ts-ignore
            for await (const item of asyncIter) {
                yield await mapFnAsync(item);
            }
        })();
        return new AsyncIter<OUTPUT>(newIter);
    }

    enumerate<INPUT>(): AsyncIter<[number, INPUT][]> {
        const { asyncIter } = this;
        const newIter = (async function* () {
            let i = 0;
            // @ts-ignore
            for await (const item of asyncIter) {
                yield [i++, item];
            }
        })();
        return new AsyncIter<[number, INPUT][]>(newIter);
    }

    pairwise<INPUT>(): AsyncIter<[INPUT, INPUT][]> {
        const { asyncIter } = this;
        const newIter = (async function* (){
            let current = await asyncIter.next();
            if (current.done) return;
            let next = await asyncIter.next();
            while (!next.done) {
                yield [current.value, next.value];
                current = next;
                next = await asyncIter.next();
            }
        })();
        return new AsyncIter<[INPUT, INPUT][]>(newIter);
    }
}
