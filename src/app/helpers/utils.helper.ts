import { Types } from 'mongoose';

export function objectId(id: string): Types.ObjectId {
  return new Types.ObjectId(id);
}

export function parseDurationMs(value: string): number {
  const match = value.match(/^(\d+)(ms|s|m|h|d)$/);
  if (!match) throw new Error('Invalid duration');

  const num = Number(match[1]);
  const unit = match[2];

  const map: Record<string, number> = {
    ms: 1,
    s: 1000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };

  return num * map[unit];
}
