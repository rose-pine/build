import { type Color } from '@rose-pine/palette';
interface Config {
    template: string;
    output: string;
    prefix: string;
    format: 'hex' | 'hex-ns' | 'rgb' | 'rgb-ns' | 'rgb-array' | 'rgb-function' | 'hsl' | 'hsl-ns' | 'hsl-array' | 'hsl-function';
    stripSpaces: boolean;
}
export declare const formatColor: (color: Color, format?: Config['format'], stripSpaces?: Config['stripSpaces']) => string;
export declare const build: (flags?: Partial<Config> | undefined) => Promise<void>;
export default build;
