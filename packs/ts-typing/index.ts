import contributeWithApi from '../shared/contributeWithApi'

const tsSpecificSnippet = { when: { languages: ['typescript', 'typescriptreact'] } }

export const activate = () => {
    contributeWithApi(undefined, [
        // #region callback (imo most used)
        {
            sequence: 'cb ',
            body: 'const $1 = ($2) => $3',
            when: {
                locations: ['lineStart'],
            },
        },
        {
            sequence: 'cb ',
            body: '($1) => $2',
        },
        {
            sequence: 'cbi ',
            body: '() => $2',
        },
        // #endregion

        // #region native contructs
        {
            sequence: 'cn ',
            body: 'const ',
            when: {
                lineRegex: '^\\s*cn ',
            },
        },

        {
            sequence: 'imp ',
            body: "import { $2 } from '$1'",
            when: {
                locations: ['lineStart'],
            },
        },
        {
            sequence: 'im ',
            body: "import $2 from '$1'",
            when: {
                locations: ['topLineStart'],
                languages: ['js'],
            },
        },
        {
            sequence: 'imn ',
            body: "import '$1'",
            when: {
                locations: ['topLineStart'],
            },
        },

        {
            sequence: 'rn ',
            body: 'return ',
            when: {
                lineRegex: '[^\\w]rn $',
            },
        },
        {
            sequence: 'rnn ',
            body: 'return null',
            when: {
                lineRegex: '^\\s*(rn )|(if)',
            },
        },

        {
            sequence: 'aw ',
            body: 'await ',
            when: {
                lineBeforeRegex: '(^\\s*|\\) )$',
            },
        },
        {
            sequence: 'co ',
            body: 'continue',
            when: {
                lineBeforeRegex: '(^\\s*|\\) )$',
            },
        },
        {
            sequence: 'br ',
            body: 'break',
            when: {
                lineBeforeRegex: '(^\\s*|\\) )$',
            },
        },
        // recommended to use postfix instead!
        {
            sequence: 'forof ',
            body: ['for (const ${2:iterator} of ${1:object}) {', '\t$0', '}'],
        },

        {
            sequence: '== ',
            body: ' === ',
            when: {
                lineRegex: '[^=]== $',
            },
        },
        {
            sequence: '!= ',
            body: ' !== ',
            when: {},
        },
        {
            sequence: '= ',
            body: ' => ',
            when: {
                lineRegex: '\\)= $',
            },
        },
        {
            sequence: '= ',
            body: ' = ',
            when: {
                lineRegex: '[^ +-/|?*=]= ',
            },
        },
        // #endregion

        // #region top-line exports
        {
            sequence: 'er ',
            body: 'export const $1 = ',
            when: {
                locations: ['topLineStart'],
            },
        },
        {
            sequence: 'em ',
            body: 'export const ${1:method} = ($2) => {$3}',
            when: {
                locations: ['topLineStart'],
            },
        },
        // #endregion

        {
            sequence: 'log ',
            body: 'console.log($1)',
            when: {
                lineBeforeRegex: '(^\\s*|\\) )$',
            },
        },

        // #region TypeScript-specific
        {
            sequence: ':s ',
            body: ': string, ',
            ...tsSpecificSnippet,
        },
        {
            sequence: ':b ',
            body: ': boolean, ',
            ...tsSpecificSnippet,
        },
        {
            sequence: ':n ',
            body: ': number, ',
            ...tsSpecificSnippet,
        },
        // #endregion
        // todo true-false
    ])
}
