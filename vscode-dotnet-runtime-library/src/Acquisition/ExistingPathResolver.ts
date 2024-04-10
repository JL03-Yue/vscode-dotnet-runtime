/*---------------------------------------------------------------------------------------------
*  Licensed to the .NET Foundation under one or more agreements.
*  The .NET Foundation licenses this file to you under the MIT license.
*--------------------------------------------------------------------------------------------*/

import { IWindowDisplayWorker } from '../EventStream/IWindowDisplayWorker';
import { IDotnetAcquireResult } from '../IDotnetAcquireResult';
import { IExistingPaths } from '../IExtensionContext';

export class ExistingPathResolver {
    public resolveExistingPath(existingPaths: IExistingPaths | undefined, extensionId: string | undefined, windowDisplayWorker: IWindowDisplayWorker): IDotnetAcquireResult | undefined {
        if (existingPaths) {
            if (!extensionId) {
                // Use the global path if it is specified
                if (existingPaths.globalExistingPathKey)
                {
                    return { dotnetPath: existingPaths.globalExistingPathKey}
                }
                windowDisplayWorker.showWarningMessage(
                    'Ignoring existing .NET paths defined in settings.json because requesting extension does not define its extension ID. Please file a bug against the requesting extension.',
                    () => { /* No callback */ },
                );
                return;
            }
            else {
                // check if there are local paths
                if (existingPaths.localExsitingPaths)
                {
                    const existingLocalPath = existingPaths.localExsitingPaths.filter((pair) => pair.extensionId === extensionId);
                    if (existingLocalPath && existingLocalPath.length > 0) {
                        return { dotnetPath: existingLocalPath![0].path };
                    }
                }
                else if (existingPaths.globalExistingPathKey)
                {
                    return { dotnetPath: existingPaths.globalExistingPathKey}
                }
                windowDisplayWorker.showWarningMessage(
                    'Ignoring existing .NET paths defined in settings.json because requesting extension does not define its extension ID. Please file a bug against the requesting extension.',
                    () => { /* No callback */ },
                );
            }
        }
    }
}
