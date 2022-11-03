type NpmDependency = string | { type: 'dev' | 'prod'; dep: string }

type GeneralSnippet = {
    /**
     * @suggestSortText "3"
     */
    when?: {
        /** Shouldn't be used with `Start` location as snippet would be hidden in that case */
        lineHasRegex?: string
        /** Same as `lineHasRegex`, but the line will be tested from first character till current cursor position */
        lineRegex?: string
        /**
         * Language identifier. Family name from `languageSupersets` can be used instead (e.g. js or react)
         */
        languages?: string[]
        // Unimplemented: inComments. topLineStart means line start without indendation, useful for top-level declaration snippets, like `export const`
        /**
         * Specify to restrict showing suggest in specific location
         * @items "replace-locations-marker"
         */
        locations?: any[]
        pathRegex?: string
        /** Shortcuts for complex path regexs. If specified, `pathRegex` is ignored */
        fileType?: 'package.json' | 'tsconfig.json'
        otherLines?: Array<
            /* TestProp */ /*  | { preset: 'function' } */
            | {
                  /**
                   * Which line to pick (relative to current)
                   * @suggestSortText "1"
                   */
                  line: number /*  | number[] */
                  /** @default false */
                  displayIfNoLine?: boolean
              }
            | {
                  // TODO support negative
                  /**
                   * How many levels up of indendation to look? By default 0 - any. Example: `-1`
                   * Currently it is possible to lookup only above (negative number)
                   * @suggestSortText "2"
                   * @default 0
                   * @max 0
                   */
                  indent: number | 'up'
              }
        >
        /**
         * Enable snippet only when following NPM dependencies are in package.json.
         */
        npmDependencies?: NpmDependency[]
    }
    // ... of **first capture group** from ...
    /**
     * Wether to replace the matched content from `lineBeforeRegex` or `lineRegex` regex check. The first one takes precedence.
     * Works only when end of content is matched (e.g. it will always work if regex ends with `$`)
     * @sortText z9
     */
    replaceBeforeRegex?: boolean
    /** For JS langs only. How to resolve suggested imports if any */
    resolveImports?: {
        // specifier can be subst only for now
        [importSpecifier: string]: {
            package?: string // = specifier, true = best match
            // export?: string // default or specifier if package is specified
        }
    }
    /**
     * Execute custom command on snippet accept, doesn't work with resolveImports
     * @defaultSnippets [{
     *   "body": "$1"
     * }]
     */
    // executeCommand?: CommandDefinition /* | CommandDefinition[] */
}

export type CustomSnippet = GeneralSnippet & {
    /**
     * @suggestSortText "2"
     * @defaultSnippets [{
     *   "body": "$1"
     * }]
     */
    body: string | string[]
    /**
     * @suggestSortText !
     */
    name: string
    /** Should be short. Always displayed in completion widget on the right on the same line as label. */
    description?: string
    when?: {
        /**
         * The snippet will be visible only after typing specific character on the keyboard
         * Add '' (empty string) so it'll be visible after regular triggering or typing
         * @length 1
         */
        triggerCharacters?: string[]
    }
    // formatting?: {
    //     /**
    //      * Always insert double quote. Prettier rules. Otherwise always insert single. Default: auto
    //      */
    //     doubleQuotes?: boolean
    //     insertSemicolon?: boolean
    // }
    /** If specified, `iconType` is ignored. It makes sense to use with custom file icon theme */
    fileIcon?: string
    /** If specified, `iconType` and `fileIcon` is ignored. It makes sense to use with custom file icon theme */
    folderIcon?: string
    sortText?: string | null
    iconType?: string
    /**
     * Only if `when.triggerCharacters` is used
     * @default false
     */
    replaceTriggerCharacter?: boolean
}

export type TypingSnippet = GeneralSnippet & {
    /**
     * If `false` sequence will not be removed, useful for just executing post actions such as commands
     * @suggestSortText "2"
     * @defaultSnippets [{
     *   "body": "$1"
     * }]
     */
    body: string | string[] | false
    /**
     * Snippet will be accepted only after typing THE EXACT sequence of characters on the keyboard. Using arrows or mouse for navigating will reset the sequence (see settings)
     * @suggestSortText !
     */
    sequence: string
    when?: {
        // TODO support in regular snippets and move to GeneralSnippet
        // TODO rewrite snippet example
        /**
         * Recommnded instead of `lineRegex`, tests against what is before current snippet in the line
         * Example:
         * | - cursor, [...] - check position
         * For regular snippet `test` end position is before current word:
         * `[before] test|`, `[before] beforetest|`,
         * Typing snippet: cb
         * `[before]cb|`, `[before ]cb|`,
         */
        lineBeforeRegex?: string
    }
}

// version 2 will be in object form

export type ContributingTypingSnippet = TypingSnippet & {
    markdownNote?: string
    settings?: Record<string, boolean | string | number>
}
