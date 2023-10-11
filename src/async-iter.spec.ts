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

        const filteredIter = asyncIter.filter((item) => item % 2 === 0);

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

        const mappedIter = asyncIter.map((item) => item * 2);

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

        const mappedIter = asyncIter.mapAsync(async (item) => item * 2);

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

    it('should correctly manage combination of operators', async () => {
        // TODO: TBD

    });
});
