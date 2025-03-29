// src/types/global.d.ts
declare interface RequireContext {
    keys(): string[];
    (id: string): any;
    <T>(id: string): T;
    resolve(id: string): string;
    /** The module id of the context module. This may be useful for module.hot.accept. */
    id: string;
  }
  
  declare interface NodeRequire {
    context(
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ): RequireContext;
  }
  
  // Augment the existing NodeJS namespace
  declare namespace NodeJS {
    interface NodeModule {
      hot?: {
        accept(
          dependencies: string | string[],
          callback?: (updatedDependencies: any[]) => void,
        ): void;
        accept(callback?: () => void): void;
        decline(dependencies?: string | string[]): void;
        dispose(callback: (data: any) => void): void;
        addDisposeHandler(callback: (data: any) => void): void;
        removeDisposeHandler(callback: (data: any) => void): void;
        status(): string;
        check(autoApply?: boolean): Promise<string[]>;
        apply(options?: { ignoreUnaccepted?: boolean }): Promise<string[]>;
        addStatusHandler(callback: (status: string) => void): void;
        removeStatusHandler(callback: (status: string) => void): void;
      };
    }
  }