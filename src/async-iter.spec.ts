import { expect } from 'chai';
import { AsyncIter } from './async-iter'; // Replace with the actual path to your module

describe('AsyncIter', () => {

    it('should filter items correctly', async () => {
        const sourceIter = (async function* () {
            for await (const item of [1, 2, 3, 4, 5]) {
                yield item;
            }
        })();
        const asyncIter = new AsyncIter(sourceIter);

        const filteredIter = asyncIter.filter<number>((item) => item % 2 === 0);

        const result = [];
        for await (const item of filteredIter) {
            result.push(item);
        }

        expect(result).to.deep.equal([2, 4]);
    });

    it('should map items correctly', async () => {
        const sourceIter = (async function* () {
            for await (const item of [1, 2, 3, 4, 5]) {
                yield item;
            }
        })();
        const asyncIter = new AsyncIter(sourceIter);

        const mappedIter = asyncIter.map<number, number>((item) => item * 2);

        const result = [];
        for await (const item of mappedIter) {
            result.push(item);
        }

        expect(result).to.deep.equal([2, 4, 6, 8, 10]);
    });

    it('should map items asynchronously', async () => {
        const sourceIter = (async function* () {
            for await (const item of [1, 2, 3, 4, 5]) {
                yield item;
            }
        })();
        const asyncIter = new AsyncIter(sourceIter);

        const mappedIter = asyncIter.mapAsync<number, number>(async (item) => item * 2);

        const result = [];
        for await (const item of mappedIter) {
            result.push(item);
        }

        expect(result).to.deep.equal([2, 4, 6, 8, 10]);
    });

    it('should enumerate items correctly', async () => {
        const sourceIter = (async function* () {
            for await (const item of ['a', 'b', 'c']) {
                yield item;
            }
        })();
        const asyncIter = new AsyncIter(sourceIter);

        const enumeratedIter = asyncIter.enumerate();

        const result = [];
        for await (const item of enumeratedIter) {
            result.push(item);
        }

        expect(result).to.deep.equal([[0, 'a'], [1, 'b'], [2, 'c']]);
    });

    it('should pairwise items correctly', async () => {
        const sourceIter = (async function* () {
            for await (const item of [1, 2, 3, 4, 5]) {
                yield item;
            }
        })();
        const asyncIter = new AsyncIter(sourceIter);
        const resultIter = asyncIter.pairwise<number>();
        const result = [];
        for await (const item of resultIter) {
            result.push(item);
        }

        expect(result).to.deep.equal([[1,2],[2,3],[3,4],[4,5]]);
    });

    it('should correctly manage combination of operators', async () => {
        const sourceIter = (async function* () {
            for await (const item of [1, 2, 3, 4, 5]) {
                yield item;
            }
        })();
        const asyncIter = new AsyncIter(sourceIter);

        const iter =
            asyncIter
                .filter<number>((item) => item % 2 === 0)
                .filter<number>((item) => item > 2)
                .map<number, number>((item) => item * 2)
                .map<number, number>((item) => item + 1)
                .mapAsync<number, number>(async (item) => item / 3)
        ;

        const result = [];
        for await (const item of iter) {
            result.push(item);
        }

        expect(result).to.deep.equal([3]);

    });

});
