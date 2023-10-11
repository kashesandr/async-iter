# async-iter

A wrapper over JS iterator, which allows filter/map/etc with chaining.

Usage:
Example:

        const sourceIter = (async function* () {
            for await (const item of [1, 2, 3, 4, 5]) {
                yield item;
            }
        })();

        const asyncIter = new AsyncIter(sourceIter);

        const iter =
            asyncIter
                .filter((item) => item % 2 === 0)
                .filter((item) => item > 2)
                .map((item) => item * 2)
                .map((item) => item + 1)
                .mapAsync(async (item) => item / 3)
        ;

        const result = [];
        for await (const item of iter) {
            result.push(item);
        }

        expect(result).to.deep.equal([3]);

see more details [here in unit tests](./src/async-iter.spec.ts)