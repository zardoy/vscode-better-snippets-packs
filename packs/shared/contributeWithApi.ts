import * as vscode from 'vscode'
import { ManifestType } from 'vscode-manifest'
import { CustomSnippet, TypingSnippet } from './types'

export default async (customSnippets: CustomSnippet[] | undefined, typingSnippets?: TypingSnippet[]) => {
    let betterSnippetsExt = vscode.extensions.getExtension('zardoy.better-snippets')
    betterSnippetsExt ??= vscode.extensions.all.find(
        ({ packageJSON }: { packageJSON: ManifestType }) => packageJSON?.contributes?.['betterSnippetsEngineExtension'],
    )
    if (!betterSnippetsExt) return
    const { getAPI } = await betterSnippetsExt.activate()
    //@ts-ignore
    const api = getAPI(process.env.EXTENSION_ID)
    if (customSnippets?.length) api.contributeCustomSnippets(customSnippets)
    if (typingSnippets?.length) api.contributeTypingSnippets(typingSnippets)
}
