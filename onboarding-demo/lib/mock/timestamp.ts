/** Drop-in para firebase/firestore Timestamp — sem dependência de Firebase */
export class MockTimestamp {
  private _date: Date;

  constructor(date: Date = new Date()) {
    this._date = date;
  }

  toDate(): Date {
    return this._date;
  }

  static fromDate(date: Date): MockTimestamp {
    return new MockTimestamp(date);
  }

  static now(): MockTimestamp {
    return new MockTimestamp(new Date());
  }

  /** Cria um Timestamp N dias no passado */
  static daysAgo(n: number): MockTimestamp {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return new MockTimestamp(d);
  }

  /** Cria um Timestamp N dias no futuro */
  static daysFromNow(n: number): MockTimestamp {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return new MockTimestamp(d);
  }
}

export type Timestamp = MockTimestamp;
