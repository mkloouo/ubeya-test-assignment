import weatherReducer, {
  WeatherState,
  increment,
  decrement,
  incrementByAmount,
} from './weatherSlice';

describe('weather reducer', () => {
  const initialState: WeatherState = {
    value: 3,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = weatherReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = weatherReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = weatherReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
