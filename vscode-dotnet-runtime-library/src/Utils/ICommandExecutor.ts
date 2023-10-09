/* --------------------------------------------------------------------------------------------
 *  Licensed to the .NET Foundation under one or more agreements.
*  The .NET Foundation licenses this file to you under the MIT license.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/* tslint:disable:no-any */

export abstract class ICommandExecutor
{
    /**
     * @remarks Set this to true if you don't want to capture stdout and stderr, and just want to return the status / exit code.
     * Note: For the .NET Installers, all they will return is a status.
     */
    public returnStatus = false;

    /**
     *
     * @param command The command to execute, with arguments separated by spaces in the string.
     * @param options Options to forward to the execSync command.
     */
    public abstract execute(command : string, options? : any | null) : Promise<string[]>;
};
