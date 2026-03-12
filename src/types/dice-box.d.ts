declare module "@3d-dice/dice-box" {
  interface DiceBoxOptions {
    assetPath: string;
    [key: string]: unknown;
  }

  interface RollOptions {
    theme?: string;
    newStartPoint?: boolean;
  }

  interface DieResult {
    value?: number;
    [key: string]: unknown;
  }

  interface RollGroupResult {
    value?: number;
    rolls?: DieResult[];
    [key: string]: unknown;
  }

  export default class DiceBox {
    constructor(selector: string, options: DiceBoxOptions);
    init(): Promise<void>;
    roll(notation: string, options?: RollOptions): Promise<RollGroupResult[]>;
    clear(): void;
    destroy?(): void;
    onRollComplete?: (results: RollGroupResult[]) => void;
  }
}
