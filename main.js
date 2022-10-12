// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { dotnet } from './dotnet.js'

const is_browser = typeof window != "undefined";
if (!is_browser) throw new Error(`Expected to be running in a browser`);

const { setModuleImports, getAssemblyExports, getConfig, runMainAndExit } = await dotnet
    .withDiagnosticTracing(false)
    .withApplicationArgumentsFromQuery()
    .create();

// Called by C# WASM Guest() method
setModuleImports("main.js", {
    guest: () => "logseq"
});

function main () {
    logseq.Editor.registerSlashCommand(
      '🫥 .NET WASM',
      async () => {
        // Calling into .NET WASM
        const text = exports.MyClass.Greeting()
  
        logseq.App.showMsg(`
          [:div.p-2
            [:h2.text-xl "${text}"]]
        `)
      }
    )
  }

const config = getConfig()
const exports = await getAssemblyExports(config.mainAssemblyName)

logseq.ready(main).catch(console.error)

await runMainAndExit(config.mainAssemblyName, ["dotnet", "is", "great!"]);