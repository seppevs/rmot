const asyncFs = require('./async-fs');

const rmot = require('./rmot');

jest.mock('./async-fs', () => ({
  readdir: jest.fn(),
  stat: jest.fn(),
  unlink: jest.fn(),
}));

describe('rmot', () => {
  it('should remove all files with a birthtime older than given date', async () => {
    asyncFs.readdir.mockResolvedValue(['subdir1', 'file1', 'file2', 'file3']);

    const theStats = {
      '/path/to/dir/subdir1': {
        isFile: () => false,
      },
      '/path/to/dir/file1': {
        isFile: () => true,
        birthtimeMs: 1559764127000, // should be removed
      },
      '/path/to/dir/file2': {
        isFile: () => true,
        birthtimeMs: 1559764125000, // should be removed
      },
      '/path/to/dir/file3': {
        isFile: () => true,
        birthtimeMs: 1559764129049, // should not be removed
      },
    };

    asyncFs.stat.mockImplementation((fileName) =>
      Promise.resolve(theStats[fileName]),
    );

    const result = await rmot(
      '/path/to/dir',
      new Date('2019-06-05T19:48:48.049Z'),
    );
    expect(asyncFs.unlink).not.toHaveBeenCalledWith('/path/to/dir/subdir1');
    expect(asyncFs.unlink).toHaveBeenCalledWith('/path/to/dir/file1');
    expect(asyncFs.unlink).toHaveBeenCalledWith('/path/to/dir/file2');
    expect(asyncFs.unlink).not.toHaveBeenCalledWith('/path/to/dir/file3');
    expect(result).toEqual(['file1', 'file2']);
  });
});
