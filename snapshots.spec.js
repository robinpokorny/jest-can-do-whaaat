const Immutable = require('immutable');
const { toMatchDiffSnapshot } = require('snapshot-diff');
expect.extend({ toMatchDiffSnapshot });

const plugin = {
  test(val) {
    return val && val.isPlay;
  },
  serialize(val, config, indent, depth, refs, printer) {
    const name = val.constructor.name;
    const newIndent = indent + config.indent;
    return (
      `Play <${val.title}>: ` +
      printer(val.content, config, newIndent, depth++, refs)
    );
  }
};

expect.addSnapshotSerializer(plugin);

describe('method', () => {
  test('works', () => {
    const full = {
      number: 1975,
      bool: true,
      string: 'Hello, Vanek',
      promise: Promise.resolve('Better job'),
      symbol: Symbol('brewery'),
      [Symbol.for('brewmaster')]: 'Next beer!',
      map: new Map([['position1', 'workman'], ['position2', 'stockkeeper']]),
      set: new Set(['think', 'write', 'snitch']),
      func: compromise => compromise * 2,
      null: null,
      undefined: undefined
    };

    expect(full).toMatchSnapshot('new name');
    expect(1936).toMatchSnapshot();
  });

  test('immutable', () => {
    expect(Immutable.Map({ a: 1, b: 2 })).toMatchSnapshot();
    expect(Immutable.List([2, 5, 11])).toMatchSnapshot();
  });

  test('mock function', () => {
    const fn = jest.fn();

    fn('Vanek');
    fn('Ferdinand', 'Vanek');

    expect(fn).toHaveBeenCalledWith('Vanek');
    expect(fn).toHaveBeenCalledWith('Ferdinand', 'Vanek');
    expect(fn).toHaveBeenCalledTimes(2);

    // vs

    expect(fn.mock.calls).toMatchSnapshot();
  });

  test('play', () => {
    const play = {
      isPlay: true,
      title: 'Audience',
      content: { scenes: 1 }
    };

    expect([play]).toMatchSnapshot();
  });

  test('diff', () => {
    const play = {
      title: 'Audience',
      characters: 2
    };

    expect(play).toMatchSnapshot();
    expect({ ...play, characters: 3 }).toMatchSnapshot();

    expect(play).toMatchDiffSnapshot({ ...play, characters: 3 });
  });
});
