export type ContrastGate = 'normal' | 'large' | 'non-text';

export interface ContrastResult {
  readonly ratio: number;
  readonly pass: boolean;
  readonly threshold: number;
  readonly gate: ContrastGate;
}

interface Rgb {
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

const NAMED_COLORS: Readonly<Record<string, string>> = {
  black: '#000000',
  white: '#ffffff',
  transparent: '#ffffff',
};

export function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(parseColor(foreground));
  const backgroundLuminance = relativeLuminance(parseColor(background));
  return Number(((Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05)).toFixed(2));
}

export function evaluateContrast(
  foreground: string,
  background: string,
  gate: ContrastGate,
): ContrastResult {
  const threshold = gate === 'normal' ? 4.5 : 3;
  const ratio = contrastRatio(foreground, background);
  return { ratio, pass: ratio >= threshold, threshold, gate };
}

export function parseColor(value: string): Rgb {
  const normalized = value.trim().toLocaleLowerCase();
  if (normalized in NAMED_COLORS) return parseColor(NAMED_COLORS[normalized]);

  if (normalized.startsWith('#')) return parseHex(normalized);
  if (normalized.startsWith('rgb')) return parseRgb(normalized);
  if (normalized.startsWith('oklch')) return parseOklch(normalized);
  throw new Error(`Unsupported color format: ${value}`);
}

function parseHex(value: string): Rgb {
  const hex = value.slice(1);
  const expanded = hex.length === 3 || hex.length === 4
    ? hex.slice(0, 3).split('').map((part) => part + part).join('')
    : hex.slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(expanded)) throw new Error(`Invalid hex color: ${value}`);
  return {
    red: Number.parseInt(expanded.slice(0, 2), 16) / 255,
    green: Number.parseInt(expanded.slice(2, 4), 16) / 255,
    blue: Number.parseInt(expanded.slice(4, 6), 16) / 255,
  };
}

function parseRgb(value: string): Rgb {
  const body = value.slice(value.indexOf('(') + 1, value.lastIndexOf(')'))
    .replace('/', ',')
    .split(/[ ,]+/)
    .filter(Boolean)
    .slice(0, 3);
  if (body.length !== 3) throw new Error(`Invalid rgb color: ${value}`);
  const channels = body.map((channel) => channel.endsWith('%')
    ? Number.parseFloat(channel) / 100
    : Number.parseFloat(channel) / 255);
  if (channels.some((channel) => Number.isNaN(channel))) throw new Error(`Invalid rgb color: ${value}`);
  return { red: clamp(channels[0]), green: clamp(channels[1]), blue: clamp(channels[2]) };
}

function parseOklch(value: string): Rgb {
  const body = value.slice(value.indexOf('(') + 1, value.lastIndexOf(')'))
    .replace('/', ' ')
    .trim()
    .split(/[ ,]+/)
    .filter(Boolean);
  if (body.length < 3) throw new Error(`Invalid oklch color: ${value}`);
  const lightnessValue = Number.parseFloat(body[0]);
  const lightness = body[0].endsWith('%') ? lightnessValue / 100 : lightnessValue;
  const chroma = Number.parseFloat(body[1]);
  const hue = Number.parseFloat(body[2]) * Math.PI / 180;
  if ([lightness, chroma, hue].some((part) => Number.isNaN(part))) throw new Error(`Invalid oklch color: ${value}`);

  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const light = Math.pow(lightness + 0.3963377774 * a + 0.2158037573 * b, 3);
  const middle = Math.pow(lightness - 0.1055613458 * a - 0.0638541728 * b, 3);
  const short = Math.pow(lightness - 0.0894841775 * a - 1.291485548 * b, 3);
  return {
    red: linearToSrgb(4.0767416621 * light - 3.3077115913 * middle + 0.2309699292 * short),
    green: linearToSrgb(-1.2684380046 * light + 2.6097574011 * middle - 0.3413193965 * short),
    blue: linearToSrgb(-0.0041960863 * light - 0.7034186147 * middle + 1.707614701 * short),
  };
}

function relativeLuminance(rgb: Rgb): number {
  const channels = [rgb.red, rgb.green, rgb.blue].map((channel) => channel <= 0.03928
    ? channel / 12.92
    : Math.pow((channel + 0.055) / 1.055, 2.4));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function linearToSrgb(value: number): number {
  const channel = value <= 0.0031308 ? 12.92 * value : 1.055 * Math.pow(Math.max(value, 0), 1 / 2.4) - 0.055;
  return clamp(channel);
}

function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}
